import { defineConfig } from 'vite'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
})
