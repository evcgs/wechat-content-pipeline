# MVP 快速开始

这是 `wechat-content-pipeline` 的 MVP 版本。

## 当前状态

**✅ 已完成：**
- 项目结构搭建
- 统一命令行入口
- 配置管理框架
- 搜索模块（占位，提示使用 serpapi 技能）
- 图片生成模块（占位，提示使用 volcengine-image-gen 技能）
- 发布模块（✅ 完整实现，调用 wenyan-cli）
- 流水线模块（流程编排）

**🚧 下一步（可选）：**
- 完全集成 serpapi API 调用
- 完全集成火山引擎 API 调用
- 自动图片插入
- 状态持久化

## 快速使用

### 1. 安装依赖

```bash
cd wechat-content-pipeline
npm install
```

### 2. 初始化配置

```bash
# 复制配置模板
cp config/config.example.json config/config.json

# 编辑配置，填入你的密钥
# config/config.json
```

### 3. 链接命令（可选）

```bash
npm link
```

这样就可以全局使用 `wechat-pipeline` 命令了。

### 4. 测试发布模块（最完整的部分）

```bash
# 使用示例文章（需要先准备好图片）
wechat-pipeline publish --file examples/sample-article.md
```

### 5. 运行完整流水线

```bash
wechat-pipeline pipeline --article examples/sample-article.md
```

## 当前工作方式

由于是 MVP，当前的工作方式是：

```
wechat-pipeline pipeline --article my-article.md
    ↓
[1/4] 搜索验证（提示使用 serpapi 技能）
    ↓
[2/4] 图片生成（提示使用 volcengine-image-gen 技能）
    ↓
[3/4] 文章更新（手动操作）
    ↓
[4/4] 发布（✅ 自动调用 wenyan-cli）
```

## 下一步完善方向

如果你想把这个项目做得更完整，可以：

1. **集成 SerpAPI** - 在 `src/search/index.js` 中实现真实的 API 调用
2. **集成火山引擎** - 在 `src/image/index.js` 中实现真实的图片生成
3. **自动插入图片** - 解析文章，自动插入生成的图片
4. **状态持久化** - 把流水线状态保存到文件
5. **Web UI** - 做一个图形界面

## 联系

有问题或建议，欢迎提 Issue！
