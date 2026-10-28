#!/usr/bin/env node
// 用本地 gh CLI 读取各作品仓库默认分支的最近提交时间，对比 frontmatter 的 `updated`。
// 用法：node scripts/sync-updated.mjs [--write]
// 仓库来源：frontmatter `repo`（单个或 [a, b]，多个取最新），否则取 actions 里的 GitHub 链接。
// `repo: owner/name/sub/dir` 只统计该子目录的提交（monorepo 用）。
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const WORKS_DIR = new URL('../apps/web/works/', import.meta.url).pathname
const write = process.argv.includes('--write')

function frontmatterOf(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/)
  return match ? match[1] : ''
}

function reposOf(fm) {
  const repoLine = fm.match(/^repo:\s*(.+)$/m)
  if (repoLine) {
    return repoLine[1]
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }
  const href = fm.match(/https?:\/\/github\.com\/([^/\s]+)\/([^/\s?#]+)/)
  return href ? [`${href[1]}/${href[2].replace(/\.git$/, '')}`] : []
}

function latestCommitDate(target) {
  const [owner, name, ...dir] = target.split('/')
  const query = dir.length ? `&path=${encodeURIComponent(dir.join('/'))}` : ''
  const iso = execFileSync('gh', ['api', `repos/${owner}/${name}/commits?per_page=1${query}`, '--jq', '.[0].commit.committer.date'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
  return new Date(iso)
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(date)
}

function setUpdated(text, value) {
  const fm = frontmatterOf(text)
  let next
  if (/^updated:.*$/m.test(fm)) next = fm.replace(/^updated:.*$/m, `updated: ${value}`)
  else if (/^date:.*$/m.test(fm)) next = fm.replace(/^(date:.*)$/m, `$1\nupdated: ${value}`)
  else next = `${fm}\nupdated: ${value}`
  return text.replace(fm, next)
}

const rows = []
for (const file of readdirSync(WORKS_DIR).filter((f) => f.endsWith('.md') && f !== 'index.md')) {
  const path = join(WORKS_DIR, file)
  const text = readFileSync(path, 'utf8')
  const fm = frontmatterOf(text)
  const repos = reposOf(fm)
  const current = fm.match(/^updated:\s*(\S+)/m)?.[1] ?? ''
  if (!repos.length) {
    rows.push({ file, repos: '-', current, latest: '', status: '无仓库' })
    continue
  }
  try {
    const latest = formatDate(new Date(Math.max(...repos.map((r) => latestCommitDate(r).getTime()))))
    const changed = latest !== current
    rows.push({ file, repos: repos.join(', '), current: current || '-', latest, status: changed ? '有变化' : '一致' })
    if (changed && write) writeFileSync(path, setUpdated(text, latest))
  } catch (error) {
    const msg = String(error.stderr || error.message).split('\n')[0]
    rows.push({ file, repos: repos.join(', '), current, latest: '', status: `失败：${msg}` })
  }
}

console.table(rows)
const pending = rows.filter((r) => r.status === '有变化').length
if (!write && pending) console.log(`${pending} 个有变化，确认后运行：pnpm sync:updated --write`)
if (write) console.log(`已写入 ${pending} 个文件`)
