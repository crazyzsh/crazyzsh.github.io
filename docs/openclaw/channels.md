# OpenClaw 渠道配置

## 概述

OpenClaw 支持多种即时通讯和协作平台渠道，所有渠道都通过统一的网关进行管理。

## 即时通讯渠道

### WhatsApp

无需额外安装，Baileys 库已内置。

**登录设备：**

```bash
pnpm openclaw channels login
```

**配置项：**

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "allowFrom": ["*"]
    }
  }
}
```

### Telegram

无需额外依赖。

**配置：**

```json
{
  "channels": {
    "telegram": {
      "botToken": "123456:ABCDEF",
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

**环境变量：**

```bash
export TELEGRAM_BOT_TOKEN="your-bot-token"
```

### Signal

需要安装 `signal-cli`。

**安装：**

```bash
# macOS
brew install signal-cli

# Linux
apt install signal-cli
```

**配置：**

```json
{
  "channels": {
    "signal": {
      "enabled": true
    }
  }
}
```

### iMessage

**要求：**

- macOS 系统
- Messages 应用已登录

**配置：**

```json
{
  "channels": {
    "imessage": {
      "enabled": true,
      "groups": {
        "*": {}
      }
    }
  }
}
```

## 团队协作渠道

### Slack

无需额外依赖。

**配置：**

```json
{
  "channels": {
    "slack": {
      "botToken": "xoxb-...",
      "appToken": "xapp-...",
      "dm": {
        "policy": "pairing"
      }
    }
  }
}
```

**所需权限：**

- `chat:write`
- `channels:read`
- `groups:read`
- `im:read`
- `mpim:read`

### Discord

无需额外依赖。

**配置：**

```json
{
  "channels": {
    "discord": {
      "token": "your-bot-token",
      "dm": {
        "policy": "pairing",
        "allowFrom": ["*"]
      },
      "guilds": ["*"]
    }
  }
}
```

**所需权限：**

- Send Messages
- Read Message History
- Manage Channels

### Google Chat

无需额外依赖。

**配置：**

```json
{
  "channels": {
    "googlechat": {
      "enabled": true
    }
  }
}
```

### Microsoft Teams

需要配置 Teams 应用。

**配置：**

```json
{
  "channels": {
    "msteams": {
      "enabled": true,
      "allowFrom": ["*"],
      "groupAllowFrom": ["*"],
      "groupPolicy": "open"
    }
  }
}
```

## 扩展渠道

### BlueBubbles

```json
{
  "channels": {
    "bluebubbles": {
      "enabled": true
    }
  }
}
```

### Matrix

```json
{
  "channels": {
    "matrix": {
      "enabled": true
    }
  }
}
```

### Zalo

```json
{
  "channels": {
    "zalo": {
      "enabled": true
    }
  }
}
```

### WebChat

```json
{
  "channels": {
    "webchat": {
      "enabled": true
    }
  }
}
```

## 通用配置

### DM 策略

**配对模式（推荐）：**

```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "pairing"
    }
  }
}
```

配对模式下，未知发送者会收到配对码，需要管理员批准后才能对话。

**开放模式：**

```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "open",
      "allowFrom": ["*"]
    }
  }
}
```

### 群组配置

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

### 媒体限制

```json
{
  "channels": {
    "discord": {
      "mediaMaxMb": 25
    }
  }
}
```

## 渠道管理命令

### 登录渠道

```bash
openclaw channels login
```

### 查看渠道状态

```bash
openclaw channels status
```

### 测试渠道连接

```bash
openclaw channels test <channel-name>
```

### 禁用渠道

```bash
openclaw channels disable <channel-name>
```

## 故障排除

### WhatsApp 无法连接

1. 检查网络连接
2. 重新运行登录命令
3. 清除凭证后重新登录

### Telegram 机器人无响应

1. 确认 Bot Token 正确
2. 检查机器人是否被封禁
3. 验证 Webhook 配置

### Discord 权限问题

1. 检查机器人角色权限
2. 确认已在服务器中邀请机器人
3. 验证频道权限设置

### Slack OAuth 问题

1. 重新安装应用
2. 检查 Token 权限
3. 确认工作区管理员授权
