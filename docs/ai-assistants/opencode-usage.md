# OpenCode 使用指南 🚀

OpenCode 是一个开源的 AI 编程代理，可在终端、IDE 或桌面应用中使用。

## 一、快速开始 ⚡

### 1.1 安装

```bash
# Homebrew (macOS/Linux)
brew install anomalyco/tap/opencode

# npm
npm install -g opencode-ai
```

### 1.2 连接 LLM 🔗

```bash
opencode
/connect
```

### 1.3 开始使用 💻

输入需求即可开始编程。

## 二、插件与命令行 🔌

### 2.1 IDE 插件（推荐）✨

**方式一：自动安装（推荐）**

1. 打开 VS Code / Cursor / Windsurf 集成终端
2. 运行 `opencode`
3. 插件自动安装

**方式二：手动安装**

在 VS Code 扩展市场搜索 "OpenCode" 安装。

> ⚠️ 插件需要配合 CLI 使用，请先完成 1.1 安装

在 VS Code、Cursor、Windsurf 中使用：

1. 打开集成终端，运行 `opencode`
2. 自动启用分屏视图

**快捷键：**

| 快捷键                             | 功能             |
| ---------------------------------- | ---------------- |
| `Cmd+Esc` / `Ctrl+Esc`             | 快速启动分屏视图 |
| `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | 启动新会话       |
| `Cmd+Option+K` / `Alt+Ctrl+K`      | 插入文件引用     |

> 💡 **命令行终端**：无法使用快捷键插入文件引用，请使用 `Cmd+Shift+P` / `Ctrl+Shift+P` 搜索 "Open opencode in new tab" 插入引用。

### 2.2 命令行 ⌨️

```bash
opencode
```

| 特性     | IDE 插件         | 命令行           |
| -------- | ---------------- | ---------------- |
| 分屏显示 | VS Code 分栏视图 | 原生终端分屏     |
| 文件编辑 | 自动同步         | 需配置外部编辑器 |
| 上下文   | 自动获取打开文件 | 需手动指定       |

## 三、安装 📦

```bash
# Homebrew (macOS/Linux)
brew install anomalyco/tap/opencode

# npm
npm install -g opencode-ai
```

## 四、连接 LLM 🤖

运行 `opencode` 后，使用 `/connect` 命令连接 LLM 提供商：

```bash
opencode
/connect
```

### 4.1 选择提供商

1. 运行 `/connect`
2. 从列表中选择 LLM 提供商（如 OpenCode Zen、Claude、OpenAI 等）
3. 输入 API key

### 4.2 OpenCode Zen（推荐）🌟

```
/connect
# 选择 opencode
# 访问 https://opencode.ai/auth 获取 API key
# 输入 API key
```

✨ **免费使用 4 种模型**

### 4.3 其他提供商 🔄

支持 75+ LLM 提供商，包括 Claude、GPT、Gemini 等。

## 五、配置文件 📝

| 配置文件                  | 用途                       |
| ------------------------- | -------------------------- |
| `~/.opencode/config.json` | 全局配置                   |
| `AGENTS.md`               | 项目级配置（需提交到 Git） |

## 六、命令列表 📋

### 6.1 TUI 内置命令

| 命令 | 功能 | 快捷键 | 别名 | 使用场景 |
|------|------|--------|------|----------|
| `/help` | 显示帮助菜单 | `ctrl+x h` | - | 忘记命令时查看所有可用命令 |
| `/connect` | 添加 LLM 提供商 | - | - | 首次使用或添加新的 AI 提供商 |
| `/init` | 创建/更新 AGENTS.md | `ctrl+x i` | - | 新项目初始化，让 AI 理解项目结构 |
| `/models` | 列出可用模型 | `ctrl+x m` | - | 查看可选的 AI 模型列表 |
| `/new` | 开始新会话 | `ctrl+x n` | `/clear` | 切换到新任务，清空对话上下文 |
| `/sessions` | 列出/切换会话 | `ctrl+x l` | `/resume`, `/continue` | 继续之前的工作会话 |
| `/share` | 分享当前会话 | `ctrl+x s` | - | 与团队成员分享对话内容 |
| `/unshare` | 取消分享 | - | - | 取消已分享的会话链接 |
| `/compact` | 压缩当前会话 | `ctrl+x c` | `/summarize` | 对话过长时减少 token 消耗 |
| `/undo` | 撤销最近一次对话及文件更改 | `ctrl+x u` | - | AI 生成代码错误时回退 |
| `/redo` | 重做被撤销的更改 | `ctrl+x r` | - | 恢复被错误撤销的内容 |
| `/exit` | 退出 OpenCode | `ctrl+x q` | `/quit`, `/q` | 结束工作，退出程序 |
| `/editor` | 打开外部编辑器编写消息 | `ctrl+x e` | - | 复杂提示词需要详细编写时 |
| `/export` | 导出对话为 Markdown | `ctrl+x x` | - | 保存对话记录用于文档 |
| `/details` | 切换工具执行详情显示 | `ctrl+x d` | - | 调试时查看 AI 执行步骤 |
| `/theme` | 切换主题 | `ctrl+x t` | - | 切换 TUI 外观主题 |
| `/thinking` | 切换思考/推理块显示 | - | - | 查看模型的推理过程 |
| `/timeline` | 查看会话时间线 | `ctrl+x g` | - | 浏览会话历史消息和操作记录 |

### 6.2 文件引用

使用 `@文件名` 引用文件内容到对话中：

```markdown
# 引用单个文件
How is auth handled in @src/auth.ts?

