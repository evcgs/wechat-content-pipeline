const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const Config = require('../config');

class Publish {
  constructor() {
    this.config = new Config();
  }

  publish(options) {
    const { file, account } = options;
    
    if (!fs.existsSync(file)) {
      console.error('文章不存在：', file);
      process.exit(1);
    }

    // 检查 frontmatter
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('---') || !content.includes('title:') || !content.includes('cover:')) {
      console.error('⚠️  文章缺少必需的 frontmatter！');
      console.error('');
      console.error('请在文章开头添加：');
      console.error('---');
      console.error('title: 文章标题');
      console.error('cover: ./images/cover.png');
      console.error('---');
      console.error('');
      process.exit(1);
    }

    // 获取微信配置
    const wechatConfig = this.config.getWechatConfig(account);
    
    // 设置环境变量
    process.env.WECHAT_APP_ID = wechatConfig.appId;
    process.env.WECHAT_APP_SECRET = wechatConfig.appSecret;

    console.log('📱 发布到微信公众号：');
    console.log('  文章：', file);
    console.log('  账号：', account);
    console.log('');

    // 检查 wenyan-cli 是否安装
    try {
      execSync('wenyan --version', { stdio: 'pipe' });
    } catch (error) {
      console.error('❌ wenyan-cli 未安装！');
      console.error('');
      console.error('请先安装：');
      console.error('  npm install -g @wenyan-md/cli');
      console.error('');
      process.exit(1);
    }

    // 发布
    try {
      console.log('🚀 正在发布...');
      console.log('');
      
      const result = execSync(`wenyan publish -f "${file}" -t lapis -h solarized-light`, {
        stdio: 'inherit'
      });
      
      console.log('');
      console.log('✅ 发布成功！');
      console.log('');
      console.log('请登录微信公众号后台查看草稿箱：');
      console.log('  https://mp.weixin.qq.com/');
      
    } catch (error) {
      console.error('');
      console.error('❌ 发布失败！');
      console.error('');
      console.error('常见问题：');
      console.error('  1. IP 不在白名单 - 请将你的 IP 添加到公众号后台');
      console.error('  2. API 密钥错误 - 请检查 config.json 中的配置');
      console.error('  3. 封面图缺失 - 请确保文章有 cover 字段');
      console.error('');
      process.exit(1);
    }
  }
}

module.exports = Publish;
