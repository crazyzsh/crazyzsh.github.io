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

### 6.1 常用命令

| 命令 | 功能 | 快捷键 | 别名 |
|------|------|--------|------|
| `/help` | 显示帮助菜单 | `ctrl+x h` | - |
| `/connect` | 添加 LLM 提供商 | - | - |
| `/init` | 创建/更新 AGENTS.md | `ctrl+x i` | - |
| `/models` | 列出可用模型 | `ctrl+x m` | - |
| `/new` | 开始新会话 | `ctrl+x n` | `/clear` |
| `/sessions` | 列出/切换会话 | `ctrl+x l` | `/resume`, `/continue` |
| `/share` | 分享当前会话 | `ctrl+x s` | - |
| `/unshare` | 取消分享 | - | - |
| `/compact` | 压缩当前会话 | `ctrl+x c` | `/summarize` |
| `/undo` | 撤销最近一次对话及文件更改 | `ctrl+x u` | - |
| `/redo` | 重做被撤销的更改 | `ctrl+x r` | - |
| `/exit` | 退出 OpenCode | `ctrl+x q` | `/quit`, `/q` |

### 6.2 编辑与工具命令

| 命令 | 功能 | 快捷键 | 说明 |
|------|------|--------|------|
| `/editor` | 打开外部编辑器编写消息 | `ctrl+x e` | 使用 `$EDITOR` 环境变量 |
| `/export` | 导出对话为 Markdown | `ctrl+x x` | 在编辑器中打开 |
| `/details` | 切换工具执行详情显示 | `ctrl+x d` | 查看 AI 执行步骤 |
| `/theme` | 切换主题 | `ctrl+x t` | `/themes` |
| `/thinking` | 切换思考/推理块显示 | - | 显示模型推理过程 |

### 6.3 命令详解

#### `/help` - 帮助菜单
```
/help
```
显示所有可用命令和快捷键说明。

#### `/connect` - 连接 LLM
```
/connect
```
添加或管理 LLM 提供商：
1. 从列表中选择提供商
2. 输入 API key
3. 完成认证

#### `/init` - 初始化项目
```
/init
```
分析项目结构，创建或更新 `AGENTS.md` 文件。

#### `/models` - 模型列表
```
/models
```
显示所有可用的 AI 模型及其信息。

#### `/new` - 新会话
```
/new
```
开始新的对话会话。`/clear` 是别名。

#### `/sessions` - 会话管理
```
/sessions
```
列出所有会话，可切换到历史会话继续工作。 别名：`/resume`, `/continue`

#### `/share` - 分享会话
```
/share
```
生成会话链接并复制到剪贴板，可分享给团队成员。

#### `/unshare` - 取消分享
```
/unshare
```
撤销分享，删除已分享的会话链接。

#### `/compact` - 压缩会话
```
/compact
/summarize
```
压缩对话历史，减少 token 消耗但保留上下文。

#### `/undo` - 撤销
```
/undo
```
撤销最近一次用户消息、AI 回复及所有文件更改。  
**要求**：项目必须是 Git 仓库。  
**快捷键**：`ctrl+x u`

#### `/redo` - 重做
```
/redo
```
恢复被 `/undo` 撤销的更改。  
**快捷键**：`ctrl+x r`

#### `/exit` - 退出
```
/exit
/quit
/q
```
退出 OpenCode。**快捷键**：`ctrl+x q`

#### `/editor` - 外部编辑器
```
/editor
```
在外部编辑器中编写消息（使用 `$EDITOR` 环境变量）。

#### `/export` - 导出对话
```
/export
```
将当前对话导出为 Markdown 文件，在编辑器中打开。

#### `/details` - 执行详情
```
/details
```
显示 AI 执行工具调用的详细过程。**快捷键**：`ctrl+x d`

#### `/theme` - 主题切换
```
/theme
/themes
```
切换 TUI 主题风格。**快捷键**：`ctrl+x t`

#### `/thinking` - 思考显示
```
/thinking
```
切换模型思考/推理过程的可见性（仅部分模型支持）。

### 6.4 文件引用

使用 `@文件名` 引用文件内容到对话中：

```
How is auth handled in @src/auth.ts?
```

### 6.5 Bash 命令

以 `!` 开头执行 Shell 命令：

```
!ls -la
!npm run test
```

命令输出会作为工具结果添加到对话中。

### 6.6 自定义命令

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

## 七、隐私说明 🔒

OpenCode 不存储任何代码或上下文数据，可在敏感环境中使用。
