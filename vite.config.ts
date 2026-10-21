import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { pageFor, pages, renderBody, renderHead, site } from './src/content/seo'

const PLACEHOLDER = '<!--seo-head-->'
const BODY_PLACEHOLDER = '<!--seo-body-->'

/**
 * Writes page-specific head tags into index.html, then emits one static HTML
 * file per route plus sitemap.xml and robots.txt, so crawlers and link
 * previews see the right title, description and structured data without
 * running JavaScript. Absolute URLs use SITE_URL (e.g. https://example.com)
 * when set, otherwise the production origin in seo.ts.
 */
function seo(): Plugin {
  const origin = (process.env.SITE_URL || site.url).replace(/\/$/, '')
  let outDir = 'dist'
  let template = ''
  const render = (html: string, page: ReturnType<typeof pageFor>) =>
    html.replace(PLACEHOLDER, renderHead(page, origin)).replace(BODY_PLACEHOLDER, renderBody(page))
  return {
    name: 'quanta-seo',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        template = html
        return render(html, pageFor('/'))
      },
    },
    closeBundle() {
      if (!template) return
      for (const page of pages.filter((p) => p.path !== '/')) {
        const dir = path.join(outDir, page.path)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), render(template, page))
      }
      fs.writeFileSync(path.join(outDir, '404.html'), render(template, undefined))

      const today = new Date().toISOString().slice(0, 10)
      const urls = pages.map((p) => `  <url>\n    <loc>${origin}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`)
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
      fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
