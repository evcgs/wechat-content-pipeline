const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    this.configDir = path.join(__dirname, '../../config');
    this.configPath = path.join(this.configDir, 'config.json');
    this.config = null;
  }

  load() {
    if (this.config) {
      return this.config;
    }

    if (!fs.existsSync(this.configPath)) {
      console.error('配置文件不存在：', this.configPath);
      console.error('请先运行：wechat-pipeline config --init');
      process.exit(1);
    }

    try {
      const content = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(content);
      return this.config;
    } catch (error) {
      console.error('配置文件解析失败：', error.message);
      process.exit(1);
    }
  }

  init() {
    const examplePath = path.join(this.configDir, 'config.example.json');
    
    if (!fs.existsSync(examplePath)) {
      console.error('配置模板不存在：', examplePath);
      process.exit(1);
    }

    if (fs.existsSync(this.configPath)) {
      console.log('配置文件已存在：', this.configPath);
      return;
    }

    fs.copyFileSync(examplePath, this.configPath);
    console.log('✅ 配置文件已创建：', this.configPath);
    console.log('请编辑配置文件，填入你的 API 密钥');
  }

  show() {
    const config = this.load();
    console.log('当前配置：');
    console.log(JSON.stringify(config, null, 2));
  }

  getSerpapiKey() {
    const config = this.load();
    return config.serpapi?.apiKey;
  }

  getVolcengineConfig() {
    const config = this.load();
    return config.volcengine;
  }

  getWechatConfig(accountName = 'default') {
    const config = this.load();
    const account = config.wechat?.accounts?.[accountName];
    if (!account) {
      console.error('未找到公众号配置：', accountName);
      process.exit(1);
    }
    return account;
  }

  getPaths() {
    const config = this.load();
    return {
      contentDir: config.paths?.contentDir || './content',
      imageDir: config.paths?.imageDir || './images'
    };
  }
}

module.exports = Config;
