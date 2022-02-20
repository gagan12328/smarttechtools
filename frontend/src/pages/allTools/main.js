import App from './index.svelte'

const app = new App({
  target: document.getElementById('app'),
  hydrate: process.env.NODE_ENV === "production",
})

export default app
