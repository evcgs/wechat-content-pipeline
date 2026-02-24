---
name: wechat-content-pipeline
description: "微信公众号内容生产流水线 - 整合搜索验证、图片生成、发布全流程"
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

微信公众号内容生产流水线 - 整合搜索验证、图片生成、发布全流程。

## 功能

- ✅ **搜索验证** - 使用 SerpAPI 搜索和获取网络信息
- ✅ **图片生成** - 使用火山引擎生成封面图和内文图
- ✅ **微信发布** - 使用 wenyan-cli 一键发布到微信公众号草稿箱
- ✅ **统一配置** - 一个配置文件管理所有密钥
- ✅ **统一入口** - 一个命令完成所有操作

## 两种使用方式

### 方式 1: 作为 OpenClaw 技能使用（推荐）

将此文件夹复制到你的 OpenClaw workspace 的 `skills/` 目录下：

```bash
cp -r wechat-content-pipeline ~/.openclaw/workspace/skills/
```

然后在 OpenClaw 中使用：
```
"帮我发布这篇文章到微信公众号" + 附带文章路径
```

### 方式 2: 作为独立 Node.js 工具使用

```bash
git clone https://github.com/evcgs/wechat-content-pipeline.git
cd wechat-content-pipeline
npm install
npm link  # 可选，全局链接
```

然后使用命令行：
```bash
wechat-pipeline pipeline --article ./content/my-article.md
```

## 安装（作为 OpenClaw 技能）

### 1. 复制技能到 OpenClaw

```bash
# 假设你的 OpenClaw workspace 在 ~/.openclaw/workspace
cp -r wechat-content-pipeline ~/.openclaw/workspace/skills/
```

### 2. 安装依赖

```bash
cd ~/.openclaw/workspace/skills/wechat-content-pipeline
npm install
```

### 3. 安装 wenyan-cli（必需）

```bash
npm install -g @wenyan-md/cli
wenyan --help
```

### 4. 配置

复制配置模板：
```bash
cd ~/.openclaw/workspace/skills/wechat-content-pipeline
cp config/config.example.json config/config.json
```

编辑 `config/config.json`，填入你的 API 密钥。

详细配置指南见：[CONFIG.md](./CONFIG.md)

### 5. 验证安装

运行验证命令：

```bash
cd ~/.openclaw/workspace/skills/wechat-content-pipeline
node bin/wechat-pipeline.js doctor
```

或者如果你做了 `npm link`：
```bash
wechat-pipeline doctor
```

**成功输出示例：**
```
✅ Node.js: v18.0.0
✅ npm: 9.0.0
✅ wenyan-cli: 1.0.0
✅ 项目依赖: 已安装
✅ 配置文件: config/config.json 已存在

✅ 所有检查通过！安装成功！

快速开始：
  wechat-pipeline --help
```

## 在 OpenClaw 中使用

### 完整流水线

```
"帮我运行完整流水线发布这篇文章"
+ 附带文章路径：./content/my-article.md
```

### 分步使用

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

## 命令行使用（独立工具）

```bash
# 查看帮助
wechat-pipeline --help

# 完整流水线
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

## 致谢与声明

本项目整合了以下优秀的开源工具和服务：

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

## 更多文档

- [CONFIG.md](./CONFIG.md) - 详细配置指南
- [QUICKSTART.md](./QUICKSTART.md) - MVP 快速开始
- [README.md](./README.md) - 项目说明

## License

MIT
