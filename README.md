# wechat-content-pipeline

微信公众号内容生产流水线 - 完整的 9 步内容生产流程。

**支持两种使用方式：**
1. ✅ 作为 **OpenClaw 技能**使用
2. ✅ 作为 **独立 Node.js 工具**使用

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

**详细说明见：[WORKFLOW.md](./WORKFLOW.md)

**完整模板见：[templates/workflow/](./templates/workflow/)**

---

## 功能

- ✅ **搜索验证** - 使用 SerpAPI 搜索和获取网络信息
- ✅ **图片生成** - 使用火山引擎生成封面图和内文图
- ✅ **微信发布** - 使用 wenyan-cli 一键发布到微信公众号草稿箱
- ✅ **统一配置** - 一个配置文件管理所有密钥
- ✅ **统一入口** - 一个命令完成所有操作
- ✅ **安装验证** - 使用 `doctor` 命令验证安装是否成功

---

## 两种使用方式

### 方式 1: 作为 OpenClaw 技能使用（推荐）

如果你使用 OpenClaw，这是最简单的方式。

#### 安装步骤

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

#### 在 OpenClaw 中使用

```
"帮我运行完整流水线发布这篇文章"
+ 附带文章路径：./content/my-article.md
```

更多细节见：[SKILL.md](./SKILL.md)

---

### 方式 2: 作为独立 Node.js 工具使用

如果你不使用 OpenClaw，可以作为独立命令行工具使用。

#### 安装步骤

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

#### 使用命令行

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

## 交流与反馈

### 使用群

扫码加入使用群，交流问题、分享经验：

![使用群二维码](./assets/group-qrcode.png)

### 个人微信

有问题也可以直接加我微信：

![个人微信二维码](./assets/personal-qrcode.png)

---

## 配置

详细配置指南请见：[CONFIG.md](./CONFIG.md)

包含：
- wenyan-cli 详细配置
- 如何获取微信公众号 AppID 和 AppSecret
- 如何设置 IP 白名单
- 完整配置示例

---

## 文章格式要求

文章必须包含 frontmatter：

```markdown
---
title: 文章标题（必填）
cover: ./images/cover.png（必填，本地路径或网络URL）
---

# 正文开始

你的内容...

![图片说明](./images/image1.png)
```

---

## 项目结构

```
wechat-content-pipeline/
├── SKILL.md                # OpenClaw 技能说明
├── README.md               # 本文档
├── CONFIG.md               # 详细配置指南
├── QUICKSTART.md           # MVP 快速开始
├── package.json            # Node.js 配置
│
├── assets/                 # 图片资源
│   ├── group-qrcode.png   # 使用群二维码
│   └── personal-qrcode.png # 个人微信二维码
│
├── bin/                    # 可执行文件
├── src/                    # 源代码
│   ├── config/            # 配置管理
│   ├── search/            # 搜索模块
│   ├── image/             # 图片生成模块
│   ├── publish/           # 发布模块
│   └── pipeline/          # 流水线
├── config/                 # 配置文件
├── content/                # 文章目录（默认）
├── images/                 # 图片目录（默认）
└── examples/               # 示例
```

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

### 说明

- 本项目是一个**流程整合工具**，旨在把多个独立工具串联起来，提供统一的使用体验
- 所有核心功能都依赖上述开源项目和服务
- 如果你觉得这个项目有用，请也给上述项目点个 Star ⭐

---

## 更多文档

- [WORKFLOW.md](./WORKFLOW.md) - 完整 9 步内容生产工作流
- [SKILL.md](./SKILL.md) - OpenClaw 技能说明
- [CONFIG.md](./CONFIG.md) - 详细配置指南
- [QUICKSTART.md](./QUICKSTART.md) - MVP 快速开始
- [templates/workflow/](./templates/workflow/) - 工作流模板（9步）

---

## License

MIT
