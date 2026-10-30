#!/usr/bin/env node
import { cpSync, existsSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const templateDir = fileURLToPath(new URL('./template', import.meta.url))
const textFiles = ['package.json', 'README.md', '.vitepress/config.ts', 'index.md']

async function ask(rl, question, fallback) {
  if (!rl) return fallback
  const answer = (await rl.question(`${question} (${fallback}) `)).trim()
  return answer || fallback
}

function isEmptyDir(dir) {
  return !existsSync(dir) || readdirSync(dir).filter((f) => f !== '.git').length === 0
}

function toPackageName(name) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-') || 'vibework-site'
  )
}

// Placeholders sit inside single-quoted TS strings and single-quoted YAML scalars.
function escapeFor(file, value) {
  if (file.endsWith('.ts')) return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  if (file.endsWith('.md') && file !== 'README.md') return value.replace(/'/g, "''")
  return value
}

function packageManager() {
  const agent = process.env.npm_config_user_agent ?? ''
  if (agent.startsWith('pnpm')) return 'pnpm'
  if (agent.startsWith('yarn')) return 'yarn'
  if (agent.startsWith('bun')) return 'bun'
  return 'npm'
}

const rl = process.stdin.isTTY ? createInterface({ input: process.stdin, output: process.stdout }) : null

try {
  const dirArg = process.argv[2]
  const dir = dirArg || (await ask(rl, '项目目录', 'vibework-site'))
  const root = resolve(dir)

  if (!isEmptyDir(root)) {
    console.error(`目录 ${dir} 不为空，换一个目录名再试。`)
    process.exit(1)
  }

  const title = await ask(rl, '站点标题', '我的作品集')

  cpSync(templateDir, root, { recursive: true })
  renameSync(join(root, '_gitignore'), join(root, '.gitignore'))

  const vars = { name: toPackageName(basename(root)), title }
  for (const file of textFiles) {
    const path = join(root, file)
    const content = readFileSync(path, 'utf8').replace(/\{\{(\w+)\}\}/g, (match, key) =>
      key in vars ? escapeFor(file, vars[key]) : match,
    )
    writeFileSync(path, content)
  }

  const pm = packageManager()
  const rel = relative(process.cwd(), root)
  const cd = rel.startsWith('..') ? root : rel
  console.log(`\n已创建 ${root}\n`)
  if (cd) console.log(`  cd ${cd.includes(' ') ? `"${cd}"` : cd}`)
  console.log(`  ${pm} install`)
  console.log(`  ${pm === 'npm' ? 'npm run' : pm} dev\n`)
} finally {
  rl?.close()
}
