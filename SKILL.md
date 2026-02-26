---
name: wechat-content-pipeline
description: "微信公众号内容生产流水线 - 完整的 9 步内容生产流程"
metadata:
  {
    "openclaw":
      {
        "emoji": "📱",
        "requires": { "bins": ["node", "npm"], "env": ["SERPAPI_KEY", "VOLCENGINE_API_KEY", "ARK_API_KEY", "WECHAT_APP_ID", "WECHAT_APP_SECRET"] },
      },
  }
---

# wechat-content-pipeline (OpenClaw Skill)

微信公众号内容生产流水线 - 完整的 9 步内容生产流程。

**同时支持两种方式：**
1. ✅ 作为 **OpenClaw 技能**使用（推荐）
2. ✅ 作为 **独立 Node.js 工具**使用

---

## 🔧 双模型架构说明

本项目采用**双模型分离架构**，文字生成和图片生成使用不同的模型，各自独立配置：

### 1. 文字生成模型（OpenClaw 配置）
- **用途：** 文章撰写、创意提炼、大纲搭建等文字类任务
- **配置位置：** OpenClaw 全局配置中的默认大模型
- **使用场景：** 步骤 1-6、步骤 8 的文字处理工作

### 2. 图片生成模型（技能独立配置）
- **用途：** 封面图、内文配图的生成
- **配置位置：** 技能独立配置文件 `config/config.json` 中的火山引擎（Volcengine）API
- **相关技能：** 本项目依赖 `volcengine-image-gen` 技能进行图片生成
- **使用场景：** 步骤 7 的图片生成工作

**为什么分开配置？**
- 文字和图片对模型的要求不同，分离可以灵活选择最适合的模型
- 图片生成通常需要更高的 API 配额，独立配置便于成本控制
- 可以单独更新/切换其中一个模型，不影响另一个的使用

---

## 完整内容生产工作流（9步）

```
1. 选题确认
   ↓
2. 创意点提炼（5个核心创意点+金句）
   ↓
3. 证据链整理（每个创意点2-3个证据+来源）
   ↓
4. 大纲搭建（三级大纲，约2500-3000字）
   ↓
5. 写文章（初稿）
   ↓
6. 搜索验证（SerpAPI搜索修正）
   ↓
7. 生成图片（火山引擎生图）
   ↓
8. 插入图片/更新文章
   ↓
9. 发布（微信公众号）
```

---

## 功能

- ✅ **搜索验证** - 使用 SerpAPI 搜索和获取网络信息
- ✅ **图片生成** - 使用火山引擎生成封面图和内文图
- ✅ **微信发布** - 使用 wenyan-cli 一键发布到微信公众号草稿箱
- ✅ **统一配置** - 一个配置文件管理所有密钥
- ✅ **统一入口** - 一个命令完成所有操作
- ✅ **安装验证** - 使用 `doctor` 命令验证安装是否成功
- ✅ **完整模板** - 9 步工作流的完整模板

---

## 方式 1: 作为 OpenClaw 技能使用（推荐）

### 安装步骤

1. **复制技能到 OpenClaw**

```bash
# 假设你的 OpenClaw workspace 在 ~/.openclaw/workspace
cp -r wechat-content-pipeline ~/.openclaw/workspace/skills/
```

2. **安装依赖**

```bash
cd ~/.openclaw/workspace/skills/wechat-content-pipeline
npm install
```

3. **安装 wenyan-cli（必需）**

```bash
npm install -g @wenyan-md/cli
wenyan --help
```

4. **配置**

```bash
cd ~/.openclaw/workspace/skills/wechat-content-pipeline
cp config/config.example.json config/config.json
```

编辑 `config/config.json`，填入你的 API 密钥。

5. **验证安装**

```bash
cd ~/.openclaw/workspace/skills/wechat-content-pipeline
node bin/wechat-pipeline.js doctor
```

### 在 OpenClaw 中使用

#### 完整流水线

```
"帮我运行完整流水线发布这篇文章"
+ 附带文章路径：./content/my-article.md
```

#### 分步使用

```
"帮我搜索验证这篇文章的信息"
+ 附带文章路径
```

```
"帮我生成这篇文章的配图"
+ 附带文章路径
```

```
"帮我发布这篇文章到微信公众号"
+ 附带文章路径
```

---

## 方式 2: 作为独立 Node.js 工具使用

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/evcgs/wechat-content-pipeline.git
cd wechat-content-pipeline
npm install
npm link  # 可选，全局链接命令
```

2. **安装 wenyan-cli（必需）**

```bash
npm install -g @wenyan-md/cli
wenyan --help
```

3. **配置**

```bash
cp config/config.example.json config/config.json
```

编辑 `config/config.json`，填入你的 API 密钥。

4. **验证安装**

```bash
wechat-pipeline doctor
```

### 使用命令行

```bash
# 查看帮助
wechat-pipeline --help

# 完整流水线（一条龙）
wechat-pipeline pipeline --article ./content/my-article.md

