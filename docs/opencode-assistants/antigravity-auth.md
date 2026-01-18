# opencode-antigravity-auth

Enable Opencode to authenticate against Antigravity (Google's IDE) via OAuth
so you can use Antigravity rate limits and access models like
`gemini-3-pro` and `claude-opus-4-5-thinking` with your Google credentials.

## 核心功能

- **Claude Opus 4.5, Sonnet 4.5** 和 **Gemini 3 Pro/Flash** 通过 Google OAuth 访问
- **多账户支持** — 添加多个 Google 账户，当一个被限流时自动切换
- **双配额系统** — 同时访问 Antigravity 和 Gemini CLI 配额
- **思考模型** — Claude 和 Gemini 3 的扩展思考，可配置预算
- **Google Search 基础** — 为 Gemini 模型启用网络搜索
- **自动恢复** — 自动处理会话错误和工具故障

## 安装

### 方式一：让 LLM 自动完成

将以下提示复制到任何 LLM agent（Claude Code, OpenCode, Cursor 等）：

```text
Install the opencode-antigravity-auth plugin and add the Antigravity model
definitions to ~/.config/opencode/opencode.json by following:
https://raw.githubusercontent.com/NoeFabris/opencode-antigravity-auth/dev/README.md
```

### 方式二：手动安装

1. 在 `~/.config/opencode/opencode.json` 中添加插件：

   ```json
   {
     "plugin": ["opencode-antigravity-auth@latest"]
   }
   ```

   > 想使用最新功能？使用 `opencode-antigravity-auth@beta`

2. 登录 Google 账户：

   ```bash
   opencode auth login
   ```

3. 添加模型配置（见下方完整配置）

4. 使用模型：

   ```bash
   opencode run "Hello" --model=google/antigravity-claude-sonnet-4-5-thinking --variant=max
   ```

## 模型列表

### Antigravity 配额（Claude + Gemini 3）

| 模型 | 变体 | 说明 |
| :--- | :--- | :--- |
| `antigravity-gemini-3-pro` | low, high | 带思考的 Gemini 3 Pro |
| `antigravity-gemini-3-flash` | minimal, low, medium, high | 带思考的 Gemini 3 Flash |
| `antigravity-claude-sonnet-4-5` | — | Claude Sonnet 4.5 |
| `antigravity-claude-sonnet-4-5-thinking` | low, max | 带扩展思考的 Claude Sonnet |
| `antigravity-claude-opus-4-5-thinking` | low, max | 带扩展思考的 Claude Opus |

### Gemini CLI 配额（独立于 Antigravity）

| 模型 | 说明 |
| :--- | :--- |
| `gemini-2.5-flash` | Gemini 2.5 Flash |
| `gemini-2.5-pro` | Gemini 2.5 Pro |
| `gemini-3-flash-preview` | Gemini 3 Flash（预览版） |
| `gemini-3-pro-preview` | Gemini 3 Pro（预览版） |

## 完整模型配置

将以下配置添加到 `~/.config/opencode/opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-antigravity-auth@latest"],
  "provider": {
    "google": {
      "models": {
        "antigravity-gemini-3-pro": {
          "name": "Gemini 3 Pro (Antigravity)",
          "limit": { "context": 1048576, "output": 65535 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] },
          "variants": {
            "low": { "thinkingLevel": "low" },
            "high": { "thinkingLevel": "high" }
          }
        },
        "antigravity-gemini-3-flash": {
          "name": "Gemini 3 Flash (Antigravity)",
          "limit": { "context": 1048576, "output": 65536 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] },
          "variants": {
            "minimal": { "thinkingLevel": "minimal" },
            "low": { "thinkingLevel": "low" },
            "medium": { "thinkingLevel": "medium" },
            "high": { "thinkingLevel": "high" }
          }
        },
        "antigravity-claude-sonnet-4-5": {
          "name": "Claude Sonnet 4.5 (Antigravity)",
          "limit": { "context": 200000, "output": 64000 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] }
        },
        "antigravity-claude-sonnet-4-5-thinking": {
          "name": "Claude Sonnet 4.5 Thinking (Antigravity)",
          "limit": { "context": 200000, "output": 64000 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] },
          "variants": {
            "low": { "thinkingConfig": { "thinkingBudget": 8192 } },
            "max": { "thinkingConfig": { "thinkingBudget": 32768 } }
          }
        },
        "antigravity-claude-opus-4-5-thinking": {
          "name": "Claude Opus 4.5 Thinking (Antigravity)",
          "limit": { "context": 200000, "output": 64000 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] },
          "variants": {
            "low": { "thinkingConfig": { "thinkingBudget": 8192 } },
            "max": { "thinkingConfig": { "thinkingBudget": 32768 } }
          }
        },
        "gemini-2.5-flash": {
          "name": "Gemini 2.5 Flash (Gemini CLI)",
          "limit": { "context": 1048576, "output": 65536 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] }
        },
        "gemini-2.5-pro": {
          "name": "Gemini 2.5 Pro (Gemini CLI)",
          "limit": { "context": 1048576, "output": 65536 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] }
        },
        "gemini-3-flash-preview": {
          "name": "Gemini 3 Flash Preview (Gemini CLI)",
          "limit": { "context": 1048576, "output": 65536 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] }
        },
        "gemini-3-pro-preview": {
          "name": "Gemini 3 Pro Preview (Gemini CLI)",
          "limit": { "context": 1048576, "output": 65535 },
          "modalities": { "input": ["text", "image", "pdf"], "output": ["text"] }
        }
      }
    }
  }
}
```

## 多账户设置

添加多个 Google 账户以获得更高的综合配额。当一个账户被限流时，
插件会自动切换：

```bash
opencode auth login  # 再次运行以添加更多账户
```

## 架构概览

```text
┌─────────────────────────────────────────────────────────────────┐
│  OpenCode ──▶ Plugin ──▶ Antigravity API ──▶ Claude/Gemini      │
│     │           │              │                   │            │
│     │           │              │                   └─ 模型     │
│     │           │              └─ Google 的网关 (Gemini 格式)   │
│     │           └─ 当前插件 (认证, 转换, 恢复)                   │
│     └─ AI 编程助手                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 核心模块

```text
src/
├── index.ts                 # 插件导出
├── plugin.ts                # 主入口, fetch 拦截器
├── constants.ts             # 端点, 头, 配置
└── antigravity/
│   └── oauth.ts             # OAuth token 交换
└── plugin/
    ├── auth.ts              # Token 验证和刷新
    ├── request.ts           # 请求转换（主逻辑）
    ├── request-helpers.ts   # Schema 清理, 思考过滤
    ├── thinking-recovery.ts # 回合边界检测, 崩溃恢复
    ├── recovery.ts          # 会话恢复 (tool_result_missing)
    ├── cache.ts             # 认证和签名缓存
    ├── cache/
    │   └── signature-cache.ts # 基于磁盘的签名持久化
    ├── config/
    │   ├── schema.ts        # Zod 配置 Schema
    │   └── loader.ts        # 配置文件加载
    ├── accounts.ts          # 多账户管理
    ├── server.ts            # OAuth 回调服务器
    └── debug.ts             # 调试日志
```

### 请求流程

1. **拦截** (`plugin.ts`) - `fetch()` 被拦截，检测是否为 generativelanguage 请求
2. **账户选择** - 轮询或粘性选择，考虑限流
3. **Token 刷新** - 如果过期则刷新
4. **请求转换** (`request.ts`)
   - 模型检测（Claude/Gemini）
   - 添加 thinkingConfig
   - 移除所有 thinking blocks
   - 工具规范化
   - Schema 清理
5. **响应转换** - SSE 流式处理，签名缓存，格式转换

## 常见问题

### 快速重置

大多数问题可以通过删除 `~/.config/opencode/antigravity-accounts.json`
并重新运行 `opencode auth login` 来解决。

### OAuth 回调问题

#### Safari OAuth 回调失败（macOS）

- Safari 的 "HTTPS-Only Mode" 阻止 `http://localhost` 回调
- 解决方案：使用 Chrome 或 Firefox，或临时禁用 HTTPS-Only Mode

#### 端口冲突

```bash
# macOS / Linux
lsof -i :51121
kill -9 <PID>
opencode auth login
```

### 403 Permission Denied

错误：

```text
Permission 'cloudaicompanion.companions.generateChat' denied
```

解决方案：

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建或选择项目
3. 启用 **Gemini for Google Cloud API**
4. 在账户文件中添加 `projectId`

### Gemini 3 400 错误 ("Unknown name 'parameters'")

原因：工具 Schema 与 Gemini 的严格 protobuf 验证不兼容

解决方案：

1. 更新到最新 beta 版本
2. 逐一禁用 MCP 服务器以找到问题所在
3. 添加 npm override

### 所有账户被限流（但配额可用）

原因：`clearExpiredRateLimits()` 中的级联 bug

解决方案：

1. 更新到最新 beta 版本
2. 如果仍然存在，删除账户文件并重新认证
3. 尝试将 `account_selection_strategy` 切换为 `"sticky"`

## 配置选项

创建 `~/.config/opencode/antigravity.json`：

```json
{
  "$schema": "https://raw.githubusercontent.com/NoeFabris/opencode-antigravity-auth/main/assets/antigravity.schema.json",
  "session_recovery": true,
  "auto_update": true,
  "debug": false,
  "quiet_mode": false,
  "keep_thinking": false,
  "account_selection_strategy": "hybrid",
  "web_search": {
    "default_mode": "off"
  }
}
```

### 环境变量

```bash
OPENCODE_ANTIGRAVITY_DEBUG=1 opencode   # 启用调试日志
OPENCODE_ANTIGRAVITY_DEBUG=2 opencode   # 详细日志
```

## 插件兼容性

### @tarquinen/opencode-dcp

DCP 创建的助手消息缺少 thinking blocks。**将 DCP 放在后面**：

```json
{
  "plugin": [
    "opencode-antigravity-auth@latest",
    "@tarquinen/opencode-dcp@latest"
  ]
}
```

### oh-my-opencode

禁用内置 Google auth 并覆盖 agent 模型：

```json
{
  "google_auth": false,
  "agents": {
    "frontend-ui-ux-engineer": { "model": "google/antigravity-gemini-3-pro" },
    "document-writer": { "model": "google/antigravity-gemini-3-flash" }
  }
}
```

## 相关文档

- [Configuration](https://github.com/NoeFabris/opencode-antigravity-auth/blob/main/docs/CONFIGURATION.md)
  — 所有配置选项
- [Multi-Account](https://github.com/NoeFabris/opencode-antigravity-auth/blob/main/docs/MULTI-ACCOUNT.md)
  — 负载均衡，双配额池，账户存储
- [Model Variants](https://github.com/NoeFabris/opencode-antigravity-auth/blob/main/docs/MODEL-VARIANTS.md)
  — 思考预算和变体系统
- [Troubleshooting](https://github.com/NoeFabris/opencode-antigravity-auth/blob/main/docs/TROUBLESHOOTING.md)
  — 常见问题和解决方案
- [Architecture](https://github.com/NoeFabris/opencode-antigravity-auth/blob/main/docs/ARCHITECTURE.md)
  — 插件工作原理

## 许可证

MIT License

## 注意事项

- **服务条款风险** — 此方法可能违反 AI 模型提供商的服务条款
- **账户风险** — 提供商可能会暂停或封禁账户
- **无保证** — API 可能在未经通知的情况下更改
- **风险自担** — 您承担所有法律、财务和技术风险

> 此插件与 Google 无关。"Antigravity"、"Gemini"、"Google Cloud" 和
> "Google" 是 Google LLC 的商标。

## 项目信息

- **Stars:** 3.9k
- **Forks:** 280
- **最新版本:** v1.3.0
- **主要语言:** TypeScript (98.3%)
- **NPM:** [opencode-antigravity-auth](https://www.npmjs.com/package/opencode-antigravity-auth)
