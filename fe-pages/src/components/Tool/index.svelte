<script>
  export let name;
  export let icon;
  export let link;
</script>

<a href="{link}" class="tool">
  <div class="tool-icon">
    {#if icon}
      <img src="{icon}" alt="{name}" />
    {/if}
  </div>
  <div class="tool-name">
    {name}
  </div>
</a>

<style>
  .tool {
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 160px;
    padding: 8px;
  }

  .tool:hover {
    text-decoration: none;
  }

  .tool-icon {
    width: 60px;
    height: 60px;
    background-color: var(--white);
    border-radius: 8px;
  }

  .tool-name {
    text-align: center;
    padding-top: 0.5rem;
    font-size: 0.8rem;
    color: var(--dark);
  }
</style>
