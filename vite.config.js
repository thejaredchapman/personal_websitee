import { defineConfig } from 'vite'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Latest commit, baked into the bundle for the boot splash. Falls back to
// Vercel's build env when .git isn't available.
function latestCommit() {
  try {
    const [hash, date, subject] = execSync('git log -1 --format=%h%n%cI%n%s', { encoding: 'utf8' }).trim().split('\n')
    return { hash, date, subject }
  } catch {
    const sha = process.env.VERCEL_GIT_COMMIT_SHA
    return {
      hash: sha ? sha.slice(0, 7) : 'unknown',
      date: new Date().toISOString(),
      subject: (process.env.VERCEL_GIT_COMMIT_MESSAGE ?? 'latest build').split('\n')[0],
    }
  }
}

function vercelApiProxy() {
  return {
    name: 'vercel-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        // Parse JSON body for POST requests
        if (req.method === 'POST') {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          req.body = JSON.parse(Buffer.concat(chunks).toString())
        }

        // Dynamically import the handler matching the URL path
        const route = req.url.split('?')[0].replace(/^\//, '') || 'index'
        const filePath = resolve(`api/${route}.js`)
        try {
          // Use file:// URL with cache-bust to bypass Vite's module resolution
          const fileUrl = pathToFileURL(filePath).href + `?t=${Date.now()}`
          const mod = await import(/* @vite-ignore */ fileUrl)
          await mod.default(req, res)
        } catch (err) {
          if (err.code === 'ERR_MODULE_NOT_FOUND') return next()
          console.error(err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vercelApiProxy()],
  define: { __GIT_COMMIT__: JSON.stringify(latestCommit()) },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
    css: false,
  },
})
