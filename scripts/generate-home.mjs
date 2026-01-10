#!/usr/bin/env node

/**
 * Generate homepage with dynamic features based on categories
 */

import fs from 'fs'
import path from 'path'

const DOCS_DIR = path.resolve('docs')

const CATEGORY_EMOJI = {
  'ai-assistants': '🤖',
  'tools-platform': '🛠️',
  'data-visualization': '📊',
  'tech-architecture': '🏗️',
  'investment-analysis': '💰'
}

const CATEGORY_NAME = {
  'ai-assistants': 'AI 助手',
  'tools-platform': '工具平台',
  'data-visualization': '数据可视化',
  'tech-architecture': '技术架构',
  'investment-analysis': '投资分析'
}

const CATEGORY_DETAILS = {
  'ai-assistants': 'OpenCode、Claude Code 等 AI 编程工具使用指南与最佳实践',
  'tools-platform': '各类 AI 相关平台工具深度分析与评测报告',
  'data-visualization': 'Antv、Mermaid 等可视化工具使用教程与对比',
  'tech-architecture': '中台架构设计、技术选型与最佳实践分享',
  'investment-analysis': 'Polymarket 等投资市场分析与投资策略研究',
  'test-category': '测试分类，用于演示自动生成功能'
}

function getTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : path.basename(filePath, '.md')
}

function scanCategories() {
  return fs.readdirSync(DOCS_DIR)
    .filter(dir => {
      const dirPath = path.join(DOCS_DIR, dir)
      return fs.statSync(dirPath).isDirectory() && 
             !dir.startsWith('.') && 
             dir !== 'index.md'
    })
    .sort()
}

function generateHomepage() {
  const categories = scanCategories()
  
  let features = categories.map(cat => {
    const emoji = CATEGORY_EMOJI[cat] || '📄'
    const name = CATEGORY_NAME[cat] || cat
    const details = CATEGORY_DETAILS[cat] || `这是 ${name} 分类下的文档`
    return `  - title: ${name} ${emoji}
    details: ${details}
    link: /${cat}/`
  }).join('\n')

  const content = `---
layout: home

hero:
  name: 'AI 学习资料'
  text: 'AI 学习与实践文档集'
  tagline: '涵盖 AI 助手、工具平台、技术架构等领域，系统化整理 AI 学习资源'
  actions:
    - theme: brand
      text: 快速开始 →
      link: /ai-assistants/opencode-usage
    - theme: alt
      text: 查看所有文档 ↓
      link: /ai-assistants/

features:
${features}

lastUpdated: true
---
`

  const indexPath = path.join(DOCS_DIR, 'index.md')
  fs.writeFileSync(indexPath, content, 'utf-8')
  console.log(`✅ 已更新首页 (${categories.length} 个分类)`)
}

generateHomepage()
