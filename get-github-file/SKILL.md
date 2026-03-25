---
name: get-github-file
description: 当用户说“获取github文件”时，从 NFTGalaxy/galxe-e2ev2 仓库读取文件内容并返回。
---

# Get GitHub File

当用户消息包含 `获取github文件` 时，按以下规则处理：

1. 目标仓库固定为 `NFTGalaxy/galxe-e2ev2`（`https://github.com/NFTGalaxy/galxe-e2ev2`）。
2. 使用 `gh` 命令操作 GitHub（不要改用网页抓取）。
3. 如果用户提供了文件路径，直接读取该文件并返回内容。
4. 如果用户没给路径，先让用户补充文件路径（可选分支名，默认 `main`）。
5. 读取文件命令使用：

```bash
gh api repos/NFTGalaxy/galxe-e2ev2/contents/<path>?ref=<branch> --jq .content | tr -d '\n' | base64 -d
```

6. 如果文件不存在或读取失败，返回明确错误信息并提示可能的正确路径。

补充规则：

1. 需要列目录时，使用：

```bash
gh api repos/NFTGalaxy/galxe-e2ev2/contents/<dir>?ref=<branch>
```

2. 默认分支使用 `main`，除非用户显式指定分支。
