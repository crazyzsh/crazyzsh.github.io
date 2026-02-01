# OpenClaw 常用命令

## 环境准备

### 设置 pnpm 路径（macOS）

```bash
# 添加到 ~/.zshrc
export PNPM_HOME="/Users/fangzhong/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# 生效
source ~/.zshrc
```

### 设置模型 API 环境变量

```bash
# Gemini 示例
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"

# MiniMax 示例
export OPENAI_BASE_URL="https://api.minimax.chat/v1"
export OPENAI_API_KEY="你的API密钥"
```

## 网关管理

### 启动网关

```bash
# 前台运行（可查看日志）
openclaw gateway --port 18789 --verbose

# 后台运行
openclaw gateway --port 18789 --verbose &
```

### 重启网关

```bash
# 杀死进程并重启
pkill -f openclaw-gateway
sleep 2
openclaw gateway --port 18789 --verbose &
```

### 查看网关状态

```bash
openclaw status

# 详细状态
openclaw status --all
```

### 查看网关日志

```bash
# 实时日志
openclaw logs --follow

# 最近 50 行
tail -50 /tmp/openclaw/openclaw-*.log
```

## 配置管理

### 查看配置

```bash
# 查看完整配置
cat ~/.openclaw/openclaw.json

# 查看特定配置
openclaw config get agents.defaults.model.primary
```

### 设置配置

```bash
# 设置模型
openclaw config set agents.defaults.model.primary "google/gemini-2.5-flash"

# 设置网关模式
openclaw config set gateway.mode local
```

### 运行诊断

```bash
# 健康检查
openclaw doctor

# 自动修复
openclaw doctor --fix
```

## 通道管理

### 查看通道列表

```bash
openclaw channels list
```

### 查看通道状态

```bash
openclaw channels status
```

### 查看特定通道日志

```bash
openclaw channels logs telegram
```

## 配对管理

### 查看待批准配对

```bash
openclaw pairing list
```

### 批准配对

```bash
# Telegram 配对
openclaw pairing approve telegram RXM27TYZ
```

## 模型管理

### 查看支持的模型

```bash
openclaw models list
```

## 会话管理

### 查看会话列表

```bash
openclaw sessions
```

### 清除会话

```bash
openclaw sessions reset
```

## 完整工作流示例

```bash
# 1. 设置环境变量
export PATH="/Users/fangzhong/.local/share/pnpm:$PATH"
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"

# 2. 设置模型
openclaw config set agents.defaults.model.primary "google/gemini-2.5-flash"

# 3. 重启网关
pkill -f openclaw-gateway
sleep 2
openclaw gateway --port 18789 --verbose &

# 4. 查看状态
sleep 5
openclaw status

## 常用命令速查表

|功能|命令|
|------|------|
|`openclaw gateway --port 18789 --verbose`|启动网关|
|`pkill -f openclaw-gateway && openclaw gateway --port 18789`|重启网关|
|`openclaw status`|查看状态|
|`openclaw logs --follow`|实时日志|
|`openclaw channels list`|通道列表|
|`openclaw pairing approve telegram <code>`|配对批准|
|`openclaw doctor`|健康检查|
|`openclaw models list`|模型列表|
