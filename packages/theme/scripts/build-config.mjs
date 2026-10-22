import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const esbuild = require('esbuild')
const here = dirname(fileURLToPath(import.meta.url))
const outfile = resolve(here, '../dist/config.js')

mkdirSync(dirname(outfile), { recursive: true })

await esbuild.build({
  entryPoints: [resolve(here, '../src/config.ts')],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  external: ['vitepress'],
})

writeFileSync(
  resolve(here, '../dist/config.d.ts'),
  `import type { UserConfig } from 'vitepress'\nexport declare function withThemeConfig(user?: UserConfig): UserConfig\n`,
)
