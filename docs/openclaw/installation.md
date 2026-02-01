# OpenClaw 安装指南

## 系统要求

- **Node.js**: ≥ 22
- **操作系统**: macOS、Linux、Windows (WSL2 推荐)
- **包管理器**: npm、pnpm 或 bun

## 安装步骤

### 方式一：使用 pnpm（推荐）

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 安装 OpenClaw
pnpm add -g openclaw@latest

# 设置 pnpm 路径
export PNPM_HOME="/Users/fangzhong/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# 永久生效，添加到 ~/.zshrc 或 ~/.bashrc
echo 'export PNPM_HOME="/Users/fangzhong/.local/share/pnpm"' >> ~/.zshrc
echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 方式二：使用 npm

```bash
npm install -g openclaw@latest
```

### 方式三：从源码安装

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build
pnpm build
```

### 验证安装

```bash
openclaw --version
```

输出类似：`2026.1.30`

## 环境变量配置

### macOS/Linux

编辑 `~/.zshrc`：

```bash
# OpenClaw Gemini API
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"
```

生效：

```bash
source ~/.zshrc
```

### Windows (WSL2)

编辑 `~/.bashrc` 或 `~/.zshrc`：

```bash
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1"
export OPENAI_API_KEY="你的API密钥"
```

## 初始配置

### 1. 设置模型

```bash
openclaw config set agents.defaults.model.primary "google/gemini-2.5-flash"
```

查看可用模型：

```bash
openclaw models list
```

### 2. 配置 Telegram（示例）

```bash
openclaw config set channels.telegram.botToken "你的BotToken"
```

### 3. 设置网关模式

```bash
openclaw config set gateway.mode local
```

### 4. 运行诊断

```bash
openclaw doctor --fix
```

## 启动网关

### 前台运行（开发）

```bash
openclaw gateway --port 18789 --verbose
```

### 后台运行（生产）

```bash
# 使用 nohup
nohup openclaw gateway --port 18789 --verbose > /tmp/openclaw.log 2>&1 &

# 使用 pm2
pm2 start openclaw -- gateway --port 18789
```

### 使用 launchd（macOS）

```bash
openclaw onboard --install-daemon
```

## 升级

### 通过 pnpm

```bash
pnpm add -g openclaw@latest
```

### 通过 npm

```bash
npm update -g openclaw@latest
```

### 切换版本

```bash
# 稳定版
openclaw update --channel stable

# Beta 版
openclaw update --channel beta

# 开发版
openclaw update --channel dev
```

## 卸载

```bash
# 移除 CLI
pnpm remove -g openclaw

# 移除配置文件（可选）
rm -rf ~/.openclaw

# 移除启动服务
openclaw uninstall
```

## 常见问题

### 端口被占用

```bash
# 查看占用进程
lsof -i :18789

# 使用其他端口
openclaw gateway --port 18790
```

### 命令未找到

```bash
# 检查 pnpm 路径
export PATH="/Users/fangzhong/.local/share/pnpm:$PATH"

# 重新生效
source ~/.zshrc
```

### 权限问题（macOS）

```bash
# 修复权限
chmod 700 ~/.openclaw
chmod 600 ~/.openclaw/openclaw.json
```

### Node.js 版本过低

```bash
# 使用 nvm 升级
nvm install 22
nvm use 22
```
