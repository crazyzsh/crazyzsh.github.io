#!/usr/bin/env node

/**
 * Auto-generate index.md files for documentation categories
 * Run this script to update all category index files with current document list
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

function getDescription(content) {
  const match = content.match(/^##\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function generateIndexContent(category, files) {
  const emoji = CATEGORY_EMOJI[category] || '📄'
  const name = CATEGORY_NAME[category] || category

  let content = `# ${name} ${emoji}\n\n`

  const description = `这是 ${name} 分类下的文档列表。\n\n`
  content += description

  content += '## 文档列表\n\n'

  files.forEach(file => {
    const filePath = path.join(DOCS_DIR, category, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const title = getTitle(fileContent)

    if (title && file !== 'index.md') {
      const link = file.replace('.md', '')
      content += `- [${title}](./${link})\n`
    }
  })

  content += '\n---\n\n'
  content += `*最后更新: ${new Date().toLocaleDateString('zh-CN')}*\n`

  return content
}

function scanCategory(category) {
  const categoryPath = path.join(DOCS_DIR, category)

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const files = fs.readdirSync(categoryPath)
    .filter(f => f.endsWith('.md'))
    .sort()

  return files
}

function updateIndexes() {
  console.log('🔄 正在更新文档目录...\n')

  const categories = fs.readdirSync(DOCS_DIR)
    .filter(dir => {
      const dirPath = path.join(DOCS_DIR, dir)
      return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
    })
    .filter(dir => CATEGORY_NAME[dir])

  categories.forEach(category => {
    const files = scanCategory(category)
    const content = generateIndexContent(category, files)

    const indexPath = path.join(DOCS_DIR, category, 'index.md')
    fs.writeFileSync(indexPath, content, 'utf-8')

    console.log(`✅ 已更新: ${category}/index.md (${files.length} 篇文档)`)
  })

  console.log('\n✨ 目录更新完成!')
}

updateIndexes()
