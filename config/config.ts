import { defineConfig } from 'umi'
console.log(12345);
console.log(process.env.UMI_ENV);

export default defineConfig({
  define: {
    ENV: process.env.UMI_ENV,
  },
  favicons: ['/favicon.ico'],
  npmClient: 'npm',
  title: "prophetgamma"
})
