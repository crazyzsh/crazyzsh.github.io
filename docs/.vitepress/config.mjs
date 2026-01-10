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
    'investment-analysis': '💰'
  }
  return emojiMap[name] || '📄'
}

function getCategoryName(name) {
  const nameMap = {
    'ai-assistants': 'AI 助手',
    'tools-platform': '工具平台',
    'data-visualization': '数据可视化',
    'tech-architecture': '技术架构',
    'investment-analysis': '投资分析'
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
  return [
    { text: '首页', link: '/' },
    ...categories.map(cat => ({
      text: `${getCategoryName(cat)} ${getCategoryEmoji(cat)}`,
      link: `/${cat}/`
    }))
  ]
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
