#!/usr/bin/env node
/**
 * image-gen.mjs — AI image generation for NBDE Cover Design Skill
 *
 * Supports multiple providers: dashscope, openai, google, minimax, jimeng
 *
 * Usage:
 *   node scripts/image-gen.mjs --prompt "description" --provider dashscope [--size 1024x1792] [--count 4] [--output dir]
 *
 * Environment variables:
 *   DASHSCOPE_API_KEY  — for DashScope (通义万相)
 *   OPENAI_API_KEY     — for OpenAI (DALL-E)
 *   GOOGLE_API_KEY     — for Google (Imagen)
 *   MINIMAX_API_KEY    — for MiniMax
 *   JIMENG_API_KEY     — for 即梦
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

function parseArgs(args) {
  const opts = {
    prompt: null,
    provider: 'dashscope',
    size: '1024x1792',
    count: 4,
    output: './output',
    negativePrompt: '',
    refImage: null,
  };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prompt' && args[i + 1]) { opts.prompt = args[++i]; continue; }
    if (args[i] === '--provider' && args[i + 1]) { opts.provider = args[++i]; continue; }
    if (args[i] === '--size' && args[i + 1]) { opts.size = args[++i]; continue; }
    if (args[i] === '--count' && args[i + 1]) { opts.count = parseInt(args[++i], 10); continue; }
    if (args[i] === '--output' && args[i + 1]) { opts.output = args[++i]; continue; }
    if (args[i] === '--negative-prompt' && args[i + 1]) { opts.negativePrompt = args[++i]; continue; }
    if (args[i] === '--ref' && args[i + 1]) { opts.refImage = args[++i]; continue; }
  }
  return opts;
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Download failed: HTTP ${response.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', reject);
  });
}

// ====== DashScope (通义万相) ======
async function generateDashScope(opts) {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) throw new Error('DASHSCOPE_API_KEY not set');

  const [w, h] = opts.size.split('x').map(Number);
  const sizeStr = `${w}*${h}`;

  const body = {
    model: 'wanx2.1-t2i-turbo',
    input: {
      prompt: opts.prompt,
      negative_prompt: opts.negativePrompt,
    },
    parameters: {
      size: sizeStr,
      n: opts.count,
      seed: Math.floor(Math.random() * 1000000),
    },
  };

  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-DashScope-Async': 'enable',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (data.output?.task_status === 'SUCCEEDED' && data.output.results) {
    return data.output.results.map(r => r.url);
  }

  // Async mode: poll for results
  if (data.output?.task_id) {
    return await pollDashScopeTask(apiKey, data.output.task_id);
  }

  throw new Error(`DashScope error: ${JSON.stringify(data)}`);
}

async function pollDashScopeTask(apiKey, taskId) {
  const maxAttempts = 30;
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const res = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    const data = await res.json();
    if (data.output?.task_status === 'SUCCEEDED') {
      return data.output.results.map(r => r.url);
    }
    if (data.output?.task_status === 'FAILED') {
      throw new Error(`DashScope task failed: ${JSON.stringify(data)}`);
    }
  }
  throw new Error('DashScope task timeout');
}

// ====== OpenAI (DALL-E) ======
async function generateOpenAI(opts) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const [w, h] = opts.size.split('x').map(Number);

  const body = {
    model: 'gpt-image-1',
    prompt: opts.prompt,
    n: opts.count,
    size: getOpenAISize(w, h),
  };

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (data.data) {
    return data.data.map(r => r.url || `data:image/png;base64,${r.b64_json}`);
  }
  throw new Error(`OpenAI error: ${JSON.stringify(data)}`);
}

function getOpenAISize(w, h) {
  if (w > h) return '1792x1024';
  if (w === h) return '1024x1024';
  return '1024x1792';
}

// ====== Provider Router ======
const PROVIDERS = {
  dashscope: generateDashScope,
  openai: generateOpenAI,
  google: async (opts) => { throw new Error('Google Imagen not yet implemented. Use dashscope or openai.'); },
  minimax: async (opts) => { throw new Error('MiniMax not yet implemented. Use dashscope or openai.'); },
  jimeng: async (opts) => { throw new Error('Jimeng not yet implemented. Use dashscope or openai.'); },
};

async function main(opts) {
  if (!opts.prompt) {
    console.error('Usage: node image-gen.mjs --prompt "description" [--provider dashscope] [--size 1024x1792] [--count 4]');
    process.exit(1);
  }

  const provider = PROVIDERS[opts.provider];
  if (!provider) {
    console.error(`Unknown provider: ${opts.provider}. Available: ${Object.keys(PROVIDERS).join(', ')}`);
    process.exit(1);
  }

  console.log(`Generating ${opts.count} image(s) with ${opts.provider}...`);
  console.log(`Prompt: ${opts.prompt}`);
  console.log(`Size: ${opts.size}`);

  const urls = await provider(opts);

  // Download images
  const outputDir = path.resolve(opts.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const downloaded = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = `gen-${Date.now()}-${i + 1}.png`;
    const destPath = path.join(outputDir, filename);

    if (url.startsWith('data:')) {
      // Base64 data URL
      const base64 = url.split(',')[1];
      fs.writeFileSync(destPath, Buffer.from(base64, 'base64'));
    } else {
      await downloadFile(url, destPath);
    }

    downloaded.push(destPath);
    console.log(`Downloaded: ${destPath}`);
  }

  console.log(`\nGenerated ${downloaded.length} image(s) in ${outputDir}`);
  return downloaded;
}

const opts = parseArgs(process.argv.slice(2));
main(opts).catch(err => {
  console.error('Image generation failed:', err.message);
  process.exit(1);
});
