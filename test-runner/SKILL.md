---
name: test-runner
description: 当 Slack 消息请求运行github时，触发 GitHub CI。
---

# Test Runner

当收到“运行github CI xx”时：

1. 提取 `xx` 作为参数（例如 `e2e`、`dashboard`、`app`）。
2. 执行脚本：

`/Users/likai.lear/.openclaw/skills/test-runner/github-ci.sh "xx"`

3. 脚本会将该参数写入 GitHub repository_dispatch 的 `client_payload.args`。
4. 触发成功后，查询并返回对应 GitHub Actions run 的 URL（action url）。
5. URL 格式示例：

`https://github.com/NFTGalaxy/galxe-e2ev2/actions/runs/23186323488`

6. 在 Slack 回复中至少包含：
   - 已触发的参数 `xx`
   - action url
7. 若短时间内未拿到 run URL，先回复“已触发 CI”，并提示稍后补发 action url。
8. 同一条用户请求中，`github-ci.sh` 只能执行一次；禁止为了“检查输出”再次触发 dispatch。
9. 若需要补充信息，只能查询现有 run（如 `gh run view` / `gh run list`），不能再次调用触发脚本。
10. 获取到 action url（run id）后，开始状态跟踪：每隔 1 分钟查询一次该 run 的状态。
11. 每次查询结果都回传到当前 Slack thread（使用 `message` 工具显式回帖），包含：
   - run id
   - status
   - conclusion（若已有）
   - action url
12. 当状态变为 `completed` 时发送最终结果并停止轮询。
13. 状态跟踪必须使用前台轮询，不允许 `background: true`。
14. 轮询流程固定为：`gh run view` 查询 -> `message` 回帖 -> 等待 60 秒 -> 再次查询。
15. 禁止以 `NO_REPLY` 结束会话，直到发送 `completed` 最终状态后才结束。
