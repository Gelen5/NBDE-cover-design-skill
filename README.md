# 宇宙第一封面图生成 Skill

> 一个 Skill 搞定：AI 生图 · 多平台封面 · 人像个性化封面
> 支持自定义比例、自定义颜色，34 种版式，10 套预设主题

---

## ✨ 三大核心能力

| 能力 | 输入 | 输出 | 一句话说明 |
|------|------|------|-----------|
| **AI 生图** | 文字提示词 / 参考图 | 高质量图片 | "帮我生成一张赛博朋克城市的图片" |
| **多平台封面** | 主题 / 文章内容 | 各平台封面 PNG | "帮我做个公众号头图，主题是 AI 工具推荐" |
| **人像封面** | 自拍照片 + 主题 | 个性化封面 | "用我的照片做个 AI 学习的公众号封面" |

---

## 🎨 视觉系统

### Editorial 杂志风（6 套预设主题）

| 主题 | data-theme | 主色 | 适合场景 |
|------|-----------|------|---------|
| 墨水经典 | `ink-classic` | #0a0a0b / #f1efea | 通用、文化 |
| 靛蓝瓷 | `indigo-porcelain` | #0a1f3d / #f1f3f5 | 科技、AI |
| 森林墨 | `forest-ink` | #1a2e1f / #f5f1e8 | 自然、环保 |
| 牛皮纸 | `kraft-paper` | #2a1e13 / #eedfc7 | 人文、阅读 |
| 沙丘 | `dune` | #1f1a14 / #f0e6d2 | 艺术、设计 |
| 午夜墨 | `midnight-ink` | #0e0d0c / #ece2cf | 游戏、夜景 |

### Swiss 瑞士风（4 套预设强调色）

| 强调色 | data-accent | 色值 | 适合场景 |
|--------|-----------|------|---------|
| 克莱因蓝 | `ikb` | #002FA7 | 通用、科技 |
| 柠檬黄 | `lemon-yellow` | #FFD500 | 年轻、消费 |
| 柠檬绿 | `lemon-green` | #C5E803 | 生态、健康 |
| 安全橙 | `safety-orange` | #FF6B35 | 警示、新闻 |

### 自定义颜色（一等公民功能）

任何主题都支持自定义颜色，设置 `data-theme="custom"` 或 `data-accent="custom"`，然后通过 CSS 变量指定：

```css
:root {
  --user-paper: #1a1a2e;    /* 你的背景色 */
  --user-ink: #eaeaea;      /* 你的文字色 */
  --user-accent: #e94560;   /* 你的强调色 */
}
```

---

## 📐 支持的平台尺寸

| 平台 | 预设尺寸 | CSS class | 说明 |
|------|---------|-----------|------|
| 公众号头图 | 21:9 (2100×900) | `.poster.wide` | 文章顶部封面 |
| 公众号分享卡 | 1:1 (1080×1080) | `.poster.square` | 转发卡片缩略图 |
| 小红书封面 | 3:4 (1080×1440) | `.poster.xhs` | 笔记首图 |
| 小红书轮播 | 1:1 (1080×1080) | `.poster.square` | 多图轮播 |
| Twitter/X | 16:9 (1600×900) | `.poster.wide` | 推文卡片 |
| YouTube 封面 | 16:9 (2560×1440) | `.poster.wide` | 视频封面 |
| **自定义** | 任意尺寸 | `.poster.custom` | 用户指定比例 |

---

## 🗂️ 版式库（34 种）

### Editorial 版式 M01-M16