# 引用多个文件
Review @src/api.ts and @src/models/user.ts

# 模糊搜索文件
Explain the database layer in @*db*
```

**使用场景**：
- 让 AI 分析特定文件的代码
- 引用配置文件进行修改
- 查阅文档或测试文件

### 6.3 Bash 命令

以 `!` 开头执行 Shell 命令：

```bash
!ls -la                    # 列出文件
!npm run test              # 运行测试
!git status                # 查看 Git 状态
!npm install package       # 安装依赖
```

**使用场景**：
- 运行构建、测试命令
- 查看文件目录结构
- 执行 Git 操作
- 管理开发环境

### 6.4 自定义命令

在 `.opencode/commands/` 目录创建 Markdown 文件定义自定义命令：

**.opencode/commands/test.md**
```yaml
---
description: 运行测试
agent: build
model: anthropic/claude-3-5-sonnet
---
运行完整测试套件并显示覆盖率报告。
```

使用 `/test` 执行自定义命令。

### 6.5 常用命令详解

#### `/timeline` - 会话时间线
```
/timeline
```
查看当前会话的完整时间线，记录所有消息、文件更改和操作历史。  
**快捷键**：`ctrl+x g`

**使用场景**：
- 回溯对话历史，查看之前的操作
- 快速定位到会话中的某个时间点
- 审计 AI 的决策过程和代码变更

#### `/details` - 执行详情
```
/details
```
显示 AI 执行工具调用的详细过程。**快捷键**：`ctrl+x d`

**使用场景**：
- 调试时查看 AI 调用的具体工具
- 了解 AI 如何处理你的请求
- 排查工具执行问题

---

## 七、CLI 命令完整列表 📦

OpenCode CLI 提供丰富的命令行接口，支持脚本化和自动化。

### 7.1 基础命令

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode` | 启动 TUI 界面 | 日常交互式编程 |
| `opencode tui [project]` | 启动终端界面 | 指定项目目录启动 |
| `opencode run "提示词"` | 非交互式执行 | 脚本化、自动化任务 |
| `opencode attach [url]` | 连接到远程服务器 | 使用远程后端服务 |

### 7.2 会话管理

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode session list` | 列出所有会话 | 查看历史会话 |
| `opencode export [sessionID]` | 导出会话为 JSON | 保存对话记录 |
| `opencode import <file/URL>` | 导入会话 | 恢复或分享会话 |

**使用示例**：
```bash
# 列出最近 10 个会话
opencode session list -n 10

# 导出指定会话
opencode export abc123

# 从文件导入
opencode import session.json

# 从分享链接导入
opencode import https://opencode.ai/s/abc123
```

### 7.3 认证管理

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode auth login` | 登录提供商 | 配置 API keys |
| `opencode auth list` | 列出已认证提供商 | 查看已配置的服务 |
| `opencode auth ls` | 同上（简写） | - |
| `opencode auth logout` | 退出登录 | 清除凭证 |

**使用示例**：
```bash
# 交互式登录
opencode auth login

# 查看已配置的 API keys
opencode auth list
```

### 7.4 MCP 服务器管理

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode mcp add` | 添加 MCP 服务器 | 集成外部工具 |
| `opencode mcp list` | 列出所有 MCP 服务器 | 查看已配置服务 |
| `opencode mcp ls` | 同上（简写） | - |
| `opencode mcp auth [name]` | OAuth 认证 MCP 服务器 | 认证远程 MCP |
| `opencode mcp auth list` | 列出 OAuth 状态 | 查看认证状态 |
| `opencode mcp logout [name]` | 清除 MCP 认证 | 移除凭证 |
| `opencode mcp debug <name>` | 调试 MCP 连接 | 排查连接问题 |

**使用示例**：
```bash
# 添加 MCP 服务器（交互式）
opencode mcp add

# 列出所有 MCP 服务器
opencode mcp list

# 对特定服务器进行 OAuth 认证
opencode mcp auth mastergo

# 调试连接问题
opencode mcp debug sentry
```

### 7.5 模型管理

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode models [provider]` | 列出可用模型 | 查看可选模型 |
| `opencode models --refresh` | 刷新模型缓存 | 获取最新模型列表 |
| `opencode models --verbose` | 详细模型信息 | 查看模型元数据（含成本） |

