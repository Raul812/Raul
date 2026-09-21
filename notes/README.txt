
下面写正文，支持标准 Markdown。

3. `git push`。

然后：

- GitHub Actions 会自动运行 `scripts/build-notes.js`
- 生成 / 更新 `notes.json`
- 网站自动出现新文章
- **你不需要改任何 HTML**

## 在 notes.html 里怎么切换列表 / 文章

- `notes.html` → 显示笔记列表
- `notes.html?id=2026-10-01-my-thoughts` → 显示这一篇

`id` 就是文件名去掉 `.md` 后缀。

## 本地预览

需要 Node.js：

```bash
node scripts/build-notes.js
npx serve .