# 分步执行
wechat-pipeline search --article ./content/my-article.md
wechat-pipeline image --article ./content/my-article.md
wechat-pipeline publish --file ./content/my-article.md

# 单独使用
wechat-pipeline search --query "搜索关键词"
wechat-pipeline image --prompt "图片描述" --size 2560x1440 --type cover
wechat-pipeline publish --file ./content/my-article.md

# 配置管理
wechat-pipeline config --init
wechat-pipeline config --show
```

---

## 验证安装（重要！）

安装完成后，运行验证命令：

```bash
wechat-pipeline doctor
```

**成功输出示例：**
```
╔══════════════════════════════════════════════════════════╗
║           wechat-content-pipeline 安装验证                ║
╚══════════════════════════════════════════════════════════╝

✅ Node.js: v18.0.0
✅ npm: 9.0.0
✅ wenyan-cli: 1.0.0
✅ 项目依赖: 已安装
✅ 配置文件: config/config.json 已存在

✅ 所有检查通过！安装成功！

快速开始：
  wechat-pipeline --help
```

---

## 工作流模板（9步）

项目提供了完整的 9 步工作流模板，位于 `templates/workflow/` 目录：

| 步骤 | 模板文件 | 说明 |
|------|----------|------|
| 1 | `01-topic.md` | 选题确认模板 |
| 2 | `02-ideas.md` | 创意点提炼模板 |
| 3 | `03-evidence.md` | 证据链整理模板 |
| 4 | `04-outline.md` | 大纲搭建模板 |
| 5 | `05-article.md` | 文章初稿模板 |
| 6 | （无需模板） | 搜索验证（使用 wechat-pipeline search） |
| 7 | （无需模板） | 生成图片（使用 wechat-pipeline image） |
| 8 | `08-publish.md` | 发布版本模板（含 frontmatter） |
| 9 | （无需模板） | 发布（使用 wechat-pipeline publish） |

直接复制使用即可！

**⚠️ 重要提示（配图建议）：**
- 在**草稿版本**（步骤 5）中，可以在文章底部保留「配图建议」部分，用作生图的参考
- 在**正式发布版本**（步骤 8）中，需要去掉「配图建议」部分，只保留正文内容

---

## 项目结构

```
wechat-content-pipeline/
├── SKILL.md                # OpenClaw 技能说明（本文档）
├── README.md               # GitHub 项目说明
├── CONFIG.md               # 详细配置指南
├── QUICKSTART.md           # MVP 快速开始
├── WORKFLOW.md             # 完整 9 步工作流
├── package.json            # Node.js 配置
│
├── assets/                 # 图片资源
│   ├── group-qrcode.png   # 使用群二维码
│   └── personal-qrcode.png # 个人微信二维码
│
├── bin/                    # 可执行文件
│   └── wechat-pipeline.js # 主入口
│
├── src/                    # 源代码
│   ├── config/            # 配置管理
│   ├── search/            # 搜索模块
│   ├── image/             # 图片生成模块
│   ├── publish/           # 发布模块
│   └── pipeline/          # 流水线
│
├── config/                 # 配置文件
│   └── config.example.json # 配置模板
│
├── templates/              # 工作流模板
│   └── workflow/           # 9 步模板
│
├── examples/               # 示例
├── content/                # 文章目录（默认）
└── images/                 # 图片目录（默认）
```

---

## 更多文档

- [WORKFLOW.md](./WORKFLOW.md) - 完整 9 步内容生产工作流
- [README.md](./README.md) - GitHub 项目说明
- [CONFIG.md](./CONFIG.md) - 详细配置指南
- [QUICKSTART.md](./QUICKSTART.md) - MVP 快速开始
- [templates/workflow/](./templates/workflow/) - 工作流模板（9步）

---

## 致谢与声明

本项目整合了以下优秀的开源工具和服务：

### 核心依赖

- **[wenyan-cli](https://github.com/caol64/wenyan-cli)** - 微信公众号 Markdown 发布工具
  - 作者：caol64
  - License：Apache License 2.0
  - 用途：核心的微信公众号发布功能

- **[SerpAPI](https://serpapi.com)** - 网络搜索 API
  - 用途：搜索和获取网络信息

- **火山引擎 Ark Images API** - 图片生成 API
  - 用途：生成文章配图

### 开发框架

- **[Commander.js](https://github.com/tj/commander.js)** - 命令行界面开发
- **[Chalk](https://github.com/chalk/chalk)** - 终端彩色输出
- **[Inquirer.js](https://github.com/SBoudrias/Inquirer.js)** - 交互式命令行
- **[Ora](https://github.com/sindresorhus/ora)** - 终端加载动画

---

---

## 🔧 重要：修复后的工作流程（CRITICAL!）

### 问题修复记录

#### 问题 1：图片没有保存在对应目录 ✅ 已修复
**症状：**
- 图片生成在临时目录 `tmp/volcengine-image-gen-<timestamp>/`
- 但文章在 `wisediag-content/02_内容生产/草稿/`
- wenyan 工具在草稿文件夹找 images 子目录，但图片在上一级

**修复方案：**
1. 生成图片后，立即在文章所在目录创建 `images` 子文件夹
2. 把所有生成的 PNG 图片复制到该 `images` 子文件夹
3. 确保文章中的图片路径使用相对路径：`![](./images/001-xxx.png)`

---

#### 问题 2：连续性没有把生成后的内容发到聊天界面 ✅ 已修复
**症状：**
- 生成图片后，没有把图片直接发到聊天界面
- 生成文章后，没有把文章内容发到聊天界面
- 用户需要点击文件路径查看，但无法点击
- 用户多次反馈：「需要你把生成后的图文文件，在聊天窗口发我」

**修复方案：**
1. **每一步生成完成后，都要把结果发到聊天界面！**
   - 选题确认后 → 发送选题内容
   - 创意点提炼后 → 发送创意点内容
   - 证据链整理后 → 发送证据链内容
   - 大纲搭建后 → 发送大纲内容
   - 文章初稿后 → **发送完整文章内容**
   - 搜索验证后 → 发送验证报告
   - 图片生成后 → 发送每一张图片
   - 配图版文章后 → **发送完整配图版文章**
2. 发送每一张生成的图片
3. 同时发送文字说明，告知用户生成完成

---

#### 问题 3：发送图片时缺少 target 参数 ✅ 已修复
**症状：**
```
Action send requires a target.
```

**修复方案：**
1. **始终包含 `target` 参数！**
2. Target 格式：`chat:oc_500b66886af072e904575b2abe4177e0`（当前聊天 ID）
3. Channel：`feishu`（当前渠道）

**正确的 message 工具调用格式：**

```javascript
{
  "action": "send",
  "channel": "feishu",
  "target": "chat:oc_500b66886af072e904575b2abe4177e0",
  "message": "这是生成的文章：\n\n[文章内容...]",
  "media": "/path/to/image.png"  // 可选，用于发送图片
}
```

**发送文章内容的示例：**
```javascript
{
  "action": "send",
  "channel": "feishu",
  "target": "chat:oc_500b66886af072e904575b2abe4177e0",
  "message": "✅ 文章初稿已完成！\n\n[完整文章内容...]"
}
```

---

### 修复后的完整工作流

```
1. 选题确认
   ↓
   [发送] 把选题内容发到聊天界面
   ↓
