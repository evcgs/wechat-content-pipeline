const fs = require('fs');
const path = require('path');
const Config = require('../config');
const Search = require('../search');
const Image = require('../image');
const Publish = require('../publish');

class Pipeline {
  constructor() {
    this.config = new Config();
    this.search = new Search();
    this.image = new Image();
    this.publish = new Publish();
  }

  run(options) {
    const { article, skipSearch, skipImage, skipPublish } = options;
    
    if (!fs.existsSync(article)) {
      console.error('文章不存在：', article);
      process.exit(1);
    }

    console.log('');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║           微信公众号内容生产流水线                          ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📄 文章：', article);
    console.log('');

    // Step 1: 搜索验证
    if (!skipSearch) {
      this.step(1, '搜索验证', () => {
        this.search.searchFromArticle(article);
      });
    } else {
      console.log('⏭️  [1/4] 跳过搜索验证');
      console.log('');
    }

    // Step 2: 图片生成
    if (!skipImage) {
      this.step(2, '图片生成', () => {
        this.image.generateFromArticle(article);
      });
    } else {
      console.log('⏭️  [2/4] 跳过图片生成');
      console.log('');
    }

    // Step 3: 文章更新
    this.step(3, '文章更新', () => {
      console.log('请手动完成以下操作：');
      console.log('');
      console.log('  1. 插入图片到文章中');
      console.log('  2. 检查并更新所有信息');
      console.log('  3. 确保文章有 title 和 cover frontmatter');
      console.log('');
      console.log('完成后按任意键继续...');
    });

    // Step 4: 发布
    if (!skipPublish) {
      this.step(4, '发布', () => {
        this.publish.publish({
          file: article,
          account: 'default'
        });
      });
    } else {
      console.log('⏭️  [4/4] 跳过发布');
      console.log('');
    }

    // 完成
    console.log('');
    console.log('✨ 流水线执行完成！');
    console.log('');
  }

  step(number, title, action) {
    console.log(`┌─────────────────────────────────────────────────────────────┐`);
    console.log(`│  [${number}/4] ${title}`);
    console.log(`└─────────────────────────────────────────────────────────────┘`);
    console.log('');
    
    action();
    
    console.log('');
  }
}

module.exports = Pipeline;
