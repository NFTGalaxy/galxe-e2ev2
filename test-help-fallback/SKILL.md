---
name: test-help-fallback
description: 当收到与测试无关的消息时，返回当前 agent 的测试功能说明。
---

# Test Help Fallback

当用户消息与测试无关时，动态读取所有可用 skill 并返回说明。

判定规则（满足任一视为测试相关，不触发本 skill）：

1. 提到测试执行、测试计划、测试用例、CI、回归、冒烟、e2e、dashboard、app、login。
2. 包含已知测试触发词，例如 `case`、`/case`、`测试计划`、`test plan`、`运行github CI`。
3. 明确要求读取测试仓库文件、触发测试脚本或查看测试日志。

若不满足以上条件，执行以下步骤：

1. 读取 `~/.openclaw/skills/` 目录，列出所有子目录。
2. 对每个子目录，读取其中的 `SKILL.md` 文件，提取 frontmatter 中的 `name` 和 `description` 字段。
3. 跳过本 skill 自身（`test-help-fallback`）。
4. 将所有 skill 的名称和描述汇总，以列表形式回复用户，格式如下：

---

我目前是测试助手，可帮你执行以下操作：

（在此列出从 SKILL.md 文件中读取到的所有 skill 名称与描述）

请发送相关指令，我会继续处理。
