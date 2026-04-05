# Marco Personal Blog

这是一个基于参考项目改造后的个人博客模板，技术栈是 `Vite + React + Markdown + GitHub Pages`。

现在这个仓库已经不是原作者的安全笔记站点，而是一个更通用的个人博客骨架，适合你继续写：

- 技术文章
- CTF / 安全练习
- 项目总结
- 学习笔记
- 发布流程说明

## 本地启动

```bash
npm install
npm run dev
```

构建静态文件：

```bash
npm run build
```

## 你主要需要修改的地方

### 1. 个人信息

编辑文件：

```text
content/site.json
```

这里可以改：

- 站点名称
- 首页介绍
- about 文案
- 技能和工具
- 经历和里程碑
- GitHub / LinkedIn / X / Email 链接

### 2. 发布文章

在下面新建文章目录：

```text
content/posts/<your-slug>/post.md
```

文章头部格式：

```md
---
title: Your Post Title
category: Development
date: 2026-04-06
tags:
  - tag-one
  - tag-two
summary: One sentence summary of the post.
---
```

### 3. 发布笔记

在下面新建笔记目录：

```text
content/notes/<your-slug>/note.md
```

笔记更适合放：

- 命令备忘
- 部署步骤
- 练习记录
- 发帖流程

## GitHub Pages 配置方式

### 方案一：推荐仓库名

如果你的 GitHub 用户名是 `yourname`，最推荐的仓库名是：

```text
yourname.github.io
```

这样博客地址会是：

```text
https://yourname.github.io/
```

### 方案二：普通仓库名

如果仓库名不是 `<username>.github.io`，也可以正常部署，例如：

```text
my-blog
```

地址会变成：

```text
https://yourname.github.io/my-blog/
```

这个项目里的工作流已经自动处理了 Vite 的 `base` 路径，不需要你手动再改。

### 在 GitHub 里要做的设置

1. 把项目推送到 GitHub。
2. 打开仓库的 `Settings`。
3. 打开 `Pages`。
4. 在 `Build and deployment` 里把 `Source` 设为 `GitHub Actions`。
5. 保证默认分支是 `main`。

之后每次推送到 `main`，GitHub 都会自动构建并发布。

工作流文件在：

```text
.github/workflows/deploy.yml
```

## 发布推文的方式

推荐流程：

1. 新文章写到 `content/posts/.../post.md`
2. 提交并推送到 GitHub
3. 等 GitHub Pages 部署成功
4. 打开线上文章链接
5. 去 X（Twitter）发一条带链接的推文

推荐推文模板：

```text
I published a new post: <标题>

Highlights:
- point 1
- point 2
- point 3

Read here:
<文章链接>
```

如果你想发中文，也可以用这个模板：

```text
我刚发布了一篇新文章：《<标题>》

内容包括：
- 要点 1
- 要点 2
- 要点 3

阅读链接：
<文章链接>
```

## 已经内置好的示例内容

你可以先参考这些示例文件：

- `content/posts/welcome-to-my-blog/post.md`
- `content/posts/how-this-site-is-built/post.md`
- `content/notes/github-pages-setup/note.md`
- `content/notes/sharing-new-posts/note.md`

## 自动部署说明

推送到 `main` 后会自动执行：

1. 安装依赖
2. 构建静态站点
3. 上传产物
4. 部署到 GitHub Pages

如果部署失败，优先检查：

- `Settings -> Pages -> Source` 是否为 `GitHub Actions`
- Actions 是否报错
- 仓库名和最终访问地址是否对应
- 个人链接是否还保留着占位符
