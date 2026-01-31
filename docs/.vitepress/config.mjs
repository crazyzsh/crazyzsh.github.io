import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

const DOCS_DIR = path.resolve('docs')

function getCategoryEmoji(name) {
  const emojiMap = {
    'ai-assistants': '🤖',
    'tools-platform': '🛠️',
    'data-visualization': '📊',
    'tech-architecture': '🏗️',
    'investment-analysis': '💰',
    'opencode-assistants': '💻',
    'openclaw': '🦞',
    'test-category': '📄'
  }
  return emojiMap[name] || '📄'
}

function getCategoryName(name) {
  const nameMap = {
    'ai-assistants': 'AI 助手',
    'tools-platform': '工具平台',
    'data-visualization': '数据可视化',
    'tech-architecture': '技术架构',
    'investment-analysis': '投资分析',
    'opencode-assistants': 'OpenCode',
    'openclaw': 'OpenClaw',
    'test-category': '测试分类'
  }
  return nameMap[name] || name
}

function getDocTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : path.basename(filePath, '.md')
}

function scanCategories() {
  return fs.readdirSync(DOCS_DIR)
    .filter(dir => {
      const dirPath = path.join(DOCS_DIR, dir)
      return fs.statSync(dirPath).isDirectory() && !dir.startsWith('.') && dir !== 'index.md'
    })
    .sort()
}

function generateSidebar() {
  const categories = scanCategories()
  const sidebar = {}

  categories.forEach(cat => {
    const catPath = path.join(DOCS_DIR, cat)
    const files = fs.readdirSync(catPath)
      .filter(f => f.endsWith('.md') && f !== 'index.md')
      .sort()

    sidebar[`/${cat}/`] = [
      {
        text: getCategoryName(cat),
        items: files.map(file => {
          const filePath = path.join(catPath, file)
          const title = getDocTitle(filePath)
          const link = `/${cat}/${file.replace('.md', '')}`
          return { text: title, link }
        })
      }
    ]
  })

  return sidebar
}

function generateNav() {
  const categories = scanCategories()

  const categoryGroups = {
    'AI 与编程': ['ai-assistants', 'openclaw', 'opencode-assistants'],
    '数据与分析': ['data-visualization', 'investment-analysis'],
    '技术与工具': ['tech-architecture', 'tools-platform']
  }

  const nav = [
    { text: '首页', link: '/' }
  ]

  Object.entries(categoryGroups).forEach(([groupName, groupCats]) => {
    const items = groupCats
      .filter(cat => categories.includes(cat))
      .map(cat => ({
        text: `${getCategoryName(cat)} ${getCategoryEmoji(cat)}`,
        link: `/${cat}/`
      }))

    if (items.length > 0) {
      nav.push({
        text: groupName,
        items,
        activeMatch: `/${groupCats.join('|')}/`
      })
    }
  })

  categories.filter(cat => {
    const allGroupCats = Object.values(categoryGroups).flat()
    return !allGroupCats.includes(cat)
  }).forEach(cat => {
    nav.push({
      text: `${getCategoryName(cat)} ${getCategoryEmoji(cat)}`,
      link: `/${cat}/`
    })
  })

  return nav
}

export default defineConfig({
  title: 'AI 学习资料',
  description: 'AI 学习资料与文档',
  cleanUrls: true,
  themeConfig: {
    nav: generateNav(),
    sidebar: generateSidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/crazyzsh/crazyzsh.github.io' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },
    search: {
      provider: 'local'
    }
  }
})
