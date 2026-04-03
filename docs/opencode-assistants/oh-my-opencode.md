# oh-my-openagent (omo)

## 简介

**oh-my-openagent**（简称 **omo**，原名 oh-my-opencode）是 OpenCode 的终极增强插件，GitHub 星标数超过 47,000。它通过整合 11 个专业 AI 代理、提供强大的工具链和自动化能力，将 AI 编程体验提升到全新维度。

作为本项目 [OpenCode 助手](./index.md) 文档体系的核心组成部分，oh-my-openagent 与 [OpenCode 使用指南](../ai-assistants/opencode-usage.md)、[Claude Code 使用指南](../ai-assistants/claude-code-usage.md) 形成互补，配合 [OpenClaw](../openclaw/index.md) 等多渠道 AI 助手方案，为中文开发者提供完整的 AI 编程工具链。

## 主要升级

### 项目重命名

- **新名称**：oh-my-openagent (omo)
- **原名称**：oh-my-opencode
- 包名和二进制仍保持 `oh-my-opencode` 以兼容现有配置

### 星标增长

- 从 21,300 增长到 47,000+
- Fork 从 1,500 增长到 3,600+

### 版本迭代

- 当前版本：v3.14.0 (2026年3月)
- 重大版本：v3.0.0 带来全新架构

## 核心特性

### 11 个专业代理系统

采用团队化协作模式，模拟真实软件开发团队的工作方式：

#### 核心代理

| 代理 | 模型 | 职责 |
|------|------|------|
| **Sisyphus** | Claude Opus 4.6 | 默认编排器，任务规划和协调，Todo 驱动工作流 |
| **Hephaestus** | GPT-5.4 | "合法的工匠"，自主深度工作者，Goal-oriented 执行 |
| **Oracle** | GPT-5.4 | 架构决策、代码审查、调试，Read-only 咨询 |
| **Librarian** | MiniMax M2.7 | 多仓库分析、文档查找、OSS 实现示例 |
| **Explore** | Grok Code Fast | 快速代码库探索和上下文 grep |
| **Multimodal-Looker** | GPT-5.4 | 视觉内容专家，分析 PDF、图片、图表 |

#### 规划代理

| 代理 | 模型 | 职责 |
|------|------|------|
| **Prometheus** | Claude Opus 4.6 | 战略规划者，访谈模式创建详细工作计划 |
| **Metis** | Claude Opus 4.6 | 计划顾问，预分析识别隐藏意图和 AI 失败点 |
| **Momus** | GPT-5.4 | 计划审查者，验证计划清晰度、可验证性和完整性 |

#### 编排代理

| 代理 | 模型 | 职责 |
|------|------|------|
| **Atlas** | Claude Sonnet 4.6 | Todo 列表编排器，系统化执行计划任务 |
| **Sisyphus-Junior** | 类别决定 | 类别生成的执行器，根据任务类别自动选择模型 |

### Category 分类系统

针对不同任务类型优化的预设配置：

| Category | 默认模型 | 使用场景 |
|----------|----------|----------|
| `visual-engineering` | Gemini 3.1 Pro | 前端、UI/UX、设计、样式、动画 |
| `ultrabrain` | GPT-5.4 (xhigh) | 深度逻辑推理、复杂架构决策 |
| `deep` | GPT-5.4 (medium) | 目标导向的自主问题解决 |
| `artistry` | Gemini 3.1 Pro (high) | 高创意/艺术任务 |
| `quick` | GPT-5.4-mini | 简单任务 - 单文件修改、拼写修正 |
| `unspecified-low` | Claude Sonnet 4.6 | 低工作量任务 |
| `unspecified-high` | Claude Opus 4.6 (max) | 高工作量任务 |
| `writing` | Gemini 3.1 Flash | 文档、技术写作 |

### 后台并发任务 + Tmux 可视化

支持并行运行多个代理，显著提升开发效率：

```json
{
  "background_tasks": {
    "enabled": true,
    "max_concurrent": 3
  },
  "tmux": {
    "enabled": true,
    "layout": "main-vertical"
  }
}
```

启用 tmux 后，后台代理在独立窗格中运行，实时观察多代理工作。

### Session 恢复机制

自动从常见会话故障中恢复：

- 缺失工具结果重建
- Thinking block 违规恢复
- 空消息重建
- 上下文窗口限制处理（智能压缩）
- JSON 解析错误恢复

### 内置 MCP 服务

开箱即用的 MCP 集成：

- **websearch (Exa)** - 实时网络搜索
- **context7** - 官方文档查询
- **grep_app** - GitHub 超快代码搜索

