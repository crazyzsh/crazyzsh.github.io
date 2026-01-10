import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 学习资料',
  description: 'AI 学习资料与文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 助手', link: '/ai-assistants/' },
      { text: '工具平台', link: '/tools-platform/' },
      { text: '数据可视化', link: '/data-visualization/' },
      { text: '技术架构', link: '/tech-architecture/' },
      { text: '投资分析', link: '/investment-analysis/' }
    ],
    sidebar: {
      '/ai-assistants/': [
        {
          text: 'AI 助手',
          items: [
            { text: 'OpenCode 使用指南', link: '/ai-assistants/opencode-usage' },
            { text: 'Claude Code 使用指南', link: '/ai-assistants/claude-code-usage' }
          ]
        }
      ],
      '/tools-platform/': [
        {
          text: '工具平台',
          items: [
            { text: 'Keyden 分析', link: '/tools-platform/keyden-analysis' },
            { text: 'Alertivity 分析', link: '/tools-platform/alertivity-analysis' }
          ]
        }
      ],
      '/data-visualization/': [
        {
          text: '数据可视化',
          items: [
            { text: 'Antv 信息图', link: '/data-visualization/antv-infographic' },
            { text: 'Mermaid vs 信息图', link: '/data-visualization/mermaid-vs-infographic' }
          ]
        }
      ],
      '/tech-architecture/': [
        {
          text: '技术架构',
          items: [
            { text: '中台 Node.js 指南', link: '/tech-architecture/middle-platform-nodejs' },
            { text: 'Zensical vs VitePress', link: '/tech-architecture/zensical-vs-vitepress' }
          ]
        }
      ],
      '/investment-analysis/': [
        {
          text: '投资分析',
          items: [
            { text: 'Polymarket 投资策略', link: '/investment-analysis/polymarket-investment-strategy' },
            { text: 'Polymarket 分析', link: '/investment-analysis/polymarket-analysis' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
})
