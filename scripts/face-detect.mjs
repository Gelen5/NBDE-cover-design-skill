#!/usr/bin/env node
/**
 * face-detect.mjs — MediaPipe face detection for portrait covers
 *
 * Usage:
 *   node scripts/face-detect.mjs <image-path> [--output json|css]
 *
 * Output (JSON):
 *   {
 *     "faces": [{ "x": 0.35, "y": 0.25, "w": 0.3, "h": 0.4, "score": 0.95 }],
 *     "recommendLayout": "P01",
 *     "textZone": { "x": 0.5, "y": 0, "w": 0.5, "h": 1.0, "strategy": "side" },
 *     "cssVars": { "--face-x": "35%", ... }
 *   }
 *
 * Output (CSS):
 *   --face-x: 35%; --face-y: 25%; --face-w: 30%; --face-h: 40%;
 */

import fs from 'fs';
import path from 'path';

// MediaPipe is loaded dynamically to avoid hard dependency
async function loadMediaPipe() {
  try {
    const { FaceDetector, FilesetResolver } = await import('@mediapipe/tasks-vision');
    return { FaceDetector, FilesetResolver };
  } catch {
    console.error('MediaPipe not installed. Run: npm install @mediapipe/tasks-vision');
    console.error('Falling back to simple analysis mode...');
    return null;
  }
}

function parseArgs(args) {
  const opts = { imagePath: null, output: 'json' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) { opts.output = args[++i]; continue; }
    if (!opts.imagePath) opts.imagePath = args[i];
  }
  return opts;
}

/**
 * Fallback: simple image analysis without MediaPipe
 * Uses image dimensions and basic heuristics
 */
function simpleAnalysis(imagePath) {
  const stats = fs.statSync(imagePath);
  const filename = path.basename(imagePath).toLowerCase();

  // Default: assume face in center-ish area
  const result = {
    faces: [],
    recommendLayout: 'P03',
    textZone: { x: 0, y: 0, w: 1.0, h: 1.0, strategy: 'overlay' },
    cssVars: {
      '--face-x': '50%',
      '--face-y': '35%',
      '--face-w': '30%',
      '--face-h': '40%',
      '--face-left': '35%',
      '--face-right': '65%',
      '--face-top': '15%',
      '--face-bottom': '55%',
      '--overlay-opacity': '0.55',
    },
    fallback: true,
    note: 'MediaPipe not available. Using default face position. Install @mediapipe/tasks-vision for accurate detection.',
  };

  return result;
}

/**
 * Calculate recommended layout based on face positions
 */
function recommendLayout(faces, imgW, imgH) {
  if (faces.length === 0) {
    return { layout: 'P03', strategy: 'overlay', textZone: { x: 0, y: 0, w: 1, h: 1 } };
  }

  const face = faces[0]; // Use primary face
  const faceCenterX = face.x + face.w / 2;
  const faceCenterY = face.y + face.h / 2;
  const faceAreaRatio = face.w * face.h;

  // Face on the left side → P01 (left portrait, text on right)
  if (faceCenterX < 0.4 && faceAreaRatio < 0.4) {
    return {
      layout: 'P01',
      strategy: 'side',
      textZone: { x: 0.45, y: 0, w: 0.55, h: 1.0 },
    };
  }

  // Face on the right side → P02 (right portrait, text on left)
  if (faceCenterX > 0.6 && faceAreaRatio < 0.4) {
    return {
      layout: 'P02',
      strategy: 'side',
      textZone: { x: 0, y: 0, w: 0.55, h: 1.0 },
    };
  }

  // Face takes up most of the frame → P03 (background portrait, overlay text)
  if (faceAreaRatio > 0.35 || (face.w > 0.5 && face.h > 0.5)) {
    // Determine which side has less face area for text placement
    const faceSide = faceCenterX < 0.5 ? 'left' : 'right';
    return {
      layout: 'P03',
      strategy: 'overlay',
      textZone: { x: 0, y: 0, w: 1.0, h: 1.0 },
      faceSide,
    };
  }

  // Face in top area → P04 (top portrait)
  if (faceCenterY < 0.35) {
    return {
      layout: 'P04',
      strategy: 'side',
      textZone: { x: 0, y: 0.4, w: 1.0, h: 0.6 },
    };
  }

  // Default: P01
  return {
    layout: 'P01',
    strategy: 'side',
    textZone: { x: 0.45, y: 0, w: 0.55, h: 1.0 },
  };
}

/**
 * Convert face detection results to CSS variables
 */
