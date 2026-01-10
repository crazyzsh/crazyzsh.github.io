# Claude Code 使用指南

Claude Code 是 Anthropic 官方的 CLI 编程助手，专注于软件工程任务。

## 安装

### CLI 安装

```bash
npm install -g @anthropic-ai/claude-code
```

### VSCode/Cursor 扩展

```bash
code --install-extension anthropic.claude-code
```

## 使用方式

### 终端中使用

```bash
cd your-project
claude
```

### VSCode/Cursor 中使用

安装扩展后，IDE 侧边栏会出现 Claude Code 面板，直接对话即可。

## 常用命令

| 命令 | 说明 |
|------|------|
| `/help` | 查看帮助 |
| `/clear` | 清除上下文 |
| `/doctor` | 检查配置问题 |
| `Ctrl+C` | 取消当前操作 |
| `Ctrl+D` | 退出 |

## MCP 服务器配置

在 `~/.claude.json` 或项目的 `.cursor/mcp.json` 中配置：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}
```

## 与 Cursor 搭配使用

Cursor 内置了 AI 功能，Claude Code 可作为补充：

| 功能 | 说明 |
|------|------|
| **Cursor Chat** (Ctrl+L) | 日常对话 |
| **Claude Code CLI** | 复杂任务、代码重构、多文件修改 |
| **Cmd+K** | 光标处快速编辑 |

## 配置示例

### Claude Code 配置 (~/.claude.json)

```json
{
  "model": "claude-sonnet-4-20250514",
  "diffTool": "auto",
  "env": {
    "DISABLE_NON_ESSENTIAL_MODEL_CALLS": "1"
  }
}
```

### VSCode 设置 (settings.json)

```json
{
  "claudeCodeChat.wsl.enabled": true
}
```

## CLI 与 Cursor 插件的区别

| 特性 | `npm install @anthropic-ai/claude-code` | Cursor 插件 |
|------|----------------------------------------|-------------|
| **安装位置** | 全局 CLI (`node_modules`) | VS Code 扩展目录 |
| **启动方式** | 终端运行 `claude` | IDE 侧边栏面板 |
| **使用场景** | 独立终端、CI/CD、任何编辑器 | Cursor/VS Code 内 |
| **项目感知** | 需手动 `cd` 进入目录 | 自动获取当前项目 |
| **文件编辑** | 需手动保存 | 自动同步 IDE |
| **交互方式** | 纯命令行 | 聊天面板 + 命令行 |
| **权限控制** | 配置 `~/.claude.json` | IDE 集成设置 |

**简单说：**
- **CLI**：通用工具，可在任何终端、任何编辑器使用
- **插件**：深度集成 Cursor/VS Code，界面更友好

## 核心优势

1. **直接操作文件** - 读写、编辑、搜索代码
2. **执行命令** - 运行测试、构建、Git 操作
3. **项目感知** - 自动理解代码结构
4. **可配置权限** - 控制工具使用范围
