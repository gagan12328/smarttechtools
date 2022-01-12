<script>
  export let container = false;
</script>

<section>
  {#if container}
    <div class="container">
      <slot name="title" />
      <slot name="sub-title" />
      <slot />
    </div>
  {:else}
    <slot name="title" />
    <slot name="sub-title" />
    <slot />
  {/if}
</section>

<style>
  section {
    padding: 40px 0;
  }
</style>
