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

| 命令 | 功能 | 别名 |
|------|------|------|
| `/help` | 显示帮助 | - |
| `/connect` | 添加 LLM 提供商 | - |
| `/init` | 创建/更新 AGENTS.md | - |
| `/models` | 列出可用模型 | - |
| `/new` | 开始新会话 | `/clear` |
| `/sessions` | 列出/切换会话 | `/resume`, `/continue` |
| `/share` | 分享当前会话 | - |
| `/unshare` | 取消分享 | - |
| `/compact` | 压缩当前会话 | `/summarize` |
| `/undo` | 撤销最近一次对话及文件更改 | - |
| `/redo` | 重做被撤销的更改 | - |

**撤销说明：**
- `/undo` 撤销最近一次用户消息、AI 回复及所有相关文件更改
- `/redo` 恢复被撤销的更改
- 依赖 Git 工作区，项目必须是 Git 仓库
- 快捷键：`ctrl+x u`（撤销）、`ctrl+x r`（重做）

### 6.3 文件引用

使用 `@文件名` 引用文件内容：

```
How is auth handled in @src/auth.ts?
!ls -la  # 运行 shell 命令
```

## 七、隐私说明 🔒

OpenCode 不存储任何代码或上下文数据，可在敏感环境中使用。
