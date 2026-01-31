# OpenClaw 安全指南

## 概述

OpenClaw 直接连接真实的即时通讯平台，接收的私信应被视为**不可信输入**。本指南帮助你配置安全策略。

## 核心安全原则

1. **默认拒绝**：所有未知来源的消息应被拒绝
2. **最小权限**：仅授予必要的权限
3. **本地运行**：数据保留在本地设备
4. **沙箱隔离**：非主会话使用沙箱运行

## DM 策略配置

### 配对模式（推荐）

配对模式要求未知发送者提供配对码，管理员批准后才能对话。

```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "pairing"
    },
    "discord": {
      "dm": {
        "policy": "pairing"
      }
    },
    "slack": {
      "dm": {
        "policy": "pairing"
      }
    }
  }
}
```

#### 配对流程

1. 未知用户发送消息给 OpenClaw
2. OpenClaw 返回配对码

审批后，用户被添加到本地允许列表：

```bash
openclaw pairing approve <channel> <code>
```

### 开放模式

仅在需要完全开放时使用，谨慎配置。

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

## 访问控制

### 允许列表

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+1234567890", "+0987654321"]
    }
  }
}
```

### 群组控制

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "group-id-1": {
          "requireMention": true
        }
      }
    }
  }
}
```

## 沙箱配置

### 主会话（直接对话）

默认情况下，主会话直接在主机上运行，拥有完整工具访问权限。

### 非主会话（群组/渠道）

对于群组和渠道会话，建议启用沙箱隔离。

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

### 沙箱工具策略

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "allowlist": ["bash", "process", "read", "write", "edit"],
        "denylist": ["browser", "canvas", "nodes", "cron"]
      }
    }
  }
}
```

## Docker 沙箱

### 使用 Docker 运行非主会话

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "docker"
      }
    }
  }
}
```

### Docker 配置

```bash
# 运行 Docker 沙箱
openclaw gateway --sandbox-docker
```

## 敏感操作保护

### 提升权限

对于需要提升权限的操作，使用 `/elevated` 命令：

```bash
/elevated on
/elevated off
```

### 确认机制

```json
{
  "agents": {
    "defaults": {
      "confirmCommands": ["bash", "process"]
    }
  }
}
```

## Tailscale 安全

### Serve 模式（推荐）

仅在 Tailnet 内可访问：

```json
{
  "gateway": {
    "tailscale": {
      "mode": "serve"
    }
  }
}
```

### Funnel 模式（需密码认证）

公开访问时必须启用密码认证：

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

## 安全检查

### 运行安全诊断

```bash
openclaw doctor --security
```

### 检查 DM 策略

```bash
openclaw doctor --dm-policy
```

### 查看允许列表

```bash
openclaw allowlist list
```

## 最佳实践

1. **始终使用配对模式**：默认配置，避免未授权访问
2. **最小化工具权限**：仅授予必要的工具
3. **定期审查日志**：监控异常活动
4. **保持更新**：使用最新版本获取安全修复
5. **使用强模型**：Claude Opus 4.5 提供更好的提示注入防护
6. **本地运行**：避免将网关暴露在公网

## 威胁模型

### 已知风险

- **提示注入**：恶意用户尝试通过消息注入指令
- **信息泄露**：敏感信息通过对话泄露
- **工具滥用**：通过对话调用危险工具

### 缓解措施

- 使用强模型（Anthropic Pro/Max）
- 启用沙箱隔离
- 严格控制访问列表
- 监控异常行为

## 资源

- [官方安全文档](https://docs.openclaw.ai/gateway/security)
- [安全最佳实践](https://docs.openclaw.ai/gateway/security)
- [GitHub 仓库](https://github.com/openclaw/openclaw)
- [Discord 社区](https://discord.gg/clawd)