| 代码 | 名称 | 适合场景 |
|------|------|---------|
| M01 | 大图主导封面 | 人物/产品特写 |
| M02 | 流程步骤 | 教程、操作步骤 |
| M03 | Before/After 对比 | 效果对比 |
| M04 | 时间线 | 发展历程、事件 |
| M05 | 数据英雄区 | 核心数据展示 |
| M06 | 金句分隔 | 名言、核心观点 |
| M07 | 网格画廊 | 多图展示 |
| M08 | 人物卡片 | 个人介绍 |
| M09 | 对比表 | 功能/方案对比 |
| M10 | 清单 | 步骤清单 |
| M11 | FAQ 问答 | 常见问题 |
| M12 | 资源列表 | 工具/资源推荐 |
| M13 | 教程步骤 | 详细教程 |
| M14 | 评分 | 评测、打分 |
| M15 | 活动邀请 | 活动宣传 |
| M16 | 订阅卡 | 关注/订阅引导 |

### Swiss 版式 S01-S12

| 代码 | 名称 | 适合场景 |
|------|------|---------|
| S01 | 数据塔 KPI | 核心指标展示 |
| S02 | 横向柱状图 | 数据对比 |
| S03 | 矩阵+英雄 | 特性矩阵 |
| S04 | 流程图 | 工作流程 |
| S05 | 对比滑块 | 前后对比 |
| S06 | 图标网格 | 功能/特性列表 |
| S07 | 数据网格 | 多维数据 |
| S08 | 时间线 | 里程碑 |
| S09 | 特性列表 | 产品特性 |
| S10 | 价格表 | 定价方案 |
| S11 | 团队网格 | 团队介绍 |
| S12 | CTA 横幅 | 行动号召 |

### 人像版式 P01-P06

| 代码 | 名称 | 人像位置 | 文字位置 |
|------|------|---------|---------|
| P01 | 左侧人像 | 左 40% | 右 60% |
| P02 | 右侧人像 | 右 40% | 左 60% |
| P03 | 背景人像 | 满铺虚化 | 中央叠加 |
| P04 | 顶部人像 | 上 35% | 下 65% |
| P05 | 人像拼贴 | 多张小图 | 留白区域 |
| P06 | 极简人像 | 小圆形 | 大字排版 |

---

## ⚡ 零依赖也能用！

**这个 Skill 的核心是 SKILL.md 工作流 + HTML 模板 + 版式配方，全是文本文件，AI 读了就能干活。脚本只是"加速器"，不是"必须品"。**

| 功能 | 不装任何东西 | 装了 Playwright | 全装（Playwright + API Key + MediaPipe） |
|------|------------|----------------|----------------------------------------|
| 封面 HTML 生成 + 预览 | ✅ preview_url 预览 | ✅ 同左 | ✅ 同左 |
| 自定义颜色 / 比例 / 主题 | ✅ 改 CSS 变量 | ✅ 同左 | ✅ 同左 |
| 版式切换 | ✅ 换版式函数 | ✅ 同左 | ✅ 同左 |
| AI 生图 | ✅ 用 AI 平台自带生图能力 | ✅ 同左 | ✅ 脚本化批量生图 |
| 人脸检测 | ✅ AI 自己看图判断人脸位置 | ✅ 同左 | ✅ 精确坐标（6 关键点） |
| **高清 PNG 输出** | ❌ 只能预览 HTML | ✅ Playwright 截图 | ✅ 同左 |

### 最快体验方式（3 秒上手）

```bash
# 什么都不装，直接克隆
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git

# 然后在任何 AI 编程工具里说：
"读取 NBDE-cover-design-skill/SKILL.md，帮我做个公众号封面，主题是 AI 工具推荐"
# 搞定！AI 会生成 HTML，你直接预览看效果。
```

### 推荐最小安装（1 条命令，解锁 PNG 输出）

```bash
npm install playwright && npx playwright install chromium
```

装完这一条，AI 就能帮你直接截图输出高清 PNG，不用手动在浏览器里截图了。

---

## 🚀 完整安装

### 方式一：直接克隆

```bash
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git
cd NBDE-cover-design-skill
npm install
```

### 方式二：作为 Skill 安装到 WorkBuddy

```bash
# 克隆到用户级 skills 目录
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git ~/.workbuddy/skills/nbde-cover-design-skill
```

### 可选依赖（按需安装）

