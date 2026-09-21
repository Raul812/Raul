
---

## 二、需要新增的文件

### `js/notes.js`（新增）

```js
(function () {
  "use strict";

  var INDEX_URL = "notes.json";

  var listViewEl = document.getElementById("notes-list-view");
  var articleViewEl = document.getElementById("notes-article-view");
  var listEl = document.getElementById("note-list");
  var previewEl = document.getElementById("notes-preview");
  var articleEl = document.getElementById("note-article");

  if (!listEl && !previewEl && !articleEl) return;

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fetchJSON(url) {
    return fetch(url, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function fetchText(url) {
    return fetch(url, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    });
  }

  /* ---------- 列表 ---------- */

  function renderListItem(note) {
    var id = encodeURIComponent(note.id);
    return (
      '<article class="note-item">' +
        '<div class="note-date">' + escapeHtml(note.date) + "</div>" +
        "<div>" +
          (note.tag ? '<span class="tag">' + escapeHtml(note.tag) + "</span>" : "") +
          '<h2><a href="notes.html?id=' + id + '">' + escapeHtml(note.title) + "</a></h2>" +
          "<p>" + escapeHtml(note.summary) + "</p>" +
        "</div>" +
      "</article>"
    );
  }

  function loadList() {
    fetchJSON(INDEX_URL)
      .then(function (notes) {
        if (!Array.isArray(notes) || !notes.length) {
          listEl.innerHTML =
            '<div class="empty-note">还没有笔记。在 notes/ 里新建一个 .md 文件，push 后就会出现在这里。</div>';
          return;
        }
        listEl.innerHTML = notes.map(renderListItem).join("");
      })
      .catch(function (err) {
        listEl.innerHTML =
          '<div class="empty-note">加载失败：' + escapeHtml(err.message) + "</div>";
      });
  }

  /* ---------- 首页预览 ---------- */

  function renderPreviewCard(note) {
    var id = encodeURIComponent(note.id);
    return (
      '<a class="note-card" href="notes.html?id=' + id + '">' +
        '<span class="muted">' + escapeHtml(note.date) + "</span>" +
        "<h3>" + escapeHtml(note.title) + "</h3>" +
        "<p>" + escapeHtml(note.summary) + "</p>" +
      "</a>"
    );
  }

  function loadPreview() {
    fetchJSON(INDEX_URL)
      .then(function (notes) {
        if (!Array.isArray(notes) || !notes.length) {
          previewEl.innerHTML =
            '<div class="empty-note">还没有笔记。</div>';
          return;
        }
        previewEl.innerHTML = notes.slice(0, 3).map(renderPreviewCard).join("");
      })
      .catch(function () {
        previewEl.innerHTML = "";
      });
  }

  /* ---------- 文章 ---------- */

  function parseFrontmatter(text) {
    var match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!match) return { meta: {}, content: text };
    var meta = {};
    match[1].split("\n").forEach(function (line) {
      var m = line.match(/^(\w+):\s*(.*)$/);
      if (m) meta[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    });
    return { meta: meta, content: match[2] };
  }

  function renderMarkdown(md) {
    if (window.marked && typeof window.marked.parse === "function") {
      return window.marked.parse(md, { gfm: true, breaks: false });
    }
    return md
      .split(/\n{2,}/)
      .map(function (p) {
        return "<p>" + escapeHtml(p).replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  function switchToListView() {
    if (articleViewEl) articleViewEl.hidden = true;
    if (listViewEl) listViewEl.hidden = false;
  }

  function switchToArticleView() {
    if (listViewEl) listViewEl.hidden = true;
    if (articleViewEl) articleViewEl.hidden = false;
  }

  function loadArticle(id) {
    switchToArticleView();
    articleEl.innerHTML = '<div class="empty-note">正在加载…</div>';

    fetchJSON(INDEX_URL)
      .then(function (notes) {
        var note = notes.find(function (n) { return n.id === id; });
        if (!note) {
          articleEl.innerHTML = '<div class="empty-note">没有找到这篇文章。<br><br><a class="text-link" href="notes.html">← 返回笔记列表</a></div>';
          return;
        }

        document.title = note.title + " · RAUL";

        return fetchText(note.file).then(function (text) {
          var parsed = parseFrontmatter(text);
          var bodyHtml = renderMarkdown(parsed.content);

          articleEl.innerHTML =
            '<header class="article-head">' +
              '<p class="eyebrow">' + escapeHtml(note.date) + "</p>" +
              (note.tag ? '<span class="tag">' + escapeHtml(note.tag) + "</span>" : "") +
              "<h1>" + escapeHtml(note.title) + "</h1>" +
              (note.summary ? '<p class="lead">' + escapeHtml(note.summary) + "</p>" : "") +
            "</header>" +
            '<div class="article-body">' + bodyHtml + "</div>" +
            '<footer class="article-foot">' +
              '<a class="text-link" href="notes.html">← 返回笔记列表</a>' +
            "</footer>";
        });
      })
      .catch(function (err) {
        articleEl.innerHTML =
          '<div class="empty-note">加载失败：' + escapeHtml(err.message) + '<br><br><a class="text-link" href="notes.html">← 返回笔记列表</a></div>';
      });
  }

  /* ---------- 入口 ---------- */

  if (articleEl && (listViewEl || articleViewEl)) {
    // 这是 notes.html
    var params = new URLSearchParams(location.search);
    var id = params.get("id");
    if (id) {
      loadArticle(id);
    } else {
      switchToListView();
      if (listEl) loadList();
    }
  } else {
    // 这是首页，只要预览
    if (previewEl) loadPreview();
  }
})();