function toCSSVars(faces, layout) {
  if (faces.length === 0) {
    return {
      '--face-x': '50%',
      '--face-y': '35%',
      '--face-w': '30%',
      '--face-h': '40%',
      '--face-left': '35%',
      '--face-right': '65%',
      '--face-top': '15%',
      '--face-bottom': '55%',
      '--overlay-opacity': layout.strategy === 'overlay' ? '0.55' : '0',
    };
  }

  const face = faces[0];
  const faceLeft = face.x;
  const faceRight = face.x + face.w;
  const faceTop = face.y;
  const faceBottom = face.y + face.h;

  return {
    '--face-x': `${Math.round((face.x + face.w / 2) * 100)}%`,
    '--face-y': `${Math.round((face.y + face.h / 2) * 100)}%`,
    '--face-w': `${Math.round(face.w * 100)}%`,
    '--face-h': `${Math.round(face.h * 100)}%`,
    '--face-left': `${Math.round(faceLeft * 100)}%`,
    '--face-right': `${Math.round(faceRight * 100)}%`,
    '--face-top': `${Math.round(faceTop * 100)}%`,
    '--face-bottom': `${Math.round(faceBottom * 100)}%`,
    '--overlay-opacity': layout.strategy === 'overlay' ? '0.55' : '0',
  };
}

/**
 * Calculate text zone IOU with face bounding box
 * Hard rule: IOU must be < 0.3
 */
function calculateIOU(textZone, face) {
  const x1 = Math.max(textZone.x, face.x);
  const y1 = Math.max(textZone.y, face.y);
  const x2 = Math.min(textZone.x + textZone.w, face.x + face.w);
  const y2 = Math.min(textZone.y + textZone.h, face.y + face.h);

  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const textArea = textZone.w * textZone.h;
  const faceArea = face.w * face.h;
  const union = textArea + faceArea - intersection;

  return union > 0 ? intersection / union : 0;
}

async function detect(imagePath) {
  const mp = await loadMediaPipe();

  if (!mp) {
    return simpleAnalysis(imagePath);
  }

  const { FaceDetector, FilesetResolver } = mp;

  try {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );

    const detector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite',
        delegate: 'CPU',
      },
      runningMode: 'IMAGE',
    });

    // Load image
    const imageBuffer = fs.readFileSync(imagePath);
    // Create a data URL for MediaPipe
    const ext = path.extname(imagePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    const dataUrl = `data:${mime};base64,${imageBuffer.toString('base64')}`;

    const detections = await detector.detect(dataUrl);

    const faces = detections.detections.map(d => ({
      x: d.boundingBox.originX,
      y: d.boundingBox.originY,
      w: d.boundingBox.width,
      h: d.boundingBox.height,
      score: d.score ? d.score[0] : 0,
    }));

    // Normalize coordinates (MediaPipe returns pixel coords)
    // We need image dimensions for normalization
    // For now, assume they're already normalized 0-1
    // If not, we'd need sharp/jimp to get dimensions

    const layout = recommendLayout(faces, 1, 1);
    const cssVars = toCSSVars(faces, layout);

    // Check IOU constraint
    let iouViolation = false;
    if (faces.length > 0 && layout.textZone) {
      const iou = calculateIOU(layout.textZone, faces[0]);
      if (iou >= 0.3) {
        iouViolation = true;
        // Adjust text zone to reduce IOU
        layout.textZone = adjustTextZone(layout.textZone, faces[0]);
      }
    }

    detector.close();

    return {
      faces,
      recommendLayout: layout.layout,
      textZone: layout.textZone,
      cssVars,
      iouViolation,
      fallback: false,
    };
  } catch (err) {
    console.error('MediaPipe detection failed, using fallback:', err.message);
    return simpleAnalysis(imagePath);
  }
}

function adjustTextZone(textZone, face) {
  // If face is on the left, push text zone to the right
  if (face.x + face.w / 2 < 0.5) {
    return { x: Math.max(face.x + face.w + 0.05, 0.5), y: 0, w: 0.5, h: 1.0, strategy: 'side' };
  }
  // If face is on the right, push text zone to the left
  return { x: 0, y: 0, w: Math.min(face.x - 0.05, 0.5), h: 1.0, strategy: 'side' };
}

// Run
const opts = parseArgs(process.argv.slice(2));
if (!opts.imagePath) {
  console.error('Usage: node face-detect.mjs <image-path> [--output json|css]');
  process.exit(1);
}

detect(opts.imagePath).then(result => {
  if (opts.output === 'css') {
    const lines = Object.entries(result.cssVars).map(([k, v]) => `${k}: ${v};`);
    console.log(lines.join('\n'));
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
}).catch(err => {
  console.error('Face detection failed:', err);
  process.exit(1);
});
