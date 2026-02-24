# wechat-content-pipeline

微信公众号内容生产流水线 - 整合搜索验证、图片生成、发布全流程。

## 功能

- ✅ **搜索验证** - 使用 SerpAPI 搜索和验证竞品信息
- ✅ **图片生成** - 使用火山引擎生成封面图和内文图
- ✅ **微信发布** - 使用 wenyan-cli 一键发布到微信公众号草稿箱
- ✅ **统一配置** - 一个配置文件管理所有密钥
- ✅ **统一入口** - 一个命令完成所有操作

## 致谢与声明

本项目整合了以下优秀的开源工具和服务：

### 核心依赖

- **[wenyan-cli](https://github.com/caol64/wenyan-cli)** - 微信公众号 Markdown 发布工具
  - 作者：caol64
  - License：Apache License 2.0
  - 用途：核心的微信公众号发布功能

- **[SerpAPI](https://serpapi.com)** - 网络搜索 API
  - 用途：搜索和验证竞品信息

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

## 快速开始

### 1. 安装

```bash
git clone https://github.com/evcgs/wechat-content-pipeline.git
cd wechat-content-pipeline
npm install
```

### 2. 配置

复制配置模板：

```bash
cp config/config.example.json config/config.json
```

编辑 `config/config.json`，填入你的 API 密钥：

```json
{
  "serpapi": {
    "apiKey": "your_serpapi_key_here"
  },
  "volcengine": {
    "apiKey": "your_volcengine_api_key_here",
    "model": "doubao-seedream-4-5-251128",
    "endpoint": "https://ark.cn-beijing.volces.com/api/v3/images/generations"
  },
  "wechat": {
    "defaultAccount": "default",
    "accounts": {
      "default": {
        "appId": "your_wechat_app_id",
        "appSecret": "your_wechat_app_secret"
      }
    }
  },
  "paths": {
    "contentDir": "./content",
    "imageDir": "./images"
  }
}
```

### 3. 安装依赖工具

```bash
# 安装 wenyan-cli（用于微信发布，必需）
npm install -g @wenyan-md/cli

# 验证安装
wenyan --help
```

### 4. 使用

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
```

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

## 项目结构

```
wechat-content-pipeline/
├── bin/                      # 可执行文件
├── src/                      # 源代码
│   ├── config/              # 配置管理
│   ├── search/              # 搜索模块
│   ├── image/               # 图片生成模块
│   ├── publish/             # 发布模块
│   └── pipeline/            # 流水线
├── config/                   # 配置文件
├── content/                  # 文章目录（默认）
├── images/                   # 图片目录（默认）
└── examples/                 # 示例
```

## 配置说明

详见 [CONFIG.md](./CONFIG.md)（如果存在）

## 故障排查

详见 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)（如果存在）

## License

MIT
