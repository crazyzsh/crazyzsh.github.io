# AntV Infographic 使用指南

AntV Infographic 是 AntV 团队开发的新一代声明式信息图表可视化引擎。通过精心设计的信息图表语法，可以快速灵活地渲染高质量的信息图表，使信息展示更高效，数据叙事更简单。

## 核心特性

- **AI 友好**：配置和语法针对 AI 生成进行了优化，提供简洁的提示词，支持 AI 流式输出和渲染
- **开箱即用**：内置约 200 个信息图表模板、数据项组件和布局，可快速构建专业的信息图表
- **主题系统**：支持手绘、渐变、图案等多种预设主题，并支持深度定制
- **内置编辑器**：包含信息图表编辑器，可对 AI 生成的结果进行进一步编辑
- **高质量 SVG 输出**：默认使用 SVG 渲染，确保视觉保真度和易于编辑

## 使用场景分析

### 1. 在线编辑与导出创作

**Live Editor** ([https://infographic.antv.vision/editor](https://infographic.antv.vision/editor)) 提供完整的在线编辑能力：

- **实时预览**：编辑语法即可看到即时渲染效果
- **模板选择**：内置多种模板和主题预设
- **多格式导出**：支持 PNG 和 SVG 两种导出格式
- **分享功能**：生成的语法配置可通过链接分享
- **无开发门槛**：无需编写代码，通过界面操作即可完成信息图表设计

### 2. AI 智能生成

**AI Infographic** ([https://infographic.antv.vision/ai](https://infographic.antv.vision/ai)) 支持自然语言生成：

- **文本转图表**：粘贴文章、报告或业务描述，AI 自动理解并生成图表方案
- **流式渲染**：AI 生成过程中实时显示渲染进度
- **生成历史**：记录历史生成内容，支持回溯和复用
- **示例模板**：内置产品生命周期管理、客户价值分割、市场扩张等场景示例
- **智能配置**：可指定图表类型、数据源、色板和样式优化生成效果

### 3. 模板库与设计资源

**Gallery** ([https://infographic.antv.vision/gallery](https://infographic.antv.vision/gallery)) 包含 219 个精选模板：

| 分类       | 说明                             |
| ---------- | -------------------------------- |
| Chart      | 柱状图、折线图、饼图、词云等     |
| Comparison | 二元对比、SWOT 分析、层次对比等  |
| Hierarchy  | 思维导图、组织结构图、层次树等   |
| List       | 列表、网格、金字塔、蛇形布局等   |
| Quadrant   | 象限分析、四象限图等             |
| Relation   | 关系图、环形关系图等             |
| Sequence   | 时间线、流程图、阶梯图、路线图等 |

### 4. 代码集成与程序化使用

支持多种技术栈集成：

| 集成方式     | 说明                                        |
| ------------ | ------------------------------------------- |
| **NPM 包**   | `npm install @antv/infographic`             |
| **CDN 引入** | 通过 unpkg 直接在 HTML 中使用               |
| **React**    | 使用 useEffect 创建实例并挂载到 ref         |
| **Vue 3**    | 使用 onMounted/onBeforeUnmount 管理生命周期 |
| **JSX**      | 支持声明式 JSX 语法编写                     |
| **API**      | 提供完整的 Infographic API                  |

### 5. 版本管理与发布

- **NPM 版本管理**：当前稳定版本 v0.2.7，通过 npm 进行版本控制
- **GitHub 开源**：完整源码托管于 [https://github.com/antvis/infographic](https://github.com/antvis/infographic)
- **发布订阅**：通过 GitHub Releases 发布版本更新
- **变更追踪**：所有版本更新可在 GitHub Releases 页面查看
- **许可证**：MIT 许可证，自由使用和分发

### 6. AI Agent 技能集成

提供 Claude Code 和 Codex 两大 AI 平台的技能集成：

| 技能名称                          | 功能说明                     |
| --------------------------------- | ---------------------------- |
| **infographic-creator**           | 创建渲染信息图表的 HTML 文件 |
| **infographic-syntax-creator**    | 从自然语言描述生成语法       |
| **infographic-structure-creator** | 生成自定义结构设计           |
| **infographic-item-creator**      | 生成自定义数据项设计         |
| **infographic-template-updater**  | 更新模板库（面向开发者）     |

### 7. 自定义设计能力

支持深度定制以满足品牌需求：

- **自定义结构**：定义图表的整体布局结构
- **自定义数据项**：创建特定类型的数据展示组件
- **自定义模板**：基于内置模板进行二次开发
- **自定义主题**：配置颜色、字体、图案等视觉元素
- **自定义色板**：定义品牌配色方案
- **自定义字体**：指定使用的字体资源
- **自定义图案**：设计背景和装饰图案
- **自定义资源加载器**：实现外部资源的加载逻辑

## 安装

```bash
npm install @antv/infographic
```

## 快速开始

```ts
import { Infographic } from "@antv/infographic";

const infographic = new Infographic({
  container: "#container",
  width: "100%",
  height: "100%",
  editable: true,
});

infographic.render(`
infographic list-row-simple-horizontal-arrow
data
  items
    - label Step 1
      desc Start
    - label Step 2
      desc In Progress
    - label Step 3
      desc Complete
`);
```

## 流式渲染

AntV Infographic 采用高度容错的信息图表语法，可以实时流式输出 AI 内容并逐步渲染信息图表：

```ts
let buffer = "";
for (const chunk of chunks) {
  buffer += chunk;
  infographic.render(buffer);
}
```

## 与 AI 交互的方式

AntV Infographic 提供多种与 AI 交互的途径，满足不同用户需求。

### 1. AI Infographic 在线工具

访问 [https://infographic.antv.vision/ai](https://infographic.antv.vision/ai) 直接使用：

**使用步骤：**
1. 在输入框中粘贴文章、报告或业务描述
2. 点击生成或按 `⌘/Ctrl + ↵`
3. AI 自动分析内容并生成信息图表方案
4. 查看预览效果，支持 PNG 图片导出、复制语法、在编辑器中打开

**内置示例场景：**
- 🎯 产品生命周期管理
- 💰 客户价值分割
- 🌍 全球市场扩张

**高级配置：**
- 指定图表类型
- 提供数据源
- 配置色板和样式偏好

### 2. Claude Code 集成

Claude Code 是 Claude 的 CLI 工具，支持安装 AntV Infographic 技能。

**安装步骤：**

```bash
set -e

VERSION=0.2.4 # 替换为最新的标签版本
BASE_URL=https://github.com/antvis/Infographic/releases/download
mkdir -p .claude/skills

curl -L --fail -o skills.zip "$BASE_URL/$VERSION/skills.zip"
unzip -q -o skills.zip -d .claude/skills
rm -f skills.zip
```

**可用技能：**
- `infographic-creator`：根据描述创建 HTML 文件渲染图表
- `infographic-syntax-creator`：生成 AntV Infographic 语法
- `infographic-structure-creator`：设计自定义结构
- `infographic-item-creator`：设计自定义数据项
- `infographic-template-updater`：更新模板库

**使用示例：**
```
/claude @infographic-creator 创建一个产品发布流程的信息图表
```

### 3. Codex 集成

Codex 是 OpenAI 的代码助手平台。

**安装技能：**
```codex
$skill-installer install https://github.com/antvis/Infographic/tree/main/.skills/infographic-creator
```

### 4. 自定义 AI 集成提示词

如果需要将 AntV Infographic 集成到其他 AI 系统，可以使用以下提示词模板：

#### 系统角色提示词

```markdown
## Role

You are an expert in infographic generation, mastering the core concepts of AntV Infographic and familiar with the syntax of AntV Infographic.

## Task

Based on the given text content, combine with the AntV Infographic Syntax specification, output the structured information graph and corresponding AntV Infographic syntax. You need to:

1. Extract key information structure (title, description, items, etc)
2. Select an appropriate template and theme
3. Use the AntV Infographic Syntax to describe the content for real-time streaming rendering
```

#### 输出格式要求

```markdown
Always use AntV Infographic Syntax plain text, wrapped in ```plain code block, no explanatory text.

```plain
infographic list-row-horizontal-icon-arrow
data
  title 标题
  desc 描述
  items
    - label 标签
      value 12.5
      desc 说明
      icon mdi/rocket-launch
theme
  palette #3b82f6 #8b5cf6 #f97316
```
```

#### 语法规范要点

- 第一行以 `infographic <template-name>` 开头
- 使用两个空格缩进表示层级
- 键值对使用 `key value` 格式，数组使用 `-` 开头
- 图标使用关键词或图标名称，如 `mdi/chart-line`
- data 包含 title/desc/items（可根据语义省略）
- data.items 包含 label/value/desc/icon/children
- 对比模板使用两个根节点，每个对比项作为子节点
- 可通过 theme 切换配色或深浅主题
- 禁止输出 JSON、Markdown 或解释性文字

#### 可用模板列表

| 模板类型 | 示例模板 |
|---------|---------|
| 序列图 | sequence-zigzag-steps, sequence-horizontal-zigzag, sequence-circular-simple |
| 对比图 | compare-binary-horizontal, compare-swot, compare-hierarchy |
| 象限图 | quadrant-quarter-simple-card, quadrant-quarter-circular |
| 列表图 | list-grid-badge-card, list-row-horizontal-icon-arrow |
| 关系图 | relation-circle-icon-badge |
| 图表 | chart-column-simple, chart-bar-plain-text, chart-pie-donut |
| 层级图 | hierarchy-tree-tech-style, hierarchy-tree-curved-line |

#### 完整示例

**输入：**
```
互联网技术发展历程，从 Web 1.0 到 AI 时代的关键里程碑
```

**AI 输出：**
```plain
infographic list-row-horizontal-icon-arrow
data
  title 互联网技术发展
  desc 从 Web 1.0 到 AI 时代的关键里程碑
  items
    - time 1991
      label Web 1.0
      desc Tim Berners-Lee 发布第一个网站，开启互联网时代
      icon mdi/web
    - time 2004
      label Web 2.0
      desc 社交媒体和用户生成内容成为主流
      icon mdi/account-multiple
    - time 2007
      label 移动互联网
      desc iPhone 发布，智能手机改变世界
      icon mdi/cellphone
    - time 2015
      label 云原生
      desc 容器化和微服务架构广泛应用
      icon mdi/cloud
    - time 2023
      label AI 大模型
      desc ChatGPT 引发生成式 AI 革命
      icon mdi/brain
theme
  palette #3b82f6 #8b5cf6 #f97316 #10b981 #ec4899
```

### 5. 流式渲染集成

与支持流式输出的 AI 服务集成时，可以实时渲染：

```ts
const infographic = new Infographic({
  container: '#container',
  width: '100%',
  height: '100%',
});

let buffer = '';
for await (const chunk of streamAIResponse(prompt)) {
  buffer += chunk;
  infographic.render(buffer);
}
```

## 官方资源

- **官网**：[https://infographic.antv.vision](https://infographic.antv.vision)
- **文档**：[https://infographic.antv.vision/learn](https://infographic.antv.vision/learn)
- **示例画廊**：[https://infographic.antv.vision/gallery](https://infographic.antv.vision/gallery)
- **在线编辑器**：[https://infographic.antv.vision/editor](https://infographic.antv.vision/editor)
- **AI 生成**：[https://infographic.antv.vision/ai](https://infographic.antv.vision/ai)
- **GitHub**：[https://github.com/antvis/infographic](https://github.com/antvis/infographic)
- **图标库**：[https://infographic.antv.vision/icon](https://infographic.antv.vision/icon)
- **API 参考**：[https://infographic.antv.vision/reference](https://infographic.antv.vision/reference)

## 相关提示词

参考项目提供的 [prompt.md](https://github.com/antvis/Infographic/blob/main/prompt.md) 获取更多 AI 提示词示例。

## 许可证

本项目基于 MIT 许可证开源。
