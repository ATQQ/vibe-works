#!/usr/bin/env node
// 本地模拟发布后的体验：打包主题与脚手架，用脚手架生成项目，并装上本地主题包。
// 用法：pnpm try:create [目录]   不传目录则在系统临时目录下新建一个。
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const tmp = process.platform === 'win32' ? tmpdir() : '/tmp'
const packs = mkdtempSync(join(tmp, 'vibework-packs-'))
const { npm_config_user_agent, ...env } = process.env

function run(cmd, args, cwd = root) {
  execFileSync(cmd, args, { cwd, stdio: 'inherit', env })
}

function pack(dir) {
  const { name, version } = JSON.parse(readFileSync(join(root, dir, 'package.json'), 'utf8'))
  run('pnpm', ['pack', '--pack-destination', packs], join(root, dir))
  return join(packs, `${name.replace('@', '').replace('/', '-')}-${version}.tgz`)
}

const themeTgz = pack('packages/theme')
const createTgz = pack('packages/create-vibework-theme')

const target = process.argv[2]
  ? resolve(process.argv[2])
  : join(mkdtempSync(join(tmp, 'vibework-try-')), 'vibework-site')

run('npm', ['exec', '--yes', `--package=${createTgz}`, '--', 'create-vibework-theme', target], process.cwd())
console.log('安装依赖，主题使用本地包…')
run('npm', ['install', '--no-audit', '--no-fund', themeTgz], target)
console.log(`\n依赖已装好，直接启动：\n\n  cd ${target} && npm run dev\n`)
