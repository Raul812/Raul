# 路啊同学 · 个人网站

个人网站，纯 HTML / CSS / JavaScript 构建，不依赖任何构建工具，部署在 GitHub Pages。

- 主站：https://www.raul8.com
- 摄影站：https://www.raul8.cn

定位：**电商运营 · AI · 数字生活**

---

## 目录结构

```text
/
├── index.html                  首页
├── about.html                  关于
├── projects.html               项目
├── notes.html                  笔记列表 / 文章页（同一个页面，靠 ?id= 区分）
├── lab.html                    实验室
├── now.html                    现在
├── notes.json                  自动生成的笔记索引（不用手改）
├── CNAME                       自定义域名配置
├── .nojekyll                   禁用 Jekyll 处理
├── css/
│   └── style.css               网站样式
├── js/
│   ├── main.js                 菜单与主题切换
│   └── notes.js                笔记列表与文章渲染
├── notes/                      你以后只需要维护这里
│   └── 2026-09-11-phone.md
├── scripts/
│   └── build-notes.js          扫描 notes/ 生成 notes.json
├── .github/
│   └── workflows/
│       └── build-notes.yml     push 后自动执行
└── assets/                     图片、favicon、og-cover 等
```

---

## 部署

GitHub Pages，分支 `master`，目录 `/ (root)`。

部署前确认：

- `CNAME` 内容是你的自定义域名，例如 `www.raul8.com`
- 仓库根目录存在 `.nojekyll`（空文件，禁用 Jekyll，否则 `.md` 无法直接访问）
- GitHub → `Settings` → `Pages` 的分支选 `master`，目录选 `/ (root)`

---

## 写笔记的工作流

这是整个网站的核心。以后你只需要做三件事。

### 1. 新建文件

在 `notes/` 里新建一个 `.md` 文件，文件名用纯英文：

```text
notes/2026-09-24-my-thoughts.md
```

### 2. 写 frontmatter

文件开头必须是：

```markdown
---
title: 文章标题
date: 2026.09.24
tag: DIGITAL LIFE
summary: 一句话摘要。
---

正文从这里开始……
```

- `title`：显示在列表和文章页的标题
- `date`：格式统一用 `YYYY.MM.DD`
- `tag`：分类标签，例如 `AI`、`DIGITAL LIFE`、`LAW × AI`
- `summary`：一句话摘要，显示在列表页

正文支持标准 Markdown：标题、列表、引用、代码块、图片、链接。

### 3. 推送

```bash
git add .
git commit -m "add new note"
git push
```

然后：

- GitHub Actions 自动运行 `scripts/build-notes.js`
- 生成 / 更新 `notes.json`
- 网站自动出现新文章
- **你不需要改任何 HTML**

---

## 本地预览

需要 Node.js。

```bash
# 生成笔记索引
node scripts/build-notes.js

# 启动本地服务器
npx serve .
```

然后访问：

```text
http://localhost:3000
```

**不要直接双击 HTML 文件**，`file://` 协议下 `fetch` 会被浏览器拦截，笔记页面会一直卡在“正在加载”。必须通过 `http://` 访问。

---

## 在 notes.html 里切换列表 / 文章

- `notes.html` → 显示笔记列表
- `notes.html?id=2026-09-24-my-thoughts` → 显示这一篇

`id` 就是文件名去掉 `.md` 后缀。

---

## 修改网站名字

名字统一为 **路啊同学**。

如果需要再次改名，在 VS Code 里按 `Ctrl + Shift + H` 打开全局搜索替换，**开启区分大小写**（点 `Aa`），搜索 `路啊同学`，替换为新名字。

注意：不要误伤域名里的 `raul8`（小写）。

---

## 设计方向

这不是传统简历网站，而是一个长期记录个人工作的数字空间。

主要内容：

- 电商运营
- AI
- 个人 AI
- AI 内容创作
- 数字产品
- 数字生活
- 法律与司法相关思考
- 个人项目
- 长期笔记

后续可以增加：

- Markdown 博客（推荐 Astro / Eleventy）
- RSS
- 访问统计（Plausible / Umami）
- 中英文切换
- 时间线
- 更丰富的页面动画
- 摄影站与主站的互相链接

---

## 相关链接

- 主站：https://www.raul8.com
- 摄影站：https://www.raul8.cn
- 邮箱：1183855213@qq.com

---

版本：`1.4`
更新时间：`2026.09`
名称：**路啊同学**