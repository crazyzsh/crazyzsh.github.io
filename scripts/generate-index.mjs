#!/usr/bin/env node

/**
 * Auto-generate VitePress config and index files
 * Run this script to auto-update all configuration when docs change
 */

import fs from 'fs'
import path from 'path'

const DOCS_DIR = path.join(process.cwd(), 'docs')

// Emoji mapping for categories
const CATEGORY_EMOJI = {
  'ai-assistants': '🤖',
  'tools-platform': '🛠️',
  'data-visualization': '📊',
  'tech-architecture': '🏗️',
  'investment-analysis': '💰'
}

// Category names in Chinese
const CATEGORY_NAME = {
  'ai-assistants': 'AI 助手',
  'tools-platform': '工具平台',
  'data-visualization': '数据可视化',
  'tech-architecture': '技术架构',
  'investment-analysis': '投资分析'
}

function getTitle(content) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function scanCategories() {
  const categories = fs.readdirSync(DOCS_DIR)
    .filter(dir => {
      const dirPath = path.join(DOCS_DIR, dir)
      return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
    })
    .filter(dir => !dir.startsWith('.') && dir !== 'index.md')
    .sort()

  return categories
}

function scanFiles(category) {
  const categoryPath = path.join(DOCS_DIR, category)
  const files = fs.readdirSync(categoryPath)
    .filter(f => f.endsWith('.md'))
    .filter(f => f !== 'index.md')
    .sort()

  return files
}

function getFileTitle(category, file) {
  const filePath = path.join(DOCS_DIR, category, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  return getTitle(content) || file.replace('.md', '')
}

function generateIndexContent(category, files) {
  const emoji = CATEGORY_EMOJI[category] || '📄'
  const name = CATEGORY_NAME[category] || category

  let content = `# ${name} ${emoji}\n\n`
  content += `这是 ${name} 分类下的文档列表。\n\n`
  content += '## 文档列表\n\n'

  files.forEach(file => {
    const title = getFileTitle(category, file)
    const link = file.replace('.md', '')
    content += `- [${title}](./${link})\n`
  })

  content += '\n---\n\n'
  content += `*最后更新: ${new Date().toLocaleDateString('zh-CN')}*\n`

  return content
}

function generateConfig(categories) {
  const navItems = categories.map(cat => {
    const name = CATEGORY_NAME[cat] || cat
    const emoji = CATEGORY_EMOJI[cat] || ''
    return `{ text: '${name} ${emoji}', link: '/${cat}/' }`
  }).join(',\n      ')

  const sidebarItems = categories.map(cat => {
    const name = CATEGORY_NAME[cat] || cat
    const files = scanFiles(cat)
    const items = files.map(file => {
      const title = getFileTitle(cat, file)
      const link = `/${cat}/${file.replace('.md', '')}`
      return `{ text: '${title}', link: '${link}' }`
    }).join(',\n            ')

    return `      '/${cat}/': [
        {
          text: '${name}',
          items: [
            ${items}
          ]
        }
      ]`
  }).join(',\n\n')

  return `import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 学习资料',
  description: 'AI 学习资料与文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      ${navItems}
    ],
    sidebar: {
${sidebarItems}
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
`
}

function updateIndexes() {
  console.log('🔄 正在更新文档目录...\n')

  const categories = scanCategories()

  categories.forEach(category => {
    const files = scanFiles(category)
    const content = generateIndexContent(category, files)
    const indexPath = path.join(DOCS_DIR, category, 'index.md')
    fs.writeFileSync(indexPath, content, 'utf-8')
    console.log(`✅ 已更新: ${category}/index.md (${files.length} 篇文档)`)
  })

  console.log()
}

function updateConfig() {
  console.log('🔄 正在更新 VitePress 配置...\n')

  const categories = scanCategories()
  const config = generateConfig(categories)

  const configPath = path.join(DOCS_DIR, '.vitepress/config.mjs')
  fs.writeFileSync(configPath, config, 'utf-8')

  console.log(`✅ 已更新: .vitepress/config.mjs`)
  console.log(`   发现 ${categories.length} 个分类`)
}

function main() {
  console.log('🚀 VitePress 文档自动配置工具\n')
  console.log('================================\n')

  updateIndexes()
  updateConfig()

  console.log('\n================================')
  console.log('✨ 配置更新完成!')
  console.log('\n提示: 运行 npm run docs:build 预览效果')
}

main()
