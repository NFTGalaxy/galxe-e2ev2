---
name: spec-reader
description: 接收 openspec 目录路径，读取 proposal/tasks/spec 并生成测试计划上传到 Notion，返回页面链接。
---

# Spec Reader

当用户要求“根据 OpenSpec 生成测试计划并上传到 Notion”时，使用本技能。

## 输入

用户需提供 OpenSpec 根目录路径（绝对路径或当前工作目录相对路径）。系统需要在该目录下递归查找以下文件：

- `proposal.md`
- `tasks.md`
- `spec.md`

固定源码根目录：

- `$ROOT_PATH/galxe-web/`

## 执行流程

1. 解析用户输入中的目录路径，定位目标目录。
2. 在目标目录下递归查找 `spec.md`；若找到多个，优先选择与 `proposal.md`、`tasks.md` 同级的候选，其次选择最近修改的文件。
3. 根据选中的 `spec.md` 所在目录，优先读取同级 `proposal.md` 与 `tasks.md`；若同级缺失，再在用户提供的根目录范围内递归查找对应文件。
4. 校验 3 个必需文件最终是否可定位；若缺失，明确列出缺失文件并停止后续上传。
5. 读取并综合 3 个文件内容，并结合源码根目录进行需求落点分析（模块、页面、接口、核心函数、配置开关）。
6. 生成结构化测试计划，至少包含：
   - 测试目标与范围（in scope / out of scope）
   - 风险评估与优先级
   - 测试类型覆盖（功能、接口、E2E、回归、边界、异常）
   - 测试环境与数据准备
   - 执行清单（按模块或用户旅程拆分）
   - 通过/失败准入标准（exit criteria）
   - 待确认问题与依赖项
7. 生成“需求到代码映射关系”，至少按以下维度输出：
   - 需求 ID / 需求描述
   - 代码落点（文件路径、关键函数/组件/接口）
   - 证据摘要（对应实现逻辑要点）
   - 风险标签（高/中/低）
8. 生成“需求映射矩阵（RTM）”，至少包含列：
   - Requirement ID
   - Requirement Summary
   - Spec Source（proposal/tasks/spec 对应章节）
   - Code Mapping（文件与符号）
   - Test Type（Unit/Integration/E2E/Regression）
   - Test Case IDs
   - Priority
   - Status（Planned/Blocked/Covered）
9. 将测试计划、需求到代码映射、RTM 一并整理为 Notion 友好的 Markdown（标题层级清晰、表格可直接粘贴）。
10. 上传到 Notion，并返回可访问链接。
11. 在同一 Slack thread 追加询问：`测试计划已生成，是否继续生成测试用例（case.ts + spec.ts）？`。
12. 若用户明确同意，则调用 `spec-generator`；若拒绝或未确认，则结束在测试计划阶段。

## Notion 上传规则

优先使用 `openclaw.json` 的 notion 配置：

- 文件路径：`/Users/likai.lear/.openclaw/openclaw.json`
- 配置路径：`skills.entries.notion`
- 必需字段：`enabled=true`、`apiKey`
- 父页面优先读取：`parentPageId`

若 `openclaw.json` 未提供父页面 ID，再回退读取环境变量：

- `NOTION_PARENT_PAGE_ID`: 新页面的父页面 ID

兼容性回退（仅在 `openclaw.json` 不可用时使用）：

- `NOTION_API_TOKEN`: Notion Integration Token

上传建议：

1. 解析 Notion 凭据来源：
   - 首选 `openclaw.json` 的 `skills.entries.notion.apiKey`
   - 回退 `NOTION_API_TOKEN`
2. 解析父页面来源：
   - 首选 `openclaw.json` 的 `skills.entries.notion.parentPageId`
   - 回退 `NOTION_PARENT_PAGE_ID`
3. 页面标题格式：`Test Plan - <spec所在目录名> - <YYYY-MM-DD>`。
4. 页面正文必须包含以下三个一级章节：
   - Test Plan
   - Requirement to Code Mapping
   - Requirement Traceability Matrix (RTM)
5. 上传成功后，返回：
   - Notion 页面链接
   - 页面标题
   - 计划摘要（3-5 条）

## 失败处理

- 缺少输入路径：提示用户提供 openspec 根目录路径。
- 文件缺失：列出缺失文件，给出修复建议。
- 源码不可访问：明确提示源码根目录不可读或不存在，并返回已完成的文档侧分析结果。
- 缺少 Notion 凭据：明确说明缺少 `openclaw.json` 中的 `skills.entries.notion.apiKey`（或回退变量 `NOTION_API_TOKEN`）。
- 缺少父页面：明确说明缺少 `openclaw.json` 中的 `skills.entries.notion.parentPageId`（或回退变量 `NOTION_PARENT_PAGE_ID`）。
- 上传失败：返回错误原因、已生成的本地测试计划摘要，并提示重试。

## 输出格式

1. `Notion Link`: `<url>`
2. `Title`: `<page title>`
3. `Test Plan Summary`:
   - `<bullet 1>`
   - `<bullet 2>`
   - `<bullet 3>`

如果上传失败，第一行改为 `Notion Link: (upload failed)`，并附失败原因。
