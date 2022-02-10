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
    --border-color: #f0f0f3;

    /* header */
    --header-height: 70px;
  }

  body {
    margin-top: var(--header-height);
    font-family: 'Noto Sans', sans-serif;
  }
</style>
