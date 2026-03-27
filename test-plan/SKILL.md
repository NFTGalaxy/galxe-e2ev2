---
name: test-plan
description: 当消息包含"测试计划"时，返回对应 Notion 文档链接和内容概要。
---

# Test Plan

当用户消息包含 `测试计划`（或 `test plan`）时：

## Notion 配置

从 `openclaw.json` 读取 Notion 凭据：

- 文件路径：`/Users/likai.lear/.openclaw/openclaw.json`
- 配置路径：`skills.entries.notion`
- 必需字段：`enabled=true`、`apiKey`、`parentPageId`

## 执行流程

1. 使用 Notion API 获取父页面（`parentPageId`）下的所有子页面：
   - API: `GET https://api.notion.com/v1/blocks/{parentPageId}/children`
   - Header: `Authorization: Bearer {apiKey}`, `Notion-Version: 2022-06-28`
   - 筛选 `type: "child_page"` 的 block，提取每个子页面的 `id` 和 `title`。

2. 对每个子页面，构造 Notion 链接：
   - 格式：`https://www.notion.so/{title_slug}-{page_id_no_dashes}`
   - 或直接使用：`https://www.notion.so/{page_id_no_dashes}`

3. 对每个子页面，使用 Notion API 获取页面内容摘要：
   - API: `GET https://api.notion.com/v1/blocks/{page_id}/children`
   - 读取前 10-20 个 block，提取文本内容作为概要素材。

4. 为每个子页面生成概要，至少包含：
   - 文档主题
   - 关键测试范围
   - 主要执行要点

5. 用清晰列表展示所有子页面的"文档链接 + 概要"，方便直接点击和快速浏览。

## 失败处理

- 缺少 Notion 凭据：提示配置 `openclaw.json` 中的 `skills.entries.notion`。
- API 请求失败：返回错误信息并提示重试。
- 父页面无子页面：提示"当前没有测试计划文档"。
