<script>
  import Navbar from 'Components/Navbar/index.svelte'
</script>

<header>
  <Navbar />
</header>

<main>
  <slot />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --border-color: #333333;
    --bg-color: #17171a;
    --bg-color-light: #222326;
    --bg-color-dim: #1a1b1e;

    /* header */
    --header-height: 70px;
  }

  body {
    color: #f0f0f3;
    background-color: var(--bg-color);
    margin-top: var(--header-height);
    font-family: 'Noto Sans', sans-serif;
  }
</style>
