import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    ENV: process.env.UMI_ENV,
  },
  favicons: ['/favicon.ico'],
  npmClient: 'npm',
  title: "prophetgamma"
})
