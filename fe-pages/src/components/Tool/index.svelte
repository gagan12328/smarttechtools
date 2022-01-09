<script>
  export let name;
</script>

<div class="tool">
  <div class="tool-icon"></div>
  <div class="tool-name">
    {name}
  </div>
</div>

<style>
  .tool {
    display: inline-block;
  }

  .tool-icon {
    width: 60px;
    height: 60px;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.11);
  }

  .tool-name {
    text-align: center;
    padding-top: 0.5rem;
    font-size: 0.8rem;
  }
</style>
