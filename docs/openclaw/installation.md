# OpenClaw 安装指南

## 系统要求

- **Node.js**: ≥ 22
- **操作系统**: macOS、Linux、Windows (WSL2 推荐)

## 安装步骤

### 1. 安装 OpenClaw

使用 npm 安装：

```bash
npm install -g openclaw@latest
```

或使用 pnpm：

```bash
pnpm add -g openclaw@latest
```

### 2. 运行初始化向导

```bash
openclaw onboard --install-daemon
```

向导将引导你完成：

- 网关配置
- 工作区设置
- 渠道连接
- 技能安装

### 3. 启动网关

```bash
openclaw gateway --port 18789 --verbose
```

## Docker 安装

### 使用 Docker Compose

```bash
docker-compose up -d
```

### 手动运行

```bash
docker build -t openclaw .
docker run -p 18789:18789 openclaw
```

## 从源码安装

### 1. 克隆仓库

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

### 2. 安装依赖

```bash
pnpm install
pnpm ui:build
pnpm build
```

### 3. 运行

```bash
pnpm openclaw onboard --install-daemon
pnpm gateway:watch
```

## 升级

### 使用 CLI 升级

```bash
openclaw update --channel stable|beta|dev
```

### 验证安装

```bash
openclaw doctor
```

## 常见问题

### 端口被占用

如果 18789 端口被占用，可以使用其他端口：

```bash
openclaw gateway --port <port>
```

### 权限问题

- macOS：确保在系统偏好设置中授予必要权限
- Linux：可能需要安装额外的系统依赖
- Windows：建议使用 WSL2

### 网关无法启动

检查日志：

```bash
openclaw gateway --verbose
```

运行健康检查：

```bash
openclaw doctor
```
