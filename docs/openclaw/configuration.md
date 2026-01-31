# OpenClaw 配置说明

## 配置文件

OpenClaw 的配置文件位于 `~/.openclaw/openclaw.json`。

## 基础配置

### 最简配置

```json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5"
  }
}
```

### 完整配置结构

```json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5",
    "thinkingLevel": "high"
  },
  "gateway": {
    "bind": "loopback",
    "port": 18789
  },
  "channels": {
    "whatsapp": {
      "enabled": true
    },
    "telegram": {
      "botToken": "your-bot-token"
    },
    "slack": {
      "botToken": "your-bot-token",
      "appToken": "your-app-token"
    },
    "discord": {
      "token": "your-bot-token"
    }
  },
  "browser": {
    "enabled": true,
    "color": "#FF4500"
  }
}
```

## 模型配置

### 支持的模型

- Anthropic (Claude Pro/Max 推荐)
- OpenAI (ChatGPT/Codex)
- 其他兼容 OpenAI API 的模型

### 模型切换

通过命令行切换模型：

```bash
openclaw agent --model anthropic/claude-sonnet-4 --message "Hello"
```

## 渠道配置

### WhatsApp

无需额外配置，使用登录命令：

```bash
pnpm openclaw channels login
```

### Telegram

```json
{
  "channels": {
    "telegram": {
      "botToken": "123456:ABCDEF"
    }
  }
}
```

### Slack

```json
{
  "channels": {
    "slack": {
      "botToken": "xoxb-...",
      "appToken": "xapp-..."
    }
  }
}
```

### Discord

```json
{
  "channels": {
    "discord": {
      "token": "your-bot-token"
    }
  }
}
```

## 工作区配置

### 工作区路径

默认路径：`~/.openclaw/workspace`

可通过配置修改：

```json
{
  "agents": {
    "defaults": {
      "workspace": "/path/to/your/workspace"
    }
  }
}
```

### 注入的提示文件

- `AGENTS.md` - 代理行为配置
- `SOUL.md` - 代理个性配置
- `TOOLS.md` - 工具配置

## 安全配置

### 沙箱模式

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main"
      }
    }
  }
}
```

### 访问控制

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["*"]
    }
  }
}
```

## Tailscale 配置

### Serve 模式（仅 Tailnet 内）

```json
{
  "gateway": {
    "tailscale": {
      "mode": "serve"
    }
  }
}
```

### Funnel 模式（公开访问）

```json
{
  "gateway": {
    "tailscale": {
      "mode": "funnel"
    },
    "auth": {
      "mode": "password"
    }
  }
}
```

## 认证配置

### API 密钥

```json
{
  "ANTHROPIC_API_KEY": "sk-ant-...",
  "OPENAI_API_KEY": "sk-..."
}
```

### OAuth

支持 OAuth 认证的模型提供商：

- Anthropic
- OpenAI

## 命令行选项

### 常用命令

```bash
# 查看帮助
openclaw --help

# 发送消息
openclaw message send --to +1234567890 --message "Hello"

# 与助手对话
openclaw agent --message "Ship checklist"

# 查看状态
openclaw status

# 运行诊断
openclaw doctor
```

## 环境变量

|变量|说明|
|------|------|
|`ANTHROPIC_API_KEY`|Anthropic API 密钥|
|`OPENAI_API_KEY`|OpenAI API 密钥|
|`TELEGRAM_BOT_TOKEN`|Telegram Bot Token|
|`SLACK_BOT_TOKEN`|Slack Bot Token|
|`SLACK_APP_TOKEN`|Slack App Token|
|`DISCORD_BOT_TOKEN`|Discord Bot Token|
