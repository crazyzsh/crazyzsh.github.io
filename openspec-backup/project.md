# Project Context

## Purpose
A repository for AI learning materials and documentation. Contains educational content about AI/ML concepts, code examples in TypeScript and Python, and documentation for learning purposes.

## Tech Stack
- Markdown (primary content format)
- TypeScript (code examples)
- Python (code examples)
- macOS (development platform)

## Project Conventions

### Code Style
- TypeScript: Explicit return types, no `any`, prefer `const` over `let`, arrow functions, async/await
- Python: PEP 8, type hints, f-strings, list comprehensions, `pathlib`
- Naming: camelCase (JS/TS), snake_case (Python), PascalCase (classes), UPPER_SNAKE_CASE (constants)
- Markdown: ATX headings, max 120 chars line length, code blocks with language tags

### Architecture Patterns
- Documentation-first approach
- Content organized by topic in directories
- Code examples in language-specific subdirectories
- Assets in `/assets/images/`, diagrams in Mermaid syntax

### Testing Strategy
- No automated tests exist
- Manual review required for code accuracy, link validity, and formatting

### Git Workflow
- Feature branches for changes
- Clear commit messages: "Add [topic]: description"
- Squash related commits before merging

## Domain Context
- AI/ML educational content
- Code examples should be self-contained and runnable
- Label speculative content clearly
- Cite sources for factual claims
- Date-stamp time-sensitive information

## Important Constraints
- Documentation-only repository (no build process required)
- Content must be accessible and readable
- Code examples should be accurate and tested before adding

## External Dependencies
- markdownlint-cli for linting (optional)
- No external APIs or services required
