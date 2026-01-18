# OpenCode + MasterGo MCP 配置

## 概述

通过配置 MasterGo MCP 服务，OpenCode 可以直接读取 MasterGo 设计文件，提取 DSL 数据并生成代码。

## 前置条件

- OpenCode 已安装
- Node.js 环境（用于运行 MCP Server）
- MasterGo 团队版及以上账户
- MasterGo 个人访问令牌（MG_MCP_TOKEN）

## 获取 MG_MCP_TOKEN

1. 访问 [MasterGo](https://mastergo.com)
2. 进入 **个人设置** → **安全设置**
3. 在「个人访问令牌」区域点击「生成令牌」
4. 复制并保存令牌

## 配置步骤

### 1. 添加配置文件

在项目 `.opencode/` 目录下创建 `opencode.jsonc`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "mastergo": {
      "type": "local",
      "command": ["npx", "-y", "@mastergo/magic-mcp"],
      "enabled": true,
      "environment": {
        "MG_MCP_TOKEN": "{env:MG_MCP_TOKEN}",
        "API_BASE_URL": "https://mastergo.com"
      }
    }
  }
}
```

### 2. 设置环境变量

```bash
# macOS/Linux
export MG_MCP_TOKEN="mg_xxxxxxxxxxxxx"

# Windows
set MG_MCP_TOKEN=mg_xxxxxxxxxxxxx
```

或直接在终端启动 OpenCode 时设置：

```bash
MG_MCP_TOKEN=mg_xxxxxxxxxxxxx opencode
```

### 3. 验证配置

启动 OpenCode 后，输入以下命令验证 MCP 是否正常工作：

```
使用 mastergo 工具获取 https://mastergo.com 的文件信息
```

## 使用方法

### 读取设计文件

```
读取 https://mastergo.com/file/xxx 的设计数据
```

### 生成组件代码

```
读取这个按钮组件，生成 React 组件代码
https://mastergo.com/file/xxx?page_id=xxx
```

### 分析设计规范

```
分析这个文件的颜色、字体、间距规范
https://mastergo.com/file/xxx
```

## 可用工具

| 工具 | 功能 |
|------|------|
| `get_dsl` | 获取设计文件的 DSL 数据 |
| `get_meta` | 获取文件元数据 |
| `get_component_link` | 获取组件文档链接 |
| `get_component_workflow` | 生成组件开发工作流 |

## 注意事项

- 文件必须放在**团队项目**中，草稿箱文件无法访问
- 需要**团队版及以上** MasterGo 账户
- MCP 工具会增加上下文 token 消耗，建议按需启用
- 首次使用需确保 Node.js 已安装（用于运行 npx）

## 常见问题

### 无权限访问

确保：
1. MasterGo 账户为团队版及以上
2. 文件位于团队项目中，非草稿箱

### Token 失效

重新生成 MG_MCP_TOKEN：
1. 进入 MasterGo 个人设置 → 安全设置
2. 删除旧令牌
3. 生成新令牌并更新环境变量

### MCP 连接失败

检查：
1. Node.js 是否正确安装（`node -v`）
2. 网络连接是否正常
3. 环境变量是否正确设置

## 相关资源

- [MasterGo MCP 官方文档](https://github.com/mastergo-design/mastergo-magic-mcp)
- [OpenCode MCP 配置文档](https://opencode.ai/docs/mcp-servers)
- [MasterGo 帮助中心](https://mastergo.com/help/MG/MCP)
