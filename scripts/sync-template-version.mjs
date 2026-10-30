#!/usr/bin/env node
// changeset version 之后运行：把脚手架模板里的主题依赖改成主题当前版本。
import { readFileSync, writeFileSync } from 'node:fs'

const themePkg = new URL('../packages/theme/package.json', import.meta.url)
const templatePkg = new URL('../packages/create-vibework/template/package.json', import.meta.url)

const { name, version } = JSON.parse(readFileSync(themePkg, 'utf8'))
const template = JSON.parse(readFileSync(templatePkg, 'utf8'))
template.dependencies[name] = `^${version}`
writeFileSync(templatePkg, `${JSON.stringify(template, null, 2)}\n`)
console.log(`template → ${name}@^${version}`)
