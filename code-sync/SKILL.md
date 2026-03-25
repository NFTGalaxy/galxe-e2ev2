---
name: code-sync
description: 当收到更新代码的消息时，进入 galxe-web 目录并使用 git 更新 main branch。
---

# Code Sync

当收到"更新代码"或类似同步代码的消息时：

1. 进入项目目录：`$ROOT_PATH/galxe-web`
2. 依次执行以下 git 命令：

```bash
cd $ROOT_PATH/galxe-web
git fetch origin
git checkout main
git pull origin main
```

3. 主仓库更新完成后，进入 submodule 目录并更新其 main branch：

```bash
cd $ROOT_PATH/galxe-web/apps/tests
git fetch origin
git checkout main
git pull origin main
```

4. 将两个阶段的执行结果（每条命令的输出或错误信息）分别回复给用户。
5. 若目录不存在或 git 命令失败，将具体错误信息告知用户，不要静默跳过。
