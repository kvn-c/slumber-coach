import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { execSync } from 'child_process'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #1e1030;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: -apple-system, system-ui, sans-serif;
      gap: 20px;
    }
    img {
      width: 120px;
      height: 120px;
    }
    .name {
      color: #f07060;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .version {
      color: rgba(255, 255, 255, 0.25);
      font-size: 12px;
      letter-spacing: 0.14em;
    }
  </style>
</head>
<body>
  <img src="public/pwa-512x512.png" alt="">
  <div class="name">slumber.coach</div>
  <div class="version">v${version}</div>
</body>
</html>`

const tmpFile = '.splash-source.html'
writeFileSync(tmpFile, html)

try {
  execSync(
    `npx pwa-asset-generator ${tmpFile} public/splash --splash-only --background "#1e1030" --type png --index index.html --path "/splash"`,
    { stdio: 'inherit' }
  )

  // Fix double-prefixed paths the tool generates
  const indexHtml = readFileSync('index.html', 'utf-8')
  const fixed = indexHtml.replace(/href="\/splash\/\.splash-source\.html\//g, 'href="/splash/')
    .replace(/href="\/splash\/public\/splash\//g, 'href="/splash/')
  writeFileSync('index.html', fixed)

  console.log(`\nSplash screens generated for v${version}`)
} finally {
  unlinkSync(tmpFile)
}
