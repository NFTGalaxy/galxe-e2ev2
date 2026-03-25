---
name: list-test-cases
description: 收到 case 返回 README；匹配到 scripts 命令时执行 run-case.sh，并将执行日志回传到 Slack。
---

# List Test Cases

当收到 `case` 或 `/case` 消息时：

1. 每次都必须重新读取 `$ROOT_PATH/galxe-web/apps/tests/README-claw.md`（不得复用历史记忆或缓存文本）。
2. 将读取结果按原文完整返回给用户（逐字透传）。
3. 禁止对 README 内容进行摘要、翻译、改写、重排、补充说明或省略任何行。
4. 若消息渠道有长度限制，必须分片连续发送，确保所有原文行都被完整回传，且分片内容保持原始顺序。

在后续同一 thread 的消息中：

1. 读取 `$ROOT_PATH/galxe-web/apps/tests/package.json` 的 `scripts` 对象 key 列表。
2. 判断用户消息是否包含其中任一命令名。
3. 如果包含，使用该命令名作为参数执行：

`/Users/likai.lear/.openclaw/skills/list-test-cases/run-case.sh <command>`

4. 脚本开始执行后，先在 thread 回复：测试已经开始。
5. 必须等待脚本执行完成后再结束本次回复流程：
   - 优先前台执行（不要使用后台执行）。
   - 若工具只能后台执行，则持续轮询直到进程结束。
6. 日志文件目录固定为 `/Users/likai.lear/.openclaw/logs`。
7. 读取本次执行产生的日志文件（文件名包含 `galxe-tph`，且修改时间不早于本次命令开始时间；若有多个取最新）。
8. 结果回传必须使用显式 `message` 工具发送到当前 Slack thread（不要只输出 `[[reply_to_current]]` 文本）。
9. 不使用脚本内 webhook 回传日志，只使用 bot 的 `message` 工具回帖。
10. 不要在回传阶段再执行额外 shell 命令（如 `ls`、`head`、`python`）去找日志，避免触发 Slack exec approval。
11. 仅使用已知日志路径直接读取并回传结果；若日志较长，按多段消息分片发送。

如果消息未包含有效 scripts 命令，提示用户发送可用命令名。

兜底规则：

1. 即使消息不在 thread 内，只要消息文本包含 `scripts` 的命令名（如 `all`/`app`/`dashboard`/`e2e`/`login`），也按同样流程执行。
2. 即使消息未 @mention bot，只要消息文本命中上述命令名，也按同样流程执行。
3. 兜底命中后同样先回复：测试已经开始，并严格等待执行结束后通过 `message` 工具在当前 thread 回传日志。
