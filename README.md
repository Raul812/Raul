# RAUL · 个人网站

这是 RAUL 的个人网站项目。

定位：**电商运营 · AI · 数字生活**

网站使用纯 HTML / CSS / JavaScript 构建，不依赖 React、Vue、Node.js 或其他构建工具，可以直接部署到 GitHub Pages。

## 网站结构

- `index.html` — 首页
- `about.html` — 关于
- `projects.html` — 项目
- `notes.html` — 笔记 / 思考
- `lab.html` — 实验室
- `now.html` — 当前状态
- `css/style.css` — 网站样式
- `js/main.js` — 菜单与深浅色切换
- `assets/` — 图片、favicon 等资源

## 部署到 GitHub Pages

1. 在 GitHub 创建一个仓库。
2. 将本项目所有文件上传到仓库根目录。
3. 打开仓库的 `Settings`。
4. 进入 `Pages`。
5. 在 `Build and deployment` 中选择 `Deploy from a branch`。
6. Branch 选择 `main`，目录选择 `/ (root)`。
7. 点击保存。
8. 等待 GitHub Pages 完成部署。

如果仓库名称使用：

`你的用户名.github.io`

那么网站地址通常就是：

`https://你的用户名.github.io/`

## 部署前必须替换的内容

在全部 HTML 文件中全局搜索并替换：

- `1183855213@qq.com` → 你的真实邮箱
- `你的用户名.github.io` → 你的实际 GitHub Pages 域名
- `assets/og-cover.jpg` → 实际社交分享图（建议 1200×630）
- `assets/favicon.svg` → 实际站点图标

## 网站特性

- 深色 / 浅色主题切换
- 首次访问自动跟随系统主题
- 主题偏好保存在 localStorage，刷新不闪烁
- 移动端自适应导航
- 键盘导航友好（Tab / Esc / focus-visible）
- 支持 `prefers-reduced-motion`
- 基础 SEO（canonical / Open Graph / Twitter Card）

## 修改网站内容

以后主要修改这些地方：

- 首页 `index.html`
- 关于页 `about.html`
- 项目页 `projects.html`
- 笔记页 `notes.html`
- 实验室 `lab.html`
- 当前状态 `now.html`
- 图片放进 `assets/`

网站目前默认使用名字：

**RAUL**

如果以后需要修改名字，只需要全局搜索 `RAUL` 即可。

## 设计方向

这个网站不是传统简历网站，而是一个长期记录个人工作的数字空间。

主要内容包括：

- 电商运营
- AI
- 个人 AI
- AI 内容创作
- 数字产品
- 数字生活
- 法律与司法相关思考
- 个人项目
- 长期笔记

后续可以继续增加：

- Markdown 博客（推荐 Astro / Eleventy）
- GitHub 项目自动读取
- RSS
- 网站访问统计（如 Plausible / Umami）
- 中英文切换
- 自定义域名（记得加 `CNAME`）
- 个人头像
- 项目图片与截图
- 时间线
- `sitemap.xml` / `robots.txt` / `404.html`

## 版本

版本：`1.2`
更新时间：`2026.09`
名称：**RAUL**