```bash
# 推荐：Playwright 渲染引擎（解锁高清 PNG 输出）
npm install playwright
npx playwright install chromium

# 可选：AI 生图（至少选一个 provider 的 API Key）
# 不需要额外 npm 包，使用 fetch 调用 API

# 可选：人像封面的人脸检测
npm install @mediapipe/tasks-vision
```

### 环境变量配置（AI 生图用）

```bash
# 推荐先用通义万相（国内最稳定）
export DASHSCOPE_API_KEY="sk-xxxxxxxx"

# 其他 provider（按需配置）
export OPENAI_API_KEY="sk-xxxxxxxx"         # DALL-E 3
export GOOGLE_API_KEY="AIzaxxxxxxxx"         # Imagen 3
export MINIMAX_API_KEY="xxxxxxxx"            # MiniMax
export JIMENG_API_KEY="xxxxxxxx"             # 即梦
```

---

## 📖 各平台使用教程

### 1. Claude Code 使用教程

Claude Code 是 Anthropic 官方的终端 AI 编程工具，直接在命令行中使用。

#### 安装 Skill

```bash
# 方式 A：克隆到项目目录（推荐，Claude Code 会自动读取）
cd your-project
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git

# 方式 B：放到 Claude Code 的 skills 目录
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git ~/.claude/skills/nbde-cover-design-skill
```

#### 使用方法

在项目目录中启动 Claude Code：

```bash
claude
```

然后直接对话即可：

```
你: 帮我生成一张公众号封面，主题是"2026 年 AI 工具推荐"，用 Editorial 墨水经典风格

Claude: [自动读取 SKILL.md → 选择 editorial.html 模板 → 填充内容 → 
        调用 render.mjs 渲染 → 输出 PNG]
```

#### 常用指令示例

```
# 封面生成
"帮我做个公众号头图，主题是 AI 编程工具"

# 小红书封面
"做个小红书封面，关于咖啡推荐，Swiss 柠檬黄风格"

# 人像封面
"用我的照片做个封面"（先发照片）
"这是我的照片，帮我做一张 AI 学习主题的公众号封面"

# AI 生图
"帮我生成一张赛博朋克风格的未来城市图片"

# 调整颜色（随时可改）
"换成蓝色主题"
"背景改成 #1a1a2e"

# 调整比例（随时可改）
"改成 16:9"
"做成正方形"

# 换版式
"换个版式，用 M05 数据英雄区"
```

#### 注意事项

- Claude Code 需要 `node` 和 `npx` 在 PATH 中
- 首次使用需要 `npx playwright install chromium` 安装浏览器
- 人像封面功能需要网络下载 MediaPipe 模型（约 4MB）

---

### 2. OpenAI Codex 使用教程

Codex 是 OpenAI 的终端 AI 编程工具，基于 GPT 模型。

#### 安装 Skill

```bash
# 克隆到工作目录
cd your-project
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git

# 或者放到全局 skills 目录
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git ~/skills/nbde-cover-design-skill
```

#### 使用方法

```bash
# 启动 Codex CLI
codex
```

在 Codex 中使用时，建议先告诉它读取 SKILL.md：

```
你: 请读取 NBDE-cover-design-skill/SKILL.md，然后帮我生成一张公众号封面，主题是"2026 AI 趋势"

Codex: [读取 SKILL.md → 按工作流执行 → 生成封面]
```

#### Codex 专用提示词模板

```
# 封面生成
读取 ./NBDE-cover-design-skill/SKILL.md，按照工作流生成封面：
- 主题：[你的主题]
- 平台：[公众号/小红书/Twitter]
- 风格：[Editorial/Swiss]
- 版式：[M01-M16 / S01-S12 / AI推荐]

# 人像封面
读取 ./NBDE-cover-design-skill/SKILL.md，用人像封面功能：
- 照片路径：[图片路径]
- 主题：[你的主题]
- 版式：[P01-P06]

# AI 生图
读取 ./NBDE-cover-design-skill/SKILL.md，用 AI 生图功能：
- 提示词：[描述]
- Provider：[dashscope/openai]
```

