#!/usr/bin/env node
// 用本地 gh CLI 读取各作品仓库的最近提交时间与版本号，对比 frontmatter 的 `updated` / `version`。
// 用法：node scripts/sync-updated.mjs [--write]
// 仓库来源：frontmatter `repo`（单个或 [a, b]，多个取最新），否则取 actions 里的 GitHub 链接。
// `repo: owner/name/sub/dir` 只统计该子目录的提交，版本取该目录的 package.json（monorepo 用）。
// 版本优先级：最新 Release → 最新 tag → package.json；多个仓库时取第一个；只升不降，手写的更高版本会保留。
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const WORKS_DIR = new URL('../apps/web/works/', import.meta.url).pathname
const write = process.argv.includes('--write')

function gh(path, jq) {
  try {
    return execFileSync('gh', ['api', path, '--jq', jq], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
  } catch {
    return ''
  }
}

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

function splitTarget(target) {
  const [owner, name, ...dir] = target.split('/')
  return { repo: `${owner}/${name}`, dir: dir.join('/') }
}

function latestCommitDate(target) {
  const { repo, dir } = splitTarget(target)
  const query = dir ? `&path=${encodeURIComponent(dir)}` : ''
  const iso = gh(`repos/${repo}/commits?per_page=1${query}`, '.[0].commit.committer.date')
  if (!iso) throw new Error(`读取 ${target} 提交失败`)
  return new Date(iso)
}

function packageVersion(repo, dir) {
  const content = gh(`repos/${repo}/contents/${dir ? `${dir}/` : ''}package.json`, '.content')
  if (!content) return ''
  try {
    return JSON.parse(Buffer.from(content, 'base64').toString('utf8')).version ?? ''
  } catch {
    return ''
  }
}

function latestVersion(target) {
  const { repo, dir } = splitTarget(target)
  const raw = dir
    ? packageVersion(repo, dir)
    : gh(`repos/${repo}/releases/latest`, '.tag_name') ||
      gh(`repos/${repo}/tags?per_page=1`, '.[0].name // ""') ||
      packageVersion(repo, '')
  return raw.replace(/^v/i, '')
}

function compareVersion(a, b) {
  const pa = a.split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0)
  const pb = b.split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff) return diff
  }
  return 0
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(date)
}

function setField(text, key, value) {
  const fm = frontmatterOf(text)
  const line = new RegExp(`^${key}:.*$`, 'm')
  let next
  if (line.test(fm)) next = fm.replace(line, `${key}: ${value}`)
  else if (/^date:.*$/m.test(fm)) next = fm.replace(/^(date:.*)$/m, `$1\n${key}: ${value}`)
  else next = `${fm}\n${key}: ${value}`
  return text.replace(fm, next)
}

const rows = []
let changedFiles = 0
for (const file of readdirSync(WORKS_DIR).filter((f) => f.endsWith('.md') && f !== 'index.md')) {
  const path = join(WORKS_DIR, file)
  let text = readFileSync(path, 'utf8')
  const fm = frontmatterOf(text)
  const repos = reposOf(fm)
  const current = {
    updated: fm.match(/^updated:\s*(\S+)/m)?.[1] ?? '',
    version: String(fm.match(/^version:\s*['"]?([^'"\s]+)/m)?.[1] ?? ''),
  }
  if (!repos.length) {
    rows.push({ file, repo: '-', updated: current.updated, version: current.version, status: '无仓库' })
    continue
  }
  try {
    const updated = formatDate(new Date(Math.max(...repos.map((r) => latestCommitDate(r).getTime()))))
    const remote = latestVersion(repos[0])
    const version = remote && (!current.version || compareVersion(remote, current.version) > 0) ? remote : current.version
    const diff = []
    if (updated !== current.updated) diff.push('更新时间')
    if (version !== current.version) diff.push('版本')
    rows.push({
      file,
      repo: repos.join(', '),
      updated: updated === current.updated ? updated : `${current.updated || '-'} → ${updated}`,
      version: version === current.version ? version : `${current.version || '-'} → ${version}`,
      status: diff.length ? `变化：${diff.join('、')}` : '一致',
    })
    if (diff.length) {
      changedFiles++
      if (write) {
        text = setField(text, 'updated', updated)
        if (version) text = setField(text, 'version', `'${version}'`)
        writeFileSync(path, text)
      }
    }
  } catch (error) {
    rows.push({ file, repo: repos.join(', '), updated: current.updated, version: current.version, status: `失败：${error.message}` })
  }
}

console.table(rows)
if (!write && changedFiles) console.log(`${changedFiles} 个有变化，确认后运行：pnpm sync:updated --write`)
if (write) console.log(`已写入 ${changedFiles} 个文件`)
