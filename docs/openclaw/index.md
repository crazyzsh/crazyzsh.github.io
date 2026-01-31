# OpenClaw - 个人 AI 助手

OpenClaw 是一个开源的个人 AI 助手平台，可在你的设备上运行，支持多平台和多渠道。

## 核心特点

- **本地运行**：在你的设备上运行，保护隐私
- **多平台支持**：WhatsApp、Telegram、Slack、Discord、Google Chat、
  Signal、iMessage、Microsoft Teams 等
- **多设备同步**：macOS、iOS、Android 均可使用
- **开源免费**：MIT 许可证

## 快速开始

### 安装

```bash
npm install -g openclaw@latest
# 或使用 pnpm
pnpm add -g openclaw@latest
```

### 初始化

```bash
openclaw onboard --install-daemon
```

### 运行网关

```bash
openclaw gateway --port 18789 --verbose
```

## 支持的渠道

- 即时通讯：WhatsApp、Telegram、Signal、iMessage
- 团队协作：Slack、Discord、Google Chat、Microsoft Teams
- 扩展渠道：BlueBubbles、Matrix、Zalo、WebChat
- 语音：macOS、iOS、Android 语音唤醒

## 推荐配置

- **模型**：Anthropic Pro/Max (100/200) + Opus 4.5
- **运行时**：Node.js ≥ 22
- **操作系统**：macOS、Linux、Windows (WSL2)

## 官方资源

- [官网](https://openclaw.ai)
- [文档](https://docs.openclaw.ai)
- [GitHub](https://github.com/openclaw/openclaw)
- [Discord](https://discord.gg/clawd)

## 本文档内容

- [安装指南](installation.md)
- [配置说明](configuration.md)
- [渠道设置](channels.md)
- [安全指南](security.md)
