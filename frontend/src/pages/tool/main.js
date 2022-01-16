import App from './index.svelte';
import { getPageData } from './utils'

const link = process.env.PAGE_LINK || '/image-to-pdf'

const app = new App({
	target: document.body,
  props: {
    ...getPageData(link),
  }
});

export default app;
