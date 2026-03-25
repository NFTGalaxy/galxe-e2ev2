---
name: log-tracker
description: 当收到“查看log”消息时，在 @logs 目录查找包含 galxe-tph 的 .log 文件并默认返回最新日志。
---

# Log Tracker

当用户消息包含 `查看log` 时：

1. 在 `@logs/` 目录查找文件名包含 `galxe-tph` 且后缀为 `.log` 的文件。
2. 默认按修改时间倒序选择最新的一个文件。
3. 返回该最新日志文件的内容。

路径映射：

- `@logs/` 对应 `/Users/likai.lear/.openclaw/logs/`

补充规则：

1. 如果用户明确指定某个日志文件名，则优先返回指定文件内容。
2. 如果未找到匹配日志，返回：`未找到包含 galxe-tph 的日志文件`。
