---
name: test-plan
description: 当消息包含“测试计划”时，返回对应 Notion 文档链接和内容概要。
---

# Test Plan

当用户消息包含 `测试计划`（或 `test plan`）时：

1. 返回以下 Notion 文档链接：
   - `QUEST_APP_TEST_PLAN.md`:
     `https://www.notion.so/QUEST_APP_TEST_PLAN-3261713d6210812b99d1dc77e9fd4d38`
   - `QUEST_CREATE_TEST_PLAN.md`:
     `https://www.notion.so/QUEST_CREATE_TEST_PLAN-3261713d621081ffa75bd0871eb82c7d`
2. 读取目录 `$ROOT_PATH/galxe-web/apps/tests/test/plan` 下对应 Markdown 文件。
3. 生成并返回内容概要，至少包含：
   - 文档主题
   - 关键测试范围
   - 主要执行要点
   - 明确的模块划分（如 App / Quest Create）
4. 用清晰列表展示“文档链接 + 概要”，方便直接点击和快速浏览。

如果目录不存在或没有 `.md` 文件，仍先返回 Notion 链接，并补充：

未找到测试计划文件
