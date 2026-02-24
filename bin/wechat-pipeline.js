#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');

// 加载 package.json
const packageJson = require('../package.json');

program
  .name('wechat-pipeline')
  .description('微信公众号内容生产流水线')
  .version(packageJson.version);

// 搜索命令
program
  .command('search')
  .description('搜索验证信息')
  .option('--query <query>', '搜索查询')
  .option('--article <article>', '文章路径（从文章中提取需要搜索的内容）')
  .action((options) => {
    const SearchModule = require('../src/search');
    const search = new SearchModule();
    
    if (options.query) {
      search.search(options.query);
    } else if (options.article) {
      search.searchFromArticle(options.article);
    } else {
      console.log('请提供 --query 或 --article 参数');
      process.exit(1);
    }
  });

// 图片生成命令
program
  .command('image')
  .description('生成图片')
  .option('--prompt <prompt>', '图片提示词')
  .option('--article <article>', '文章路径（从文章中提取配图提示词）')
  .option('--size <size>', '图片尺寸', '2560x1440')
  .option('--type <type>', '图片类型：cover|inline', 'cover')
  .option('--count <count>', '生成数量', '1')
  .action((options) => {
    const ImageModule = require('../src/image');
    const image = new ImageModule();
    
    if (options.prompt) {
      image.generate({
        prompt: options.prompt,
        size: options.size,
        type: options.type,
        count: parseInt(options.count)
      });
    } else if (options.article) {
      image.generateFromArticle(options.article);
    } else {
      console.log('请提供 --prompt 或 --article 参数');
      process.exit(1);
    }
  });

// 发布命令
program
  .command('publish')
  .description('发布到微信公众号')
  .option('--file <file>', '文章文件路径')
  .option('--account <account>', '公众号账号名称', 'default')
  .action((options) => {
    const PublishModule = require('../src/publish');
    const publish = new PublishModule();
    
    if (options.file) {
      publish.publish({
        file: options.file,
        account: options.account
      });
    } else {
      console.log('请提供 --file 参数');
      process.exit(1);
    }
  });

// 完整流水线命令
program
  .command('pipeline')
  .description('完整流水线：搜索 → 生成图片 → 发布')
  .option('--article <article>', '文章路径', '文章路径（必填）')
  .option('--skip-search', '跳过搜索验证')
  .option('--skip-image', '跳过图片生成')
  .option('--skip-publish', '跳过发布')
  .action((options) => {
    if (!options.article) {
      console.log('请提供 --article 参数');
      process.exit(1);
    }
    
    const Pipeline = require('../src/pipeline');
    const pipeline = new Pipeline();
    
    pipeline.run({
      article: options.article,
      skipSearch: options.skipSearch,
      skipImage: options.skipImage,
      skipPublish: options.skipPublish
    });
  });

// 配置命令
program
  .command('config')
  .description('配置管理')
  .option('--init', '初始化配置')
  .option('--show', '显示当前配置')
  .action((options) => {
    const Config = require('../src/config');
    const config = new Config();
    
    if (options.init) {
      config.init();
    } else if (options.show) {
      config.show();
    } else {
      console.log('请提供 --init 或 --show 参数');
    }
  });

program.parse(process.argv);
