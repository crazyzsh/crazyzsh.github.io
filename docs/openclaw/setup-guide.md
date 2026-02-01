# OpenClaw 初始化配置流程

本指南基于实际配置经验，记录从安装到 Telegram 接入的完整流程。

## 环境要求

- **Node.js**: ≥ 22
- **操作系统**: macOS、Linux、Windows (WSL2)
- **包管理器**: npm / pnpm / bun

## 第一步：安装 OpenClaw

### 使用 pnpm 安装（推荐）

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 安装 OpenClaw
pnpm add -g openclaw@latest

# 设置 pnpm 路径（添加到 ~/.zshrc）
export PNPM_HOME="/Users/fangzhong/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# 生效
source ~/.zshrc

# 验证安装
openclaw --version
```

## 第二步：配置模型 API

### 选择模型提供商

|提供商|模型|特点|
|------|------|------|
|Google Gemini|gemini-2.5-flash|免费额度充足|
|MiniMax|abab6.5s-chat|国内访问快|
|Anthropic|claude-opus-4.5|效果最好（需付费）|

### 配置环境变量

编辑 `~/.zshrc`：

```bash
# OpenClaw Gemini API（示例）
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="AIzaSy..."
```

生效：

```bash
source ~/.zshrc
```

### 设置模型

```bash
openclaw config set agents.defaults.model.primary "google/gemini-2.5-flash"
```

**可用模型列表**：

```bash
openclaw models list
```

## 第三步：配置 Telegram

### 1. 创建 Telegram Bot

1. 在 Telegram 中联系 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot` 创建新机器人
3. 设置名称和用户名
4. 复制 Bot Token（格式：`123456:ABC-DEF...`）

### 2. 配置 Token

```bash
# 方式一：编辑配置文件
nano ~/.openclaw/openclaw.json

# 方式二：使用 config 命令
openclaw config set channels.telegram.botToken "你的BotToken"
```

### 3. 配置安全策略（推荐）

```json
{
  "channels": {
    "telegram": {
      "botToken": "你的BotToken",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist"
    }
  }
}
```

- `dmPolicy: "pairing"` - 未知用户需配对批准
- `dmPolicy: "open"` - 完全开放（不推荐）

## 第四步：启动网关

```bash
# 设置环境变量
export PATH="/Users/fangzhong/.local/share/pnpm:$PATH"
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"

# 启动网关
openclaw gateway --port 18789 --verbose &
```

### 后台运行

```bash
# 使用 nohup
nohup openclaw gateway --port 18789 --verbose > /tmp/openclaw.log 2>&1 &

# 或使用 pm2
pm2 start openclaw -- gateway --port 18789
```

## 第五步：首次配对

### 1. 在 Telegram 中找到你的机器人

- 搜索：`@你的机器人用户名`
- 或访问：`https://t.me/你的机器人用户名`

### 2. 发送消息

发送 `/start` 或任意消息。

### 3. 收到配对码

机器人会回复：

```text
OpenClaw: access not configured.
Your Telegram user id: 123456789
Pairing code: RXM27TYZ
```

### 4. 批准配对

```bash
openclaw pairing approve telegram RXM27TYZ
```

批准后，用户即可正常对话。

## 第六步：验证配置

```bash
# 查看网关状态
openclaw status

# 检查通道状态
openclaw channels status
```

预期输出：

```text
Channels
┌──────────┬─────────┬────────┬─────────────────────┐
│ Channel  │ Enabled │ State  │ Detail              │
├──────────┼─────────┼────────┼─────────────────────┤
│ Telegram │ ON      │ OK     │ token config...     │
└──────────┴─────────┴────────┴─────────────────────┘
```

## 完整配置示例

`~/.openclaw/openclaw.json`：

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
      "botToken": "8129198272:AAHbPMJRM_a-Ap-...",
      "dmPolicy": "pairing"
    }
  },
  "gateway": {
    "mode": "local",
    "auth": {
      "token": "随机token"
    }
  }
}
```

## 故障排除

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :18789

# 使用其他端口
openclaw gateway --port 18790
```

### 配对失败

```bash
# 重新发送消息获取新配对码
# 然后批准
openclaw pairing approve telegram 新配对码
```

### 模型不支持

```bash
# 查看可用模型
openclaw models list

# 重新设置模型
openclaw config set agents.defaults.model.primary "正确的模型名"
```

### 网关启动失败

```bash
# 查看详细错误
openclaw doctor --fix

# 查看日志
openclaw logs --follow
```

## 快速启动脚本

创建 `~/start-openclaw.sh`：

```bash
#!/bin/bash
export PATH="/Users/fangzhong/.local/share/pnpm:$PATH"
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"

cd ~
pkill -f openclaw-gateway 2>/dev/null
sleep 2
echo "启动 OpenClaw 网关..."
openclaw gateway --port 18789 --verbose
```

运行：

```bash
chmod +x ~/start-openclaw.sh
~/start-openclaw.sh
```