#### 注意事项

- Codex 的沙箱环境可能无法运行 Playwright，建议使用 `--full-auto` 模式
- AI 生图需要配置 `OPENAI_API_KEY` 或 `DASHSCOPE_API_KEY`
- 如果 Playwright 不可用，可以让 Codex 直接生成 HTML 文件，手动在浏览器中打开

---

### 3. Cursor 使用教程

Cursor 是基于 VS Code 的 AI 编程 IDE。

#### 安装 Skill

```bash
# 在 Cursor 打开的项目根目录下克隆
cd your-project
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git
```

#### 配置 Cursor Rules

在项目根目录创建 `.cursor/rules/nbde-cover.md`：

```markdown
# 宇宙第一封面图生成 Skill

当用户请求生成封面、头图、AI 生图时，读取 `NBDE-cover-design-skill/SKILL.md` 并按工作流执行。

关键规则：
1. 始终基于种子模板生成，不要从零写 HTML
2. 自定义颜色和比例是一等公民
3. 人像封面必须做人脸避让
4. 输出前必须做对比度检查

模板路径：NBDE-cover-design-skill/assets/templates/
版式函数：NBDE-cover-design-skill/assets/layouts/
渲染脚本：NBDE-cover-design-skill/scripts/render.mjs
```

#### 使用方法

在 Cursor 的 Chat 面板（Cmd+L / Ctrl+L）中：

```
你: @NBDE-cover-design-skill 帮我生成一张小红书封面，主题是"居家咖啡指南"，Editorial 牛皮纸风格

Cursor: [读取 SKILL.md → 选择 editorial.html → 设置 data-theme="kraft-paper" → 
        填充内容 → 渲染 PNG]
```

#### 在 Composer 中使用（Cmd+I / Ctrl+I）

Composer 模式下可以批量生成多张封面：

```
@NBDE-cover-design-skill 帮我生成 3 张公众号封面，同一主题"AI 工具推荐"：
1. Editorial 墨水经典，M01 大图主导
2. Swiss 克莱因蓝，S01 数据塔
3. Editorial 靛蓝瓷，M05 数据英雄区
```

---

### 4. Windsurf 使用教程

Windsurf（原 Codeium）是 AI-first 的编程 IDE。

#### 安装 Skill

```bash
cd your-project
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git
```

#### 配置 Windsurf Rules

在 `.windsurfrules` 文件中添加：

```
当用户请求生成封面、头图、配图时，优先读取 NBDE-cover-design-skill/SKILL.md 的工作流执行。

可用模板：
- Editorial 杂志风：NBDE-cover-design-skill/assets/templates/editorial.html
- Swiss 瑞士风：NBDE-cover-design-skill/assets/templates/swiss.html
- 人像封面：NBDE-cover-design-skill/assets/templates/portrait.html

渲染方式：node NBDE-cover-design-skill/scripts/render.mjs <html> <png> --width W --height H
```

#### 使用方法

在 Windsurf 的 Cascade 面板中：

```
你: 帮我生成一张公众号封面，主题"效率工具推荐"

Windsurf: [自动识别封面生成意图 → 读取 SKILL.md → 执行工作流]
```

---

### 5. WorkBuddy 使用教程

WorkBuddy 是你当前正在使用的 AI 工作台。

#### 安装 Skill

```bash
# 克隆到用户级 skills 目录（所有项目可用）
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git ~/.workbuddy/skills/nbde-cover-design-skill

# 或者克隆到项目级 skills 目录（仅当前项目可用）
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git .workbuddy/skills/nbde-cover-design-skill
```

#### 使用方法

直接对话即可，WorkBuddy 会自动加载 SKILL.md：

```
你: 帮我生成一张公众号封面，AI 学习主题

WorkBuddy: [自动触发 nbde-cover-design-skill → 执行工作流]
```

