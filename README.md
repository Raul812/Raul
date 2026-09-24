# 路啊同学 · 个人网站

这是 路啊同学 的个人网站项目。

定位：**电商运营 · AI · 数字生活**

网站使用纯 HTML / CSS / JavaScript 构建，笔记系统由 GitHub Actions 自动生成索引，不需要任何构建工具即可部署到 GitHub Pages。

## 网站结构

- `index.html` — 首页
- `about.html` — 关于
- `projects.html` — 项目
- `notes.html` — 笔记列表 / 文章页（同一个页面，靠 `?id=` 区分）
- `lab.html` — 实验室
- `now.html` — 当前状态
- `css/style.css` — 网站样式
- `js/main.js` — 菜单与深浅色切换
- `js/notes.js` — 笔记列表与文章渲染
- `notes/` — 你以后只需要维护这里
- `scripts/build-notes.js` — 扫描 notes/ 生成 notes.json
- `.github/workflows/build-notes.yml` — push 后自动执行
- `notes.json` — 自动生成的索引，不用手改
- `assets/` — 图片、favicon 等资源

## 部署到 GitHub Pages

1. 在 GitHub 创建一个仓库。
2. 将本项目所有文件上传到仓库根目录。
3. 打开仓库的 `设置`。
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

- `你的用户名.github.io` → 你的实际 GitHub Pages 域名
- `assets/og-cover.jpg` → 实际社交分享图（建议 1200×630）
- `assets/favicon.svg` → 实际站点图标

## 写笔记的工作流

1. 在 `notes/` 里新建一个 `.md` 文件，例如：

   `notes/2026-10-01-my-thoughts.md`

2. 文件开头写 frontmatter：

3. 把头像、项目图片、favicon、og-cover 等资源放在这里。
建议目录结构：
assets/
  avatar.webp
  favicon.svg
  og-cover.jpg
  projects/
    project-01.webp
    project-02.webp

建议：
- 图片使用 WebP 或 AVIF 格式
- 图片加上 width / height / loading="lazy" / alt
- 封面图建议尺寸 1200×630（用于社交分享）

版本：
版本：1.3
更新时间：2026.09
名称：路啊同学