**使用示例**：
```bash
# 列出所有可用模型
opencode models

# 过滤特定提供商
opencode models anthropic

# 刷新缓存获取最新模型
opencode models --refresh

# 查看详细模型信息
opencode models --verbose
```

### 7.6 代理管理

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode agent create` | 创建自定义代理 | 配置专用代理 |
| `opencode agent list` | 列出所有代理 | 查看可用代理 |

**使用示例**：
```bash
# 交互式创建新代理
opencode agent create

# 查看已配置的代理
opencode agent list
```

### 7.7 服务器命令

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode serve` | 启动无头服务器 | API 访问、远程连接 |
| `opencode web` | 启动 Web 服务器 | 浏览器访问 |
| `opencode acp` | 启动 ACP 服务器 | 兼容 ACP 的编辑器 |

**使用示例**：
```bash
# 启动无头服务器（默认端口）
opencode serve

# 指定端口和主机
opencode serve --port 4096 --hostname 0.0.0.0

# 启动 Web 界面
opencode web

# 启动 ACP 服务器
opencode acp
```

### 7.8 GitHub 集成

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode github install` | 安装 GitHub 代理 | 仓库自动化配置 |
| `opencode github run` | 运行 GitHub 代理 | CI/CD 流程中使用 |

**使用示例**：
```bash
# 在仓库中安装 GitHub 代理
opencode github install

# 在 GitHub Actions 中运行
opencode github run --event pull_request
```

### 7.9 统计与工具

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `opencode stats` | 查看使用统计 | 监控 token 消耗和成本 |
| `opencode upgrade [版本]` | 升级 OpenCode | 更新到最新版本 |
| `opencode uninstall` | 卸载 OpenCode | 清理安装 |

**使用示例**：
```bash
# 查看最近 7 天统计
opencode stats --days 7

# 显示前 5 个使用最多的工具
opencode stats --tools 5

# 查看模型使用分布
opencode stats --models 3

# 升级到最新版本
opencode upgrade

# 升级到指定版本
opencode upgrade v0.1.48

# 卸载（保留配置）
opencode uninstall --keep-config
```

### 7.10 全局参数

| 参数 | 短参数 | 说明 |
|------|--------|------|
| `--help` | `-h` | 显示帮助 |
| `--version` | `-v` | 打印版本号 |
| `--print-logs` | - | 打印日志到 stderr |
| `--log-level` | - | 日志级别（DEBUG/INFO/WARN/ERROR） |

### 7.11 run 命令参数

| 参数 | 短参数 | 说明 |
|------|--------|------|
| `--continue` | `-c` | 继续上一个会话 |
| `--session` | `-s` | 指定会话 ID |
| `--share` | - | 分享会话 |
| `--model` | `-m` | 指定模型（provider/model） |
| `--agent` | - | 指定代理 |
| `--file` | `-f` | 附加文件到消息 |
| `--format` | - | 输出格式（default/json） |
| `--attach` | - | 连接到运行中的服务器 |

**使用示例**：
```bash
# 快速执行（非交互式）
opencode run "Explain closures in JavaScript"

# 指定模型
opencode run "Write a React component" --model anthropic/claude-3-5-sonnet

# 附加文件
opencode run "Review this code" --file src/auth.ts

# 继续上次会话
opencode run --continue

# 连接到远程服务器执行
opencode run --attach http://localhost:4096 "Fix the bug"
```

---

## 八、使用场景指南 🎯

### 场景 1：新项目初始化

```bash
# 1. 进入项目目录
cd my-project

# 2. 启动 OpenCode
opencode

# 3. 运行初始化
/init

# 4. 连接 LLM 提供商
/connect
```

### 场景 2：快速代码修复

```bash
# 方法 1：TUI 模式
opencode
/undo  # 撤销错误修改

# 方法 2：命令行快速修复
opencode run "Fix the TypeScript error in src/api.ts"
```

### 场景 3：团队协作

```bash
# 分享当前会话
/share

# 导出对话记录
opencode export > session.json

# 团队成员导入
opencode import session.json
```

### 场景 4：成本监控

```bash
# 查看本周使用统计
opencode stats --days 7

# 查看特定项目
opencode stats --project my-project

# 查看模型使用分布
opencode stats --models 5
```

### 场景 5：自动化脚本

```bash
#!/bin/bash
# 自动化代码审查脚本

opencode run "Review the changes in this PR and suggest improvements" \
  --file src/ \
  --format json > review_result.json
```

### 场景 6：远程开发

```bash
# 服务器端：启动无头服务器
opencode serve --port 4096 --hostname 0.0.0.0

# 本地端：连接远程服务器
opencode attach http://server-ip:4096
```

## 七、隐私说明 🔒

OpenCode 不存储任何代码或上下文数据，可在敏感环境中使用。
