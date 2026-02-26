# wechat-content-pipeline

微信公众号内容生产流水线 - 完整的 9 步内容生产流程。

**支持两种使用方式：**
1. ✅ 作为 **OpenClaw 技能**使用
2. ✅ 作为 **独立 Node.js 工具**使用

---

## 📢 重要更新记录

### 2026-02-26：输出物规范 + 9 个调整 ⭐⭐⭐（重要）

本次更新是**非常重要的输出物规范更新**，明确了所有输出物的要求！

#### 📋 新增：输出物规范（8个规范）

**规范 1：选题推荐过程必须保存**
- 不仅要保存「选题确认」，还要保存「选题推荐过程」
- 包含：初始推荐、第一轮推荐、用户反馈、第二轮推荐、用户确认、第三轮推荐、最终确认
- 作为资产沉淀，以便后续复用

**规范 2：历史选题推荐过程必须补充保存**
- 所有历史选题的推荐过程都必须补充保存
- 对应到对应日期及主题
- 确保不丢失

**规范 3：配图建议必须区分封面图和文内图**
- 封面图放在最前面
- 封面图需要有：风格、画面、尺寸、详细生图提示词
- 文内图按顺序排列

**规范 4：选题建议的结构**
- 我的建议（推荐）放在最前面
- 然后是支持理由
- 然后是三个选题（含侧重点、钩子、亮点）

**规范 5：每个选题必须有侧重点和钩子**
- 每个选题都有「侧重点」
- 每个选题都有「钩子」（开头场景）
- 侧重点和钩子每个选题都不一样

**规范 6：不要只发文件路径，要把生成后的内容直接发到聊天界面**
- 文字内容直接发
- 图片文件直接发（用 message 工具）
- 每一步完成后，都把结果发到聊天界面

**规范 7：发布前先确认发布到哪个公众号**
- 发布前先询问用户
- 提供清晰的选项
- 等待用户确认后，再执行发布操作

**规范 8：重要更新要记录在 README.md 中**
- 在 README.md 开头添加「重要更新记录」部分
- 记录每次的重要更新
- 让用户可以看到本次做了什么重要更新

---

### 2026-02-26：启动引导流程 + 5 大优化 ⭐⭐⭐（重要）

本次更新是**非常重要的使用说明更新**，极大提升了用户体验！

#### 🚀 新增：启动引导流程

当用户说「帮我写一篇公众号文章」时，技能会自动给出引导提示，询问 4 个关键问题：

1. 📝 文章主题/选题是什么？
2. 🎯 目标读者是谁？
3. 📋 文章类型是？（A.深度分析类 / B.行业观察类 / C.产品发布类 / D.案例分享类）
4. 💡 有什么特别想强调的点吗？（可选）

用户提供信息后，技能会确认并告知完整流程，然后自动开始执行。

**还提供了 3 个内置场景模板：**
- 深度分析类
- 产品发布类
- 案例分享类

#### 🔧 同时修复了 4 个重要问题：

1. ✅ **图片没有保存在对应目录** - 生成图片后，自动复制到文章所在目录的 `images` 子文件夹
2. ✅ **每一步都把生成内容发到聊天界面** - 选题、创意点、证据链、大纲、文章、图片...每一步完成后都发送结果
3. ✅ **发送消息时始终包含 target 参数** - 确保消息发送到正确的聊天
4. ✅ **发布前先询问发布到哪个公众号** - 支持多个公众号配置，发布前让用户选择

---

**完整的优化后的工作流：**

```
用户说「帮我写文章」
    ↓
[引导] 给出引导提示，询问 4 个问题
    ↓
用户提供信息
    ↓
[确认] 确认信息，告知流程
    ↓
[执行步骤 1-9，每一步都发送结果]
    ↓
[发布前询问] 发布到哪个公众号？
    ↓
用户确认
    ↓
[发布] 执行发布操作
```

---

**更多细节见：[SKILL.md](./SKILL.md)**

---

## 📢 重要更新记录（结束）

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
