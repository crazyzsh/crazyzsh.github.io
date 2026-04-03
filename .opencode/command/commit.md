---
description: Commit changes with proper git workflow. Analyzes staged changes, generates atomic commits following repo conventions.
---

## 分析变更

请先执行以下命令分析当前的 git 状态：

```bash
git status
git diff --cached --stat
```

## 生成提交

根据分析结果，按照以下原则生成提交：

### 提交原则

1. **原子性**：
   - 3+ 文件 → 至少 2 个提交
   - 5+ 文件 → 至少 3 个提交
   - 10+ 文件 → 至少 5 个提交

2. **提交信息规范**：
   - 使用中文或英文（根据仓库现有风格）
   - 格式：`类型: 描述`
   - 类型：feat、fix、docs、refactor、chore 等

3. **自动风格检测**：
   - 分析最近 30 次提交的语言和风格
   - 匹配仓库的提交规范

### 执行提交

1. 如果有多个独立的变更，请先分别暂存并提交：
   ```bash
   git add <files-group-1>
   git commit -m "feat: add first logical change"
   
   git add <files-group-2>  
   git commit -m "fix: correct second logical change"
   ```

2. 如果是单一变更，直接提交：
   ```bash
   git commit -m "<type>: <description>"
   ```

3. 展示最终结果：
   ```bash
   git log -3 --oneline
   ```

### 注意事项

- 不要提交包含敏感信息的文件（如 .env、credentials.json 等）
- 确保提交信息清晰描述了做了什么以及为什么
- 如果需要，可以添加详细的提交正文说明
