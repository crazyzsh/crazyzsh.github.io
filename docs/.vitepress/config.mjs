import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 学习资料',
  description: 'AI 学习资料与文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 助手 🤖', link: '/ai-assistants/' },
      { text: '数据可视化 📊', link: '/data-visualization/' },
      { text: '投资分析 💰', link: '/investment-analysis/' },
      { text: '技术架构 🏗️', link: '/tech-architecture/' },
      { text: '工具平台 🛠️', link: '/tools-platform/' }
    ],
    sidebar: {
      '/ai-assistants/': [
        {
          text: 'AI 助手',
          items: [
            { text: 'Claude Code 使用指南', link: '/ai-assistants/claude-code-usage' },
            { text: 'OpenCode 使用指南 🚀', link: '/ai-assistants/opencode-usage' }
          ]
        }
      ],

      '/data-visualization/': [
        {
          text: '数据可视化',
          items: [
            { text: 'AntV Infographic 使用指南', link: '/data-visualization/antv-infographic' },
            { text: 'Mermaid vs AntV Infographic 对比分析', link: '/data-visualization/mermaid-vs-infographic' }
          ]
        }
      ],

      '/investment-analysis/': [
        {
          text: '投资分析',
          items: [
            { text: 'Polymarket 预测市场平台分析', link: '/investment-analysis/polymarket-analysis' },
            { text: '利用 Polymarket 进行投资决策指南', link: '/investment-analysis/polymarket-investment-strategy' }
          ]
        }
      ],

      '/tech-architecture/': [
        {
          text: '技术架构',
          items: [
            { text: '中台架构与 Node.js 中台开发指南', link: '/tech-architecture/middle-platform-nodejs' },
            { text: 'Zensical 与 VitePress 对比分析', link: '/tech-architecture/zensical-vs-vitepress' }
          ]
        }
      ],

      '/tools-platform/': [
        {
          text: '工具平台',
          items: [
            { text: 'Alertivity 系统监控工具分析', link: '/tools-platform/alertivity-analysis' },
            { text: 'Keyden TOTP 验证器分析', link: '/tools-platform/keyden-analysis' }
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
