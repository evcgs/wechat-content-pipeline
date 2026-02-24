# 配置指南

本指南详细说明如何配置 wechat-content-pipeline，特别是 wenyan-cli 和微信公众号的设置。

---

## 目录

1. [wenyan-cli 详细配置](#wenyan-cli-详细配置)
2. [获取微信公众号 AppID 和 AppSecret](#获取微信公众号-appid-和-appsecret)
3. [设置 IP 白名单](#设置-ip-白名单)
4. [完整配置示例](#完整配置示例)

---

## wenyan-cli 详细配置

### 什么是 wenyan-cli？

[wenyan-cli](https://github.com/caol64/wenyan-cli) 是一个优秀的开源工具，用于将 Markdown 文章发布到微信公众号草稿箱。

**wenyan-cli 作者：** caol64  
**wenyan-cli License：** Apache License 2.0  
**wenyan-cli GitHub：** https://github.com/caol64/wenyan-cli  
**wenyan-cli 官网：** https://wenyan.yuzhi.tech

### 安装 wenyan-cli

```bash
# 全局安装
npm install -g @wenyan-md/cli

# 验证安装
wenyan --help
```

### wenyan-cli 常用命令

```bash
# 发布文章
wenyan publish -f article.md -t lapis -h solarized-light

# 查看主题列表
wenyan theme -l

# 安装自定义主题
wenyan theme --add --name my-theme --path /path/to/theme.css

# 使用自定义主题发布
wenyan publish -f article.md -t my-theme
```

### wenyan-cli 主题选项

**文章主题（-t）：**
- `default` - 默认主题
- `lapis` - 青金石（推荐）
- `phycat` - 物理猫

**代码高亮主题（-h）：**
- `solarized-light`（推荐）
- `github`
- `atom-one-light`
- `dracula`

---

## 获取微信公众号 AppID 和 AppSecret

### 前置条件

你需要有一个微信公众号（订阅号或服务号）。

### 步骤

1. **登录微信公众号后台**
   - 访问：https://mp.weixin.qq.com/
   - 用你的公众号账号登录

2. **进入基本配置页面**
   - 左侧菜单：**开发** → **基本配置**

3. **获取 AppID**
   - 在页面顶部可以看到：**开发者 ID（AppID）**
   - 复制这个 AppID

4. **获取 AppSecret**
   - 点击 **生成并获取 AppSecret**（或 **重置**）
   - 用管理员微信扫码确认
   - **⚠️ 重要：AppSecret 只显示一次！立即复制保存！**

5. **保存凭证**
   - 把 AppID 和 AppSecret 保存到 `config/config.json` 中

---

## 设置 IP 白名单

### 为什么需要 IP 白名单？

微信公众号 API 为了安全，只允许来自白名单 IP 的请求。

### 步骤

1. **获取你的公网 IP**

   在终端运行：
   ```bash
   curl ifconfig.me
   ```
   
   或者访问：https://ifconfig.me/
   
   复制显示的 IP 地址（例如：`123.45.67.89`）

2. **添加 IP 到白名单**

   - 在微信公众号后台：**开发** → **基本配置**
   - 找到 **IP 白名单** 部分
   - 点击 **配置** 或 **修改**
   - 输入你的 IP 地址
   - 点击 **确认**
   - 用管理员微信扫码确认

3. **验证 IP 白名单**

   可以尝试发布一篇文章测试。

### 常见问题

**Q: 我的 IP 变了怎么办？**
A: 重复上述步骤，添加新 IP 到白名单（可以保留旧 IP）。

**Q: 可以添加多个 IP 吗？**
A: 可以，每行一个 IP。

**Q: 如何获取稳定的 IP？**
A: 如果你在公司/家里有固定公网 IP 最好；如果没有，可以考虑用服务器发布。

---

## 完整配置示例

### config.json

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
    "defaultAccount": "my-account",
    "accounts": {
      "my-account": {
        "appId": "wx1234567890abcdef",
        "appSecret": "1234567890abcdef1234567890abcdef"
      }
    }
  },
  "paths": {
    "contentDir": "./content",
    "imageDir": "./images"
  }
}
```

### 测试配置

配置完成后，测试发布：

```bash
# 使用示例文章测试
wechat-pipeline publish --file examples/sample-article.md
```

---

## 参考链接

- wenyan-cli GitHub: https://github.com/caol64/wenyan-cli
- wenyan-cli 官网: https://wenyan.yuzhi.tech
- wenyan-cli 上传配置: https://yuzhi.tech/docs/wenyan/upload
- 微信公众号后台: https://mp.weixin.qq.com/
- 微信公众号 API 文档: https://developers.weixin.qq.com/doc/offiaccount/
