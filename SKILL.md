---
name: wechat-content-pipeline
description: "微信公众号内容生产流水线 - 搜索验证、生成图片、发布到微信公众号"
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

微信公众号内容生产流水线 - 搜索验证、生成图片、发布到微信公众号。

---

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Install wenyan-cli (required)**

```bash
npm install -g @wenyan-md/cli
```

3. **Configure**

```bash
cp config/config.example.json config/config.json
```

Edit `config/config.json` with your API keys.

4. **Verify installation**

```bash
node bin/wechat-pipeline.js doctor
```

---

## Usage (For Agent)

### Complete Content Production Workflow (9 Steps)

This skill can help with the complete 9-step content production workflow:

1. **Topic Selection** - Use templates in `templates/workflow/01-topic.md`
2. **Idea Refinement** - Use templates in `templates/workflow/02-ideas.md`
3. **Evidence Collection** - Use templates in `templates/workflow/03-evidence.md`
4. **Outline Creation** - Use templates in `templates/workflow/04-outline.md`
5. **Write Article** - Write the article draft
6. **Search Verification** - Run: `node bin/wechat-pipeline.js search --article /path/to/article.md`
7. **Generate Images** - Run: `node bin/wechat-pipeline.js image --article /path/to/article.md`
8. **Insert Images** - Update the article with images
9. **Publish** - Run: `node bin/wechat-pipeline.js publish --file /path/to/article.md`

### Quick Commands

```bash
# Full pipeline (steps 6-9)
node bin/wechat-pipeline.js pipeline --article /path/to/article.md

# Individual steps
node bin/wechat-pipeline.js search --article /path/to/article.md
node bin/wechat-pipeline.js image --article /path/to/article.md
node bin/wechat-pipeline.js publish --file /path/to/article.md

# Standalone usage
node bin/wechat-pipeline.js search --query "search query"
node bin/wechat-pipeline.js image --prompt "image prompt" --size 2560x1440 --type cover
```

---

## Workflow Templates

Full 9-step workflow templates are available in `templates/workflow/`:

- `01-topic.md` - Topic selection
- `02-ideas.md` - Idea refinement
- `03-evidence.md` - Evidence collection
- `04-outline.md` - Outline creation
- `05-article.md` - Article draft
- `08-publish.md` - Publish version

Copy and use as needed!

---

## More Documentation

For human-readable documentation, see:
- [README.md](./README.md) - Full project documentation
- [WORKFLOW.md](./WORKFLOW.md) - Complete 9-step workflow
- [CONFIG.md](./CONFIG.md) - Configuration guide
