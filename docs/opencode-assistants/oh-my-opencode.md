# oh-my-opencode

## 简介

**oh-my-opencode** 是 OpenCode 的终极增强插件，被誉为"Agent Harness 的天花板"。它通过整合多个专业 AI 代理、提供强大的工具链和自动化能力，将你的 AI 编程体验提升到一个全新的维度。

这个项目由 Sisyphus Labs 开发维护，GitHub 星标数超过 21,300，拥有 1,500+ Fork，是一个在 AI 开发工具领域备受关注的开源项目。

## 核心特性

### 多代理编排系统

oh-my-opencode 采用团队化协作模式，模拟真实软件开发团队的工作方式：

- **Sisyphus** - 主代理 (Opus 4.5 High)：负责整体任务规划和协调
- **Prometheus** - 规划代理：负责制定详细的任务计划
- **Oracle** - 架构与调试代理 (GPT 5.2 Medium)：处理设计和调试任务
- **Frontend Engineer** - 前端代理 (Gemini 3 Pro)：专注 UI/UX 开发
- **Librarian** - 文档代理 (Claude Sonnet 4.5)：搜索文档和代码库
- **Explore** - 探索代理 (Grok Code)：快速代码库探索

### 后台并发任务

支持并行运行多个代理，显著提升开发效率：

```json
{
  "background_tasks": {
    "enabled": true,
    "max_concurrent": 3,
    "providers": {
      "openai": { "gpt-4o": 2, "gpt-4o-mini": 3 },
      "anthropic": { "sonnet-4-5": 2 }
    }
  }
}
```

### LSP 与 AST 工具

深度集成 LSP 和 AST-Grep，提供确定性的代码重构能力：

- 语义代码搜索
- 自动重命名重构
- 诊断与修复建议
- 跨文件代码转换

### Claude Code 兼容层

完全兼容 Claude Code 的所有功能：

- Command 命令系统
- Agent 代理模式
- Skill 技能机制
- MCP 协议支持
- Hook 钩子系统

### 内置 MCP 服务

开箱即用的 MCP 集成：

- **websearch (Exa)** - 网络搜索
- **context7** - 官方文档查询
- **grep_app** - GitHub 代码搜索

## 安装与配置

### 快速安装

向你的 LLM 代理发送以下提示：

```
Install and configure oh-my-opencode by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/refs/heads/master/docs/guide/installation.md
```

### 手动安装

1. 安装插件：
```bash
oh-my-opencode install
```

2. 配置 OpenCode 插件列表，在 `~/.config/opencode/opencode.json` 中添加：
```json
{
  "plugin": ["oh-my-opencode"]
}
```

### 配置选项

oh-my-opencode 支持多级配置：

- **用户配置**：`~/.config/opencode/oh-my-opencode.json`
- **项目配置**：`.opencode/oh-my-opencode.json`

支持 JSONC 格式，允许注释和尾随逗号。

## 核心概念

### Ultrawork 模式

在任务提示中包含 `ultrawork` 或 `ulw` 关键词，激活全部高级功能：

- 并行代理执行
- 后台任务处理
- 深度探索模式
- 强制任务完成

### Todo 强制执行

Sisyphus 代理受 TODO 列表约束，确保任务 100% 完成，不会半途而废。

### 评论检查器

防止 AI 生成过多注释，保持代码整洁，可读性接近人工编写。

## 实际应用场景

### 场景一：大型代码库重构

Sisyphus 并行启动多个后台代理同时扫描代码库，结合 LSP 进行精确重构，一天内消除 8000+ ESLint 警告。

### 场景二：跨框架迁移

45k 行的 Tauri 应用在一夜之间迁移为 SaaS Web 应用，从访谈需求到上线原型全自动化。

### 场景三：复杂功能开发

开发者散步期间，代理自主完成下蹲动画等游戏功能开发，实现真正的异步协作。

## 与其他工具对比

| 特性 | Claude Code | Cursor | oh-my-opencode |
|------|-------------|--------|----------------|
| 多模型编排 | 有限 | 有限 | 完整支持 |
| 后台任务 | 不支持 | 不支持 | 原生支持 |
| LSP 集成 | 基础 | 基础 | 深度集成 |
| 插件生态 | 有限 | 有限 | 高度可扩展 |
| Claude 兼容 | 完全 | 部分 | 完整兼容 |

## 使用建议

### 新手入门

1. 直接使用 `ultrawork` 关键词激活全部功能
2. 让代理自动处理配置和优化
3. 逐步了解各专业代理的特长

### 进阶定制

1. 覆盖默认模型和温度参数
2. 配置特定领域的任务分类
3. 调整 Hooks 定制行为
4. 添加自定义 MCP 服务

### 最佳实践

- 为不同任务选择合适的专业代理
- 利用后台任务并行处理独立子任务
- 善用 Librarian 进行文档和代码搜索
- 保持 TODO 列表清晰完整

## 卸载方法

如需移除 oh-my-opencode：

1. 从 `opencode.json` 插件列表中移除
2. 删除用户配置文件：`~/.config/opencode/oh-my-opencode.json`
3. 删除项目配置：`.opencode/oh-my-opencode.json`

## 相关资源

- [GitHub 仓库](https://github.com/code-yeongyu/oh-my-opencode)
- [官方文档](https://opencode.ai/docs/lsp/)
- [Sisyphus Labs](https://sisyphuslabs.ai)
- [Discord 社区](https://discord.gg/PUwSMR9XNk)

## 哲学思考

> "LLM Agents 与我们并无不同。他们能写出与我们一样出色的代码，提供一样出色的工作成果——只要你给他们出色的工具和可靠的队友。"

oh-my-opencode 代表了 AI 编程工具的未来方向：不是替代人类程序员，而是打造一个由 AI 代理组成的虚拟开发团队，让人类成为 AI 的管理者和监督者。

---

*最后更新：2026年1月*
