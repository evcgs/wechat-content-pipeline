const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const Config = require('../config');

class Image {
  constructor() {
    this.config = new Config();
  }

  generate(options) {
    const volcConfig = this.config.getVolcengineConfig();
    
    if (!volcConfig?.apiKey) {
      console.error('未配置火山引擎 API Key');
      process.exit(1);
    }

    console.log('🎨 生成图片：');
    console.log('  提示词：', options.prompt);
    console.log('  尺寸：', options.size);
    console.log('  类型：', options.type);
    console.log('  数量：', options.count);
    console.log('');
    console.log('提示：请使用 volcengine-image-gen 技能生成图片：');
    console.log('');
    console.log('  # 封面图（2560x1440）');
    console.log('  python3 skills/volcengine-image-gen/scripts/gen.py \\');
    console.log('    --size 2560x1440 \\');
    console.log('    --prompt "' + options.prompt + '"');
    console.log('');
    console.log('  # 内文图（2560x1440）');
    console.log('  python3 skills/volcengine-image-gen/scripts/gen.py \\');
    console.log('    --size 2560x1440 \\');
    console.log('    --prompt "' + options.prompt + '"');
    console.log('');
    console.log('⚠️  重要：');
    console.log('  - 最小尺寸：3,686,400 像素');
    console.log('  - 推荐尺寸：2560x1440（刚好达标）');
    console.log('  - 避免使用：1024x1024（太小）');
    console.log('  - Logo：用彩色方块代替，避免错误');
  }

  generateFromArticle(articlePath) {
    if (!fs.existsSync(articlePath)) {
      console.error('文章不存在：', articlePath);
      process.exit(1);
    }

    const content = fs.readFileSync(articlePath, 'utf8');
    
    console.log('📄 分析文章：', articlePath);
    console.log('');
    console.log('提示：请根据文章内容生成配图：');
    console.log('');
    console.log('  1. 封面图（2560x1440）');
    console.log('  2. 内文图 1-4（2560x1440）');
    console.log('');
    console.log('生成图片后，插入到文章中：');
    console.log('  ![图片说明](./images/cover.png)');
    console.log('  ![图片说明](./images/image1.png)');
  }
}

module.exports = Image;
