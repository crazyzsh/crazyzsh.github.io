<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# AGENTS.md

This repository contains AI learning materials and documentation. The following guidelines apply to all agentic operations.

## Build Commands

This is primarily a documentation and learning materials repository. No build process is required for reading and writing markdown content.

```bash
# No build required - content is markdown files
```

## Linting

Markdown linting helps maintain consistent documentation quality.

```bash
# Install markdownlint
npm install -g markdownlint-cli

# Lint all markdown files
npx markdownlint '**/*.md'

# Fix auto-fixable issues
npx markdownlint '**/*.md' --fix
```

## Testing

No automated tests exist for this documentation repository. Manual review is required for:
- Code example accuracy
- Link validity
- Formatting consistency

## Code Style Guidelines

### General Principles
- Prioritize clarity and readability over clever solutions
- Keep code examples simple and focused
- Add comments to explain complex concepts
- Use meaningful variable and function names

### Markdown Formatting
- Use ATX-style headings (`##` over `===` underlines)
- Maximum line length: 120 characters
- Use consistent list styles (bullet points or numbered)
- Include code blocks with language tags for syntax highlighting
- Leave one blank line between headings and content

### Code Examples
- Use language-specific syntax highlighting
- Include comments explaining key concepts
- Ensure examples are self-contained and runnable
- Use TypeScript for algorithmic examples when possible
- Keep examples focused on one concept at a time

### TypeScript/JavaScript
- Use TypeScript for all new code examples
- Explicit return types for functions
- Avoid `any` type; use `unknown` when appropriate
- Use `const` over `let`, avoid `var`
- Use arrow functions for anonymous functions
- Prefer async/await over raw promises
- Use template literals over string concatenation

### Python
- Follow PEP 8 style guide
- Use type hints for function signatures
- Use list comprehensions where appropriate
- Prefer f-strings over .format() or % formatting
- Use `pathlib` for path operations

### Naming Conventions
- **Variables/functions**: camelCase (JS/TS), snake_case (Python)
- **Constants**: UPPER_SNAKE_CASE
- **Classes**: PascalCase
- **Files**: kebab-case (JS/TS), snake_case (Python)

### Error Handling
- Use try/catch for operations that may fail
- Provide meaningful error messages
- Let exceptions propagate for unexpected errors
- Validate inputs at function boundaries

### Imports
- Use absolute imports when possible
- Group imports: stdlib, third-party, local
- Sort imports alphabetically within groups
- Avoid wildcard imports (`import *`)

### File Organization
- Keep related content together in directories
- Use descriptive directory names
- Limit file length; split if over 500 lines
- Use index files for directory navigation

### Auto-Update Directory
- A pre-commit hook automatically updates `index.md` when new `.md` files are added
- New files are added under the `## 插件列表` or `## 文档列表` section
- No manual directory updates required

### Git Workflow
- Create feature branches for major changes
- Write clear commit messages: "Add [topic]: description"
- Squash related commits before merging
- Review changes before committing

### AI-Specific Conventions
- Label speculative content clearly
- Cite sources when presenting factual claims
- Date-stamp time-sensitive information
- Include "last verified" timestamps for code examples
- Distinguish between official APIs and third-party tools

## Cursor Rules

No custom Cursor rules found.

## Copilot Instructions

No custom Copilot instructions found.

## Working with This Repository

1. **Reading Content**: Browse markdown files directly - no build needed
2. **Adding Content**: Create new markdown files with proper frontmatter
3. **Code Examples**: Place in appropriate language subdirectories
4. **Images**: Store in `/assets/images/` with descriptive names
5. **Diagrams**: Use Mermaid syntax within code blocks

## Environment

- Platform: macOS
- Primary content: Markdown documentation
- Secondary content: TypeScript, Python code examples
