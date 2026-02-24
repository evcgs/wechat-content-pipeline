const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const Config = require('../config');

class Search {
  constructor() {
    this.config = new Config();
  }

  search(query) {
    const apiKey = this.config.getSerpapiKey();
    
    if (!apiKey) {
      console.error('未配置 SerpAPI API Key');
      process.exit(1);
    }

    console.log('🔍 搜索：', query);
    console.log('');
    console.log('提示：可以使用以下方式搜索：');
    console.log('  1. 使用 serpapi 技能（如果在 OpenClaw 中）');
    console.log('  2. 手动在浏览器中搜索');
    console.log('  3. 使用自定义搜索脚本');
    console.log('');
    console.log('搜索完成后，请更新文章中的相关信息。');
  }

  searchFromArticle(articlePath) {
    if (!fs.existsSync(articlePath)) {
      console.error('文章不存在：', articlePath);
      process.exit(1);
    }

    const content = fs.readFileSync(articlePath, 'utf8');
    
    console.log('📄 分析文章：', articlePath);
    console.log('');
    console.log('提示：请检查文章中需要验证的信息：');
    console.log('  - 公司成立时间');
    console.log('  - 产品发布时间');
    console.log('  - 数据来源');
    console.log('  - 竞品信息');
    console.log('');
    console.log('使用 serpapi 搜索验证后，更新文章中的信息。');
  }
}

module.exports = Search;