2. 创意点提炼
   ↓
   [发送] 把创意点内容发到聊天界面
   ↓
3. 证据链整理
   ↓
   [发送] 把证据链内容发到聊天界面
   ↓
4. 大纲搭建
   ↓
   [发送] 把大纲内容发到聊天界面
   ↓
5. 写文章（初稿）
   ↓
   [发送] 把完整文章内容发到聊天界面
   ↓
6. 搜索验证
   ↓
   [发送] 把验证报告发到聊天界面
   ↓
7. 生成图片
   ↓
   [修复点 1] 复制图片到文章所在目录的 images 子文件夹
   [修复点 2] 用 message 工具把图片发到聊天界面（包含 target 参数）
   ↓
8. 插入图片/更新文章
   ↓
   [发送] 把完整配图版文章发到聊天界面
   ↓
9. 发布前确认
   ↓
   [交互] 询问用户：发布到哪个公众号？
   ↓
   选项：
   - wisediag（新公众号）
   - wisediag-old（旧公众号）
   - 两个都发布
   ↓
10. 发布（微信公众号）
```

---

### 发布前交互流程（重要！）

在发布到微信公众号之前，**必须先询问用户**：

**询问格式示例：**

```
✅ 文章和配图都准备好了！

现在可以发布到微信公众号了。请确认要发布到哪个公众号：

1. wisediag（新公众号）
2. wisediag-old（旧公众号）
3. 两个都发布

请告诉我你的选择（1/2/3，或者直接说公众号名称）
```

**用户确认后，再执行发布操作。**

---

### 当前配置的公众号列表

根据 `wechat-accounts.json`：

| 账号名称 | AppID | 说明 |
|---------|-------|------|
| wisediag | wx334a2ae769398e79 | 新公众号（默认） |
| wisediag-old | wx38f7c5b274a58e3c | 旧公众号 |

---

### 关键检查清单（每次生成后必须检查）

- [ ] **每一步完成后，都把结果内容发到聊天界面！**
- [ ] 图片已复制到文章所在目录的 `images` 子文件夹
- [ ] 文章中的图片路径使用相对路径：`![](./images/xxx.png)`
- [ ] 所有生成的图片已通过 `message` 工具发送到聊天界面
- [ ] 发送消息时**始终包含 `target` 参数**
- [ ] Target 格式正确：`chat:oc_500b66886af072e904575b2abe4177e0`
- [ ] **发布前必须先询问用户：发布到哪个公众号？**
  - 选项：wisediag / wisediag-old / 两个都发布
  - 等待用户确认后，再执行发布操作

---

## License

MIT
