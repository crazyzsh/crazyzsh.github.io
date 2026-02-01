# OpenClaw 配置说明

## 配置文件位置

主配置文件：`~/.openclaw/openclaw.json`

## 基础配置示例

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "google/gemini-2.5-flash"
      }
    }
  },
  "channels": {
    "telegram": {
      "botToken": "你的BotToken",
      "dmPolicy": "pairing"
    }
  },
  "gateway": {
    "mode": "local",
    "auth": {
      "token": "随机生成的token"
    }
  }
}
```

## 模型配置

### 支持的模型提供商

|提供商|前缀|示例|
|------|------|------|
|Google|`google/`|`google/gemini-2.5-flash`|
|Anthropic|`anthropic/`|`anthropic/claude-opus-4-5`|
|MiniMax|`minimax/`|`minimax/MiniMax-M2.1`|
|OpenAI|`openai/`|`openai/gpt-4o`|

### 设置模型

```bash
# 使用 config 命令
openclaw config set agents.defaults.model.primary "google/gemini-2.5-flash"
```

### 模型列表

```bash
openclaw models list
```

## Telegram 配置

### Bot 配置

```json
{
  "channels": {
    "telegram": {
      "botToken": "123456:AAHbPMJRM_a-Ap-...",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist"
    }
  }
}
```

### DM 策略

- `pairing` - 未知用户需配对批准（推荐）
- `open` - 完全开放（不安全）

### 完整配置

```json
{
  "channels": {
    "telegram": {
      "botToken": "123456:AAHbPMJRM_a-Ap-...",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist",
      "streamMode": "partial"
    }
  }
}
```

## 网关配置

### 基础设置

```json
{
  "gateway": {
    "mode": "local",
    "auth": {
      "token": "your-gateway-token"
    }
  }
}
```

### 网关模式

- `local` - 本地运行（默认）
- `remote` - 远程运行

### Tailscale 暴露

```json
{
  "gateway": {
    "tailscale": {
      "mode": "serve"
    }
  }
}
```

## 环境变量

通过环境变量配置 API：

```bash
# Gemini
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"

# MiniMax
export OPENAI_BASE_URL="https://api.minimax.chat/v1"
export OPENAI_API_KEY="你的API密钥"

# OpenAI
export OPENAI_BASE_URL="https://api.openai.com/v1"
export OPENAI_API_KEY="你的API密钥"
```

## 工作区配置

```json
{
  "agents": {
    "defaults": {
      "workspace": "~/openclaw-workspace"
    }
  }
}
```

## 命令行配置

### 查看配置

```bash
# 查看完整配置
cat ~/.openclaw/openclaw.json

# 查看特定值
openclaw config get agents.defaults.model.primary
```

### 设置配置

```bash
openclaw config set agents.defaults.model.primary "google/gemini-2.5-flash"
openclaw config set gateway.mode local
openclaw config set channels.telegram.botToken "你的Token"
```

### 移除配置

```bash
openclaw config unset agents.defaults.model.primary
```

## 故障排除

### 配置不生效

```bash
# 运行诊断
openclaw doctor --fix

# 重启网关
pkill -f openclaw-gateway
sleep 2
openclaw gateway --port 18789 --verbose &
```

### 权限错误

```bash
# 修复权限
chmod 700 ~/.openclaw
chmod 600 ~/.openclaw/openclaw.json
```

### 配置格式错误

```bash
# 验证 JSON 格式
cat ~/.openclaw/openclaw.json | python3 -m json.tool

# 重置为默认配置
openclaw reset config
```