#### 触发关键词

- "封面" / "封面图" / "头图" / "cover"
- "公众号封面" / "小红书封面"
- "人像封面" / "用我的照片做封面"
- "AI 生图" / "生成图片"

---

### 6. GitHub Copilot 使用教程

#### 安装 Skill

```bash
cd your-project
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git
```

#### 使用方法

在 VS Code 中打开项目，使用 Copilot Chat：

```
你: @workspace 请读取 NBDE-cover-design-skill/SKILL.md，帮我生成一张小红书封面，主题是"周末阅读清单"

Copilot: [读取 SKILL.md → 生成 HTML → 提供渲染命令]
```

#### 注意事项

- Copilot Chat 无法直接运行 Playwright，需要你在终端手动执行渲染命令
- 建议让 Copilot 生成 HTML 后，手动运行：
  ```bash
  node NBDE-cover-design-skill/scripts/render.mjs output.html output.png --width 1080 --height 1440
  ```

---

### 7. 通用终端 / 脚本使用

如果你不用任何 AI 编程工具，也可以直接用脚本：

```bash
# 1. 渲染 HTML 到 PNG
node scripts/render.mjs output/index.html output/cover.png --width 2100 --height 900

# 2. 人脸检测（人像封面用）
node scripts/face-detect.mjs photo.jpg --output json

# 3. AI 生图
node scripts/image-gen.mjs --prompt "cyberpunk city at night" --provider dashscope --count 4

# 4. 颜色工具
node scripts/color-utils.mjs contrast "#0a0a0b" "#f3f0e8"   # 计算对比度
node scripts/color-utils.mjs auto-text "#0a0a0a"              # 自动选择文字色
node scripts/color-utils.mjs theme "#002FA7"                  # 从主色生成主题
```

---

## 🔄 完整工作流示例

### 示例 1：公众号封面（纯主题）

```
你: 帮我做个公众号头图，主题是"2026 年 AI 编程工具 Top 10"

AI 工作流：
1. 意图识别 → 能力3（多平台封面）
2. 平台 → 公众号 21:9 (2100×900)
3. AI 推荐 → Editorial 靛蓝瓷 + M05 数据英雄区
4. 填充模板 → 渲染预览
5. 你: "换成 Swiss 克莱因蓝风格"
6. 改 data-accent → 重渲 → 展示新图
7. 你: "OK，输出吧"
8. 输出 PNG → 完成
```

### 示例 2：小红书封面（人像）

```
你: [发一张自拍] 用这张照片做个小红书封面，主题是"我的 AI 学习笔记"

AI 工作流：
1. 意图识别 → 能力4（人像封面）
2. 人脸检测 → 发现人脸在左侧偏中
3. 推荐 → P01 左侧人像版式
4. 注入人脸坐标 → 文字避开人像
5. 填充模板 → 渲染预览
6. 你: "换个颜色，强调色用粉色"
7. 改 --user-accent → 重渲
8. 你: "完美"
9. 输出 PNG → 完成
```

### 示例 3：AI 生图

```
你: 帮我生成 4 张关于"未来城市"的图片，赛博朋克风格

AI 工作流：
1. 意图识别 → 能力1（AI 生图）
2. Provider → DashScope（默认）
3. 生成 4 张候选图
4. 你: "第 2 张不错，但颜色暗了点"
5. 调整 prompt → 重新生成
6. 你: "这张 OK"
7. 输出 PNG → 完成
```

---

## 📁 文件结构

