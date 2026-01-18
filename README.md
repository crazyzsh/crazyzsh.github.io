# AI 学习资料项目

系统化整理 AI 学习资源与实践文档，涵盖 AI 助手、工具平台、技术架构等领域。

## 技术栈

| 技术 | 用途 | 文档 |
|------|------|------|
| **VitePress** | 静态站点生成器 | [官方文档](https://vitepress.dev/) |
| **Vue 3** | 前端框架 | [官方文档](https://vuejs.org/) |
| **Node.js** | 运行时环境 | [官方文档](https://nodejs.org/) |
| **OpenCode** | AI 编程助手 | [文档](./docs/opencode-assistants/) |
| **MasterGo MCP** | 设计稿读取集成 | [配置说明](./docs/opencode-assistants/mastergo-mcp.md) |
| **GitHub Pages** | 静态托管 | [官方文档](https://pages.github.com/) |

## 核心功能

### 文档系统

- **VitePress 静态生成**：基于 Markdown 的文档站点
- **动态导航配置**：自动扫描目录生成侧边栏和导航栏
- **Git Hook 自动更新**：新增文档时自动更新目录索引

### AI 助手集成

- **OpenCode**：主 AI 编程助手
- **Claude Code**：辅助 AI 工具
- **MasterGo MCP**：设计稿转代码能力

### 开发工具

- **ESLint/Prettier**：代码格式化
- **markdownlint**：文档规范检查
- **Git Hooks**：提交前自动化检查

## 项目结构

```
my-ai-learning-books/
├── docs/                    # 文档源文件
│   ├── .vitepress/         # VitePress 配置
│   │   └── config.mjs      # 动态生成导航和侧边栏
│   ├── ai-assistants/      # AI 助手文档
│   ├── tools-platform/     # 工具平台文档
│   ├── data-visualization/ # 数据可视化文档
│   ├── tech-architecture/  # 技术架构文档
│   ├── investment-analysis/# 投资分析文档
│   ├── opencode-assistants/# OpenCode 助手文档
│   └── index.md            # 首页（动态生成）
├── scripts/
│   └── generate-home.mjs   # 首页动态生成脚本
├── .opencode/
│   └── opencode.jsonc      # OpenCode 配置（含 MCP）
├── .git/
│   └── hooks/
│       └── pre-commit      # 自动更新目录索引
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
# 实时预览（热更新）
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

### 添加新文档

```bash
# 在对应分类目录下创建文档
mkdir docs/new-category
echo "# 新文档标题" > docs/new-category/new-doc.md

# 提交后自动更新目录索引
git add .
git commit -m "docs: 添加新文档"
```

## 配置说明

### VitePress 配置

`docs/.vitepress/config.mjs` 实现：
- 动态扫描 `docs/` 目录
- 自动生成导航栏和侧边栏
- 支持多语言和搜索功能

### OpenCode 配置

`.opencode/opencode.jsonc` 配置：
- MasterGo MCP 集成
- 自定义工具和规则

### Git Hook

`.git/hooks/pre-commit` 实现：
- 自动检测新增的 `.md` 文件
- 更新对应目录的 `index.md`
- 确保目录与文档同步

## 部署

项目已配置 GitHub Actions，自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建
3. 访问 `https://crazyzsh.github.io/`

## 技术亮点

### 动态配置

- 首页 features 由脚本动态生成
- 导航栏根据文档目录自动更新
- 侧边栏与文档结构同步

### 自动化工作流

- pre-commit hook 自动维护目录索引
- GitHub Actions 自动部署
- 文档变更自动反映在导航中

### AI 集成

- OpenCode 作为主编程助手
- MasterGo MCP 实现设计稿读取
- 支持多种 AI 工具协同工作

## 相关链接

- [VitePress 文档](https://vitepress.dev/)
- [OpenCode 文档](https://opencode.ai/docs)
- [MasterGo 帮助中心](https://mastergo.com/help/)
- [GitHub Pages](https://pages.github.com/)
