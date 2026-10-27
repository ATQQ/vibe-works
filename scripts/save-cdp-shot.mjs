import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const name = process.argv[2]
if (!name) {
  console.error('usage: save-cdp-shot.mjs <slug>')
  process.exit(1)
}
const logs = '/Users/sugar/.cursor/browser-logs'
const files = readdirSync(logs)
  .filter((f) => f.startsWith('cdp-response-Page.captureScreenshot-'))
  .map((f) => join(logs, f))
  .sort()
const latest = files.at(-1)
if (!latest) {
  console.error('no screenshot json')
  process.exit(1)
}
const raw = JSON.parse(readFileSync(latest, 'utf8'))
const b64 = raw?.result?.data || raw?.data
if (!b64) {
  console.error('no data in', latest)
  process.exit(1)
}
const out = join(
  '/Users/sugar/Documents/github/vibe-works/apps/web/public/covers',
  `${name}.png`,
)
writeFileSync(out, Buffer.from(b64, 'base64'))
console.log('wrote', out, Buffer.from(b64, 'base64').length)
