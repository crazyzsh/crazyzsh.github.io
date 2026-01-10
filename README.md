# OpenSpec

[![CI](https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg)](https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@fission-ai/openspec)](https://www.npmjs.com/package/@fission-ai/openspec)
[![node version](https://img.shields.io/node/v/@fission-ai/openspec)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](/Fission-AI/OpenSpec/blob/main/LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20the%20community-5865F2)](https://discord.gg/YctCnvvshC)

**Spec-driven development (SDD) for AI coding assistants.**

官网：[openspec.dev](https://openspec.dev/)

---

## 什么是 OpenSpec？

OpenSpec 是一种规范驱动开发方法，通过在编写代码之前先确定规范，使人类和 AI 编码助手能够达成一致。**无需 API 密钥。**

## 为什么选择 OpenSpec？

AI 编码助手功能强大，但当需求仅存在于聊天历史中时，结果往往不可预测。OpenSpec 添加了轻量级的工作流程，在实现之前锁定意图，提供确定性、可审查的输出。

核心优势：

- **共识优先**：人类和 AI 在工作开始前对规范达成一致
- **变更追踪**：提案、任务和规范变更共存，存档后合并回规范
- **透明可见**：清晰了解哪些内容正在提案、活跃或已归档
- **工具兼容**：与您已有的 AI 工具配合使用

## 工作流程

```
┌────────────────────┐
│ 1. 起草变更提案    │
│    (Draft Proposal)│
└────────┬───────────┘
         │ 与 AI 共享意图
         ▼
┌────────────────────┐
│ 2. 审查与对齐       │
│ (Review & Align)   │◀──── 反馈循环 ────┐
└────────┬───────────┘                    │
         │ 批准的方案                     │
         ▼                                │
┌────────────────────┐                    │
│ 3. 实现任务         │───────────────────┘
│ (Implement Tasks)  │   AI 编写代码
└────────┬───────────┘
         │ 发布变更
         ▼
┌────────────────────┐
│ 4. 存档并更新规范   │
│ (Archive & Update) │
└────────────────────┘
```

## 支持的 AI 工具

### 原生斜杠命令支持

| 工具 | 命令 |
|------|------|
| Amazon Q Developer | `@openspec-proposal`, `@openspec-apply`, `@openspec-archive` |
| Antigravity | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Augment CLI | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Claude Code | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` |
| CodeBuddy Code | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` |
| Codex | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| CoStrict | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Crush | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Cursor | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Factory Droid | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Gemini CLI | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` |
| GitHub Copilot | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| iFlow | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Kilo Code | `/openspec-proposal.md`, `/openspec-apply.md`, `/openspec-archive.md` |
| OpenCode | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Qoder | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` |
| Qwen Code | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| RooCode | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| Windsurf | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |

### AGENTS.md 兼容工具

这些工具会自动从 `openspec/AGENTS.md` 读取工作流程说明。

- Amp
- Jules
- 其他兼容 AGENTS.md 的工具

## 快速开始

### 前置要求

- **Node.js >= 20.19.0**

检查版本：
```bash
node --version
```

### 安装 CLI

```bash
npm install -g @fission-ai/openspec@latest
```

验证安装：
```bash
openspec --version
```

### 初始化项目

```bash
cd my-project
openspec init
```

初始化过程中：
- 选择您使用的 AI 工具（Claude Code、CodeBuddy、Cursor、OpenCode、Qoder 等）
- OpenSpec 会自动配置斜杠命令
- 在项目根目录创建 `openspec/` 目录结构

初始化完成后：
- 运行 `openspec list` 验证设置并查看活跃的变更
- 主要 AI 工具可以触发 `/openspec` 工作流程

### 可选：填充项目上下文

初始化完成后，运行提示的建议命令来填充项目上下文：

```
Please read openspec/project.md and help me fill it out with details about my project, tech stack, and conventions
```

使用 `openspec/project.md` 定义项目级约定、标准、架构模式等。

## 使用示例

### 1. 起草提案

```
你：Create an OpenSpec change proposal for adding profile search filters by role and team
    (有斜杠命令的工具快捷方式: /openspec:proposal Add profile search filters)

AI：I will create an OpenSpec change proposal for profile filters.
    *Scaffolds openspec/changes/add-profile-filters/ with proposal.md, tasks.md, spec deltas.*
```

### 2. 验证和审查

```bash
openspec list                              # 确认变更文件夹存在
openspec validate add-profile-filters      # 验证规范格式
openspec show add-profile-filters          # 审查提案、任务和规范变更
```

### 3. 完善规范

```
你：Can you add acceptance criteria for the role and team filters?

AI：I will update the spec delta with scenarios for role and team filters.
    *Edits openspec/changes/add-profile-filters/specs/profile/spec.md and tasks.md.*
```

### 4. 实现变更

规范满意后开始实现：

```
你：The specs look good. Let's implement this change.
    (有斜杠命令的工具快捷方式: /openspec:apply add-profile-filters)

AI：I will work through the tasks in the add-profile-filters change.
    *Implements tasks from openspec/changes/add-profile-filters/tasks.md*
```

### 5. 存档变更

实现完成后存档变更：

```bash
openspec archive add-profile-filters --yes  # 无提示存档
```

## 命令参考

| 命令 | 描述 |
|------|------|
| `openspec list` | 查看活跃的变更文件夹 |
| `openspec view` | 交互式仪表板，显示规范和变更 |
| `openspec show <change>` | 显示变更详情（提案、任务、规范更新） |
| `openspec validate <change>` | 检查规范格式和结构 |
| `openspec archive <change> [--yes/-y]` | 将完成的变更移至 archive/ |
| `openspec update` | 刷新代理指令，确保最新的斜杠命令生效 |

## 文件结构

```
openspec/
├── specs/                    # 当前规范（真实来源）
│   └── auth/
│       └── spec.md
└── changes/                  # 提案的变更
    └── add-2fa/
        ├── proposal.md       # 变更原因和内容
        ├── tasks.md          # 实现检查清单
        ├── design.md         # 技术决策（可选）
        └── specs/            # 规范增量
            └── auth/
                └── spec.md   # 显示新增内容
```

### 规范增量格式

增量是显示规范如何更改的"补丁"：

- **`## ADDED Requirements`** - 新功能
- **`## MODIFIED Requirements`** - 更改的行为
- **`## REMOVED Requirements`** - 弃用的功能

**格式要求：**
- 使用 `### Requirement: <name>` 作为标题
- 每个需求需要至少一个 `#### Scenario:` 块
- 在需求文本中使用 SHALL/MUST

## 与其他工具比较

### vs spec-kit

OpenSpec 的双文件夹模型（`openspec/specs/` 用于当前事实，`openspec/changes/` 用于提案更新）将状态和差异分开。spec-kit 对于新功能（0→1）很强，但为跨规范更新和演进功能提供的结构较少。

### vs Kiro.dev

OpenSpec 将功能的每个变更分组在一个文件夹中（`openspec/changes/feature-name/`），便于跟踪相关的规范、任务和设计。Kiro 将更新分散在多个规范文件夹中，可能使功能跟踪变得更加困难。

### vs 无规范

没有规范，AI 编码助手会从模糊的提示中生成代码，往往会遗漏需求或添加不需要的功能。OpenSpec 通过在编写任何代码之前就期望的行为达成一致来带来可预测性。

## 团队采用

1. **初始化 OpenSpec** - 在代码库中运行 `openspec init`
2. **从新功能开始** - 要求 AI 将即将进行的工作捕获为变更提案
3. **增量增长** - 每个变更都会存档到记录系统的活动规范中
4. **保持灵活性** - 不同的团队成员可以使用 Claude Code、CodeBuddy、Cursor 或任何 AGENTS.md 兼容工具，同时共享相同的规范

当有人切换工具时，运行 `openspec update` 以确保代理获取最新的说明和斜杠命令绑定。

## 更新 OpenSpec

1. **升级包**
   ```bash
   npm install -g @fission-ai/openspec@latest
   ```

2. **刷新代理指令**
   - 在每个项目中运行 `openspec update` 以重新生成 AI 指南，确保最新的斜杠命令处于活动状态

## 开发贡献

```bash
# 安装依赖
pnpm install

# 构建
pnpm run build

# 测试
pnpm test

# 本地开发 CLI
pnpm run dev
pnpm run dev:cli

# 提交规范
# type(scope): subject
```

## 许可证

MIT

## 统计

- **Stars**: 16k+
- **Forks**: 1.1k+
- **Contributors**: 24+
- **Commits**: 419+

## 链接

- [官网](https://openspec.dev/)
- [GitHub](https://github.com/Fission-AI/OpenSpec)
- [Discord](https://discord.gg/YctCnvvshC)
- [X (@0xTab)](https://x.com/0xTab)