### Skill 技能系统

#### 核心技能

- **git-master** - Git 专家，包含提交架构师、变基外科医生、历史考古学家
- **playwright** - 浏览器自动化
- **frontend-ui-ux** - 设计师转开发者，打造惊艳 UI/UX

### Commands 命令系统

内置命令：

- `/init-deep` - 初始化层级 AGENTS.md 知识库
- `/ralph-loop` - 自引用开发循环
- `/ulw-loop` - Ultrawork 循环
- `/refactor` - 智能重构
- `/start-work` - 从 Prometheus 计划开始执行
- `/handoff` - 创建会话上下文摘要

### 任务系统 (Task System)

实验性功能，支持任务依赖和并行执行：

```typescript
// 创建依赖任务
TaskCreate({ subject: "Build frontend" }); // T-001
TaskCreate({ subject: "Build backend" }); // T-002
TaskCreate({ subject: "Run tests", blockedBy: ["T-001", "T-002"] }); // T-003
```

### LSP 与 AST 工具

深度集成 LSP 和 AST-Grep，提供确定性的代码重构能力：

- 语义代码搜索
- 自动重命名重构
- 诊断与修复建议
- 跨文件代码转换
- Hashline 编辑（零陈旧行错误）

### Claude Code 兼容层

完全兼容 Claude Code 的所有功能：

- Command 命令系统
- Agent 代理模式
- Skill 技能机制
- MCP 协议支持
- Hook 钩子系统

## 安装与配置

### 快速安装

向你的 LLM 代理发送以下提示：

```
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/master/docs/guide/installation.md
```

### 手动安装

1. 安装插件：
```bash
oh-my-opencode install
```

2. 配置 OpenCode 插件列表，在 `~/.config/opencode/opencode.json` 中添加：
```json
{
  "plugin": ["oh-my-openagent"]
}
```

### 配置选项

oh-my-openagent 支持多级配置：

- **用户配置**：`~/.config/opencode/oh-my-openagent.json`
- **项目配置**：`.opencode/oh-my-openagent.json`

支持 JSONC 格式，允许注释和尾随逗号。过渡期内也支持 `oh-my-opencode.json`。

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

### 文件级提示

加载外部文件作为代理系统提示：

```json
{
  "agents": {
    "sisyphus": {
      "prompt": "file:///path/to/custom-prompt.md"
    }
  }
}
```

## 实际应用场景

### 场景一：大型代码库重构

Sisyphus 并行启动多个后台代理同时扫描代码库，结合 LSP 进行精确重构，一天内消除 8000+ ESLint 警告。

### 场景二：跨框架迁移

45k 行的 Tauri 应用在一夜之间迁移为 SaaS Web 应用，从访谈需求到上线原型全自动化。

### 场景三：复杂功能开发

开发者散步期间，代理自主完成下蹲动画等游戏功能开发，实现真正的异步协作。

## 与其他工具对比

| 特性 | Claude Code | Cursor | oh-my-openagent |
|------|-------------|--------|-----------------|
| 多模型编排 | 有限 | 有限 | 完整支持 (11 代理) |
| 后台任务 | 不支持 | 不支持 | 原生支持 + Tmux |
| Category 系统 | 无 | 无 | 8 种预设 |
| 任务系统 | 无 | 无 | 依赖 + 并行 |
| 会话恢复 | 基础 | 基础 | 智能自动恢复 |
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
2. 配置特定领域的 Category 分类
3. 调整 Hooks 定制行为
4. 添加自定义 Skill 和 MCP 服务

### 最佳实践

- 为不同任务选择合适的专业代理和 Category
- 利用后台任务并行处理独立子任务
- 善用 Librarian 进行文档和代码搜索
- 保持 TODO 列表清晰完整

## 相关资源

- [GitHub 仓库](https://github.com/code-yeongyu/oh-my-openagent)
- [官方文档](https://opencode.ai/docs/lsp/)
- [Sisyphus Labs](https://sisyphuslabs.ai)
- [Discord 社区](https://discord.gg/PUwSMR9XNk)

## 哲学思考

> "LLM Agents 与我们并无不同。他们能写出与我们一样出色的代码，提供一样出色的工作成果——只要你给他们出色的工具和可靠的队友。"

oh-my-openagent 代表了 AI 编程工具的未来方向：不是替代人类程序员，而是打造一个由 AI 代理组成的虚拟开发团队，让人类成为 AI 的管理者和监督者。

---

*最后更新：2026年4月*