```
NBDE-cover-design-skill/
├── SKILL.md                         ← Skill 定义（7 步工作流 + 意图检测）
├── README.md                        ← 你正在读的文件
├── package.json                     ← npm 依赖
├── .gitignore
│
├── assets/
│   ├── templates/
│   │   ├── editorial.html           ← Editorial 种子模板（6 主题 + 自定义）
│   │   ├── swiss.html               ← Swiss 种子模板（4 强调色 + 自定义）
│   │   └── portrait.html            ← 人像封面种子模板（P01-P06 版式）
│   ├── layouts/
│   │   ├── editorial-16.js          ← M01-M16 版式注入函数
│   │   ├── swiss-12.js              ← S01-S12 版式注入函数
│   │   └── portrait-6.js            ← P01-P06 版式注入函数
│   ├── magazine-bg-webgl.js         ← WebGL 墨水流动背景
│   └── fonts/                        ← 字体文件
│
├── scripts/
│   ├── render.mjs                   ← Playwright PNG 渲染器
│   ├── face-detect.mjs              ← MediaPipe 人脸检测
│   ├── image-gen.mjs                ← AI 生图（多 Provider）
│   └── color-utils.mjs              ← 对比度计算 + 自适应文字色
│
└── references/
    ├── themes.md                    ← 10 套主题色票 + 自定义颜色规则
    ├── layouts-cover.md             ← 28 种封面版式说明
    ├── layouts-portrait.md          ← 6 种人像版式说明
    ├── platforms.md                  ← 各平台尺寸规范
    ├── portrait-rules.md            ← 人像封面设计规范（避让/遮罩/裁切）
    └── qa-checklist.md              ← 质量检查清单
```

---

## 🛠️ 技术栈

| 模块 | 技术 | 说明 |
|------|------|------|
| 渲染引擎 | Playwright (Chromium) | 支持 WebGL、自定义字体、Retina 截图 |
| 人脸检测 | MediaPipe Tasks Vision | 轻量、本地运行、6 个关键点 |
| AI 生图 | DashScope / OpenAI / Google / MiniMax / 即梦 | 多 Provider，按需选择 |
| 中文字体 | Noto Sans SC / Noto Serif SC | Google Fonts CDN 加载 |
| 英文字体 | Inter / Playfair Display / IBM Plex Mono | Google Fonts CDN 加载 |
| HTML 模板 | 单文件 HTML + CSS 变量 | 无构建步骤，Playwright 直接打开 |
| 颜色计算 | WCAG 2.0 对比度算法 | 自动检测文字可读性 |

---

## ⚡ 快速调整指南

这是这个 Skill 最核心的体验——**随时改，秒级出图**：

| 你说的话 | AI 做的事 | 技术实现 |
|---------|----------|---------|
| "换成蓝色" | 改颜色 | 更新 CSS `--user-accent` 变量 |
| "背景改成白色" | 改背景 | 更新 CSS `--user-paper` 变量 |
| "改成 16:9" | 改比例 | 更新 CSS `--canvas-w/h` 变量 |
| "做成正方形" | 改比例 | 切换到 `.poster.square` |
| "换个版式" | 换版式 | 换版式注入函数 + layout class |
| "标题改成..." | 改文字 | 更新 HTML 内容 |
| "人像放大" | 调人像 | 更新 CSS `--portrait-w/h` |
| "这张图不好看" | 重生图 | 重新调用 AI 生图 |
| "文字移到右边" | 调人像版式 | 切换 P01↔P02 |

---

## 🎯 触发关键词

- "封面" / "封面图" / "头图" / "封面制作" / "cover"
- "公众号封面" / "公众号头图" / "WeChat cover"
- "小红书封面" / "小红书图片" / "Xiaohongshu cover"
- "人像封面" / "用我的照片做封面" / "portrait cover"
- "AI 生图" / "生成图片" / "generate image"
- "Twitter 封面" / "YouTube 封面"

---

## 📝 致谢

基于以下优秀项目融合构建：

- [guizang-social-card-skill](https://github.com/op7418/guizang-social-card-skill) — 视觉系统、主题预设、版式配方
- [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) — Swiss & Editorial 设计原则
- [html-anything](https://github.com/nexu-io/html-anything) — 模板生态
- [baoyu-skills](https://github.com/JimLiu/baoyu-skills) — 多 Provider AI 生图

---

## 📄 License

MIT
