<script>
  import Icon from 'Components/Icon/index.svelte';
  import classNames from 'Utils/classNames';

  export let display = 'block';
  export let name = '';
  export let icon = '';
  export let link = '';
  export let description = '';
  export let showArrow = true;
</script>

<a href="{link}" class="{classNames('tool', display, $$props.class)}">
  <div class="tool-icon">
    <img src="{icon}" alt="{name}">
  </div>
  <div class="tool-content">
    <div class="tool-name">
      {name}
    </div>
    {#if description}
      <div class="tool-description">
        {description}
      </div>
    {/if}
  </div>
  {#if showArrow}
    <div class="tool-chevron">
      <Icon name="chevron_right" />
    </div>
  {/if}
</a>

<style>
  .tool {
    display: inline-flex;
    justify-content: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 1rem;
    width: 285px;
    max-width: 100%;
    text-decoration: none;
  }

  .tool:hover {
    background-color: var(--border-color);
  }

  .tool-content {
    flex: 1;
    margin-left: 1rem;
  }

  .tool-name {
    font-weight: bold;
    font-size: 1rem;
  }

  .tool-description {
    font-size: 0.8rem;
  }

  .tool-icon {
    flex: 0 0 45px;
    max-width: 45px;
  }

  .tool.inline {
    flex-direction: column;
    width: auto;
    border: 0;
    align-items: center;
    padding: 0.6rem;
  }

  .tool.inline .tool-name {
    font-size: 0.6rem;
    text-transform: uppercase;
  }

  .tool.inline .tool-content {
    margin-left: 0;
    margin-top: 0.6rem;
  }
</style>
