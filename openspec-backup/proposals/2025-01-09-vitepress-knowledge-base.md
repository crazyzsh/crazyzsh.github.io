# AI 学习知识库 - VitePress 迁移提案

**状态**: 草稿
**创建时间**: 2025-01-09
**作者**: 项目维护者

## 摘要

将 AI 学习资料仓库从纯 Markdown 文件迁移到 VitePress 驱动的文档网站，以获得更好的导航、搜索和用户体验。

## 动机

### 当前状态
- 纯 Markdown 文件，基本目录结构
- 无内置搜索功能
- 手动在文档间导航
- 有限的主题和自定义选项
- 无移动端优化布局

### 期望状态
- 使用 VitePress 的专业文档网站
- 全文搜索功能
- 侧边栏导航和目录
- 深色模式支持
- 移动端响应式设计
- 准备好部署到 GitHub Pages / Vercel

## 目标

1. 为 AI 学习资料创建一个现代化、可搜索的知识库
2. 提高内容可发现性和导航体验
3. 保持贡献者的 Markdown 工作流
4. 支持轻松部署到静态托管
5. 支持自定义主题和品牌

## 非目标

- 添加后端服务或数据库
- 实现用户身份验证
- 构建交互式代码 playground
- 集成支付系统

## 技术设计

### 架构概览

```
my-ai-learning-books/
├── docs/                    # VitePress 文档根目录
│   ├── .vitepress/
│   │   ├── config.ts        # 主配置
│   │   ├── theme/
│   │   │   ├── index.ts     # 主题入口点
│   │   │   └── custom.css   # 自定义样式
│   ├── guide/               # 指南文档
│   ├── reference/           # API/参考文档
│   ├── examples/            # 代码示例
│   └── index.md             # 首页
├── content/                 # 原始 Markdown 内容（迁移到 docs/）
├── assets/
│   └── images/
├── package.json
└── vitepress.config.ts
```

### 技术选型

| 组件 | 选择 | 理由 |
|------|------|------|
| 框架 | VitePress | 快速、基于 Vue、优秀的开发者体验 |
| 部署 | GitHub Pages | 免费、与 GitHub 集成 |
| 搜索 | Algolia DocSearch | 开源免费 |
| 版本控制 | Git 分支 | 原生 Git 工作流 |
| CI/CD | GitHub Actions | 免费、集成良好 |

### 实施计划

#### 第一阶段：设置（第 1 周）
- [ ] 初始化 VitePress 项目
- [ ] 配置基本设置（标题、描述、主题）
- [ ] 设置侧边栏导航结构
- [ ] 创建自定义首页

#### 第二阶段：迁移（第 2 周）
- [ ] 将现有内容移动到 docs/ 目录
- [ ] 为 Markdown 文件添加 frontmatter
- [ ] 添加导航链接和交叉引用
- [ ] 验证所有内容正确渲染

#### 第三阶段：自定义（第 3 周）
- [ ] 实现自定义主题组件
- [ ] 添加自定义 CSS 样式
- [ ] 配置搜索功能
- [ ] 启用深色模式切换

#### 第四阶段：部署（第 4 周）
- [ ] 设置 GitHub Actions 工作流
- [ ] 配置 GitHub Pages 部署
- [ ] 测试部署流程
- [ ] 设置自定义域名（可选）

### 配置示例

```typescript
// vitepress.config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 学习知识库',
  description: 'AI 和机器学习的综合指南',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '示例', link: '/examples/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '安装', link: '/guide/installation' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username/repo' }
    ],
    search: {
      provider: 'algolia'
    }
  }
})
```

### 内容迁移策略

1. **第一阶段迁移**：将所有现有 .md 文件复制到 docs/
2. **第二阶段**：为每个文件添加 frontmatter：
   ```yaml
   ---
   title: 文档标题
   description: 简短描述
   ---
   ```
3. **第三阶段**：添加 VitePress 特有功能：
   - [Tip]、[Warning]、[Note] 容器
   - 多语言代码组
   - 返回顶部链接
4. **第四阶段**：优化图片和资源

## 安全考虑

- 无用户生成内容（低安全风险）
- 静态网站生成消除服务器端漏洞
- 所有外部链接使用 HTTPS
- 保持依赖更新

## 性能目标

- 首次加载：< 2 秒
- Lighthouse 分数：> 90
- 图片优化：WebP 格式
- 折叠区域图片懒加载

## 待定问题

1. 使用 Algolia DocSearch 还是本地搜索？
2. 自定义域名需求？
3. 国际化/本地化策略？
4. 如何处理弃用的内容？

## 备选方案

### 选项 1：Docusaurus
- 优点：成熟、基于 React、插件丰富
- 缺点：更重、学习曲线更陡

### 选项 2：MkDocs + Material 主题
- 优点：基于 Python、配置简单
- 缺点：主题灵活性较差

### 选项 3：Starlight (Astro)
- 优点：现代化、性能优秀
- 缺点：较新、生态系统较小

**决策**：VitePress - 在性能、开发者体验和文档功能之间取得最佳平衡

## 时间线

| 阶段 | 时长 | 里程碑 |
|------|------|--------|
| 设置 | 1 周 | VitePress 本地运行 |
| 迁移 | 1 周 | 所有内容迁移完成 |
| 自定义 | 1 周 | 自定义主题完成 |
| 部署 | 1 周 | 上线 GitHub Pages |

## 成本估算

- GitHub Pages：免费
- 域名（可选）：约 12 美元/年
- 总计：0-12 美元/年

## 成功指标

- [ ] 网站加载时间 < 2 秒
- [ ] 搜索结果返回 < 500ms
- [ ] 所有现有内容可访问
- [ ] 移动端可访问性分数 > 90
- [ ] 贡献者反馈积极

## 附录

### 相关文档
- [VitePress 文档](https://vitepress.dev/)
- [VuePress 迁移指南](https://vitepress.dev/guide/migration)
- [Algolia DocSearch](https://docsearch.algolia.com/)

### 依赖
```json
{
  "devDependencies": {
    "vitepress": "^1.0.0",
    "vue": "^3.4.0"
  }
}
```

### GitHub Actions 工作流示例

```yaml
name: 部署到 GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run docs:build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
      - uses: actions/deploy-pages@v4
```
