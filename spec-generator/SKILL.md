---
name: spec-generator
description: 基于 spec-reader 生成的测试计划，在 Slack thread 中确认后生成 case.ts 与可执行 spec.ts。
---

# Spec Generator

当用户希望“根据测试计划自动生成测试用例文件”时，使用本技能。

## 触发与上下文

1. 本技能通常在 `spec-reader` 完成并返回 Notion 测试计划链接后触发。
2. 必须在同一 Slack thread 内工作，先询问用户：`是否继续生成测试用例（case.ts + spec.ts）？`。
3. 仅当用户明确同意（如 `是`、`yes`、`继续`、`生成`）时继续执行。
4. 若用户拒绝或未确认，停止执行并保留当前结果。

## 输入

需要以下输入来源：

- OpenSpec 目录路径（复用 `spec-reader` 的目标目录）
- `spec-reader` 生成的测试计划文档（优先 Notion 页面内容，次选本地生成文本）
- 固定源码根目录：`$ROOT_PATH/galxe-web/`

目标输出目录固定为：

- `$ROOT_PATH/galxe-web/apps/tests/test/playwright`

## 执行流程

1. 读取测试计划文档，提取需求项、风险、优先级、模块边界、验收标准。
2. 强制以源码为准：仅基于源码中可定位到的页面、组件、接口、路由、文案与交互生成用例，不做任何超出源码证据的推断。
3. 对每个候选用例建立“源码证据”记录（文件路径 + 关键符号/片段）；无证据的候选用例必须丢弃。
4. 在目标目录下新建子文件夹，命名建议：`spec-<spec目录名>-<YYYYMMDD>`。
5. 生成 `case.ts`（结构化测试用例清单），每个测试用例必须包含：
   - `id`
   - `description`
   - `priority`
   - `preconditions`
   - `steps`
   - `assertions`
   - `codeRefs`（源码证据，至少 1 条文件路径）
6. `case.ts` 要求：
   - 使用可被 TypeScript 导入的数据结构（如 `export const cases = [...]`）
   - 用例 ID 全局唯一且可追踪到需求（建议 `REQ-xx-TC-yy`）
   - `steps` 与 `assertions` 必须可执行、可验证，禁止空泛描述
   - 每条 case 必须能回溯到明确源码证据（`codeRefs`）
7. 基于 `case.ts` 生成可执行测试文件：
   - 使用 Playwright Test 标准写法（`test.describe` / `test` / `expect`）
   - 每条 `case` 至少映射一个 `test`
   - `test` 标题必须包含用例 ID 与描述
   - 需要显式处理前置依赖（登录、数据准备、路由进入等）
   - 文件命名规则：`【需求名称】.spec.ts`
   - 若需求名称包含文件系统非法字符，需先做安全替换后再命名（保持可读且可追溯）
8. 生成后做一致性检查：
   - `case.ts` 与 `spec.ts` 用例数量一致
   - 无缺失 ID、无重复 ID
   - 每个 case 都有对应断言
   - 每个 case 都有至少 1 条 `codeRefs`
9. 更新 `$ROOT_PATH/galxe-web/apps/tests/package.json` 的 `scripts`：
   - 新增一个 Playwright 命令，目标指向本次新生成测试文件目录
   - 命令默认环境变量：`HEADLESS=true`、`login=mock`、`domain=beta`
   - 命名建议：`pw:spec:<spec目录名>`（若重名则追加日期或序号）
10. 在 `$ROOT_PATH/galxe-web/apps/tests/README-claw.md` 文件末尾追加一行，内容包含：
   - 刚生成的命令名
   - 命令用途简介（该命令对应的 spec 目录/测试范围）
11. 在 `$ROOT_PATH/galxe-web/apps/tests` 目录执行 Git 提交流程：
   - 新建分支（命名建议：`test/spec-<spec目录名>-<YYYYMMDD>`）
   - 提交本次新增/修改文件
   - commit message 必须是“上述操作总结”，需覆盖：新建测试目录、`case.ts`、`spec.ts`、`package.json` 脚本、`README-claw.md` 追加
12. 推送分支到远程并发起 Pull Request：
   - PR 标题基于 commit message 简化
   - PR 描述需包含本次新增 script 命令与测试覆盖范围

分支名模板示例：

- `test/spec-user-profile-20260318`
- `test/spec-quest-create-20260318`

PR 标题模板示例：

- `test: add generated playwright cases for <spec目录名>`
- `test: generate spec-based playwright tests for <spec目录名>`
13. 在 thread 回传结果：
   - 新建目录路径
   - `case.ts` 路径
    - `【需求名称】.spec.ts` 路径
   - 新增脚本名与完整执行命令
   - README 追加内容
   - PR 链接
   - 用例数量与高优先级用例数量

## 文件约束

1. `case.ts` 与 `【需求名称】.spec.ts` 必须位于同一新建目录。
2. 若目录已存在同名文件：
   - 默认覆盖并在回执中说明覆盖行为。
3. 文件编码使用 UTF-8，内容默认 ASCII 可读。
4. `package.json` 新增脚本时仅追加，不删除或覆盖现有业务脚本。
5. `README-claw.md` 只允许追加，不修改历史行内容。
6. Git 操作仅限本次生成相关文件，避免提交无关改动。

## 失败处理

- 未在 thread 中：先提示用户到原 thread 确认。
- 缺少测试计划内容：提示先执行 `spec-reader`。
- 无法创建目录或写文件：返回失败原因和目标路径。
- 无法更新 `package.json`：返回失败原因，并提供可手动粘贴的 scripts 片段。
- 无法追加 `README-claw.md`：返回失败原因，并提供可手动追加的一行文本。
- 代码映射冲突：返回冲突需求 ID，并标记为需人工确认。
- 源码证据不足：明确列出被丢弃的需求/用例及缺失证据路径，不允许臆测补全。
- Git 提交失败：返回失败原因与未提交文件清单。
- PR 创建失败：返回失败原因、远程分支名和可手动创建 PR 的命令。

## 输出格式

1. `Generation`: `success` 或 `failed`
2. `Folder`: `<path>`
3. `case.ts`: `<path>`
4. `spec file`: `<path/to/【需求名称】.spec.ts>`
5. `Script`: `<script-name>` -> `<command>`
6. `Stats`: `total=<n>, high=<n>, medium=<n>, low=<n>`
7. `PR`: `<url>`
8. `Notes`:
   - `<关键提示 1>`
   - `<关键提示 2>`
