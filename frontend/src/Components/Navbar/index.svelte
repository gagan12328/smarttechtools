<script>
  import { fade } from 'svelte/transition'
  import Logo from 'Components/Logo/SmartTechTools.svg'
  import Icon from 'Components/Icon/index.svelte'
  import Tool from 'Components/Tool/index.svelte'
  import clickOutside from 'Utils/clickOuside'
  import allTools from 'Data/tools'

  let open = false

  const handleOutsideClick = () => {
    open = false
  }

  const toggleDropdown = () => {
    open = !open
  }
</script>

<nav class="navbar flex items-start bg-white">
  <div class="container ml-auto mr-auto flex flex-wrap items-center">
    <div>
      <a href="/" class="flex items-center">
        <img class="logo-image" src={Logo} alt="Smart Tech Tools Logo" />
      </a>
    </div>
    <div
      class="ml-auto relative"
      use:clickOutside
      on:click_outside={handleOutsideClick}
    >
      <button class="btn-tool" class:open on:click={toggleDropdown}>
        <Icon name="apps" />
        <span class="pl-1 pr-1">Tools</span>
        {#if open}
          <span class="inline-flex" in:fade={{ duration: 100, delay: 100 }}>
            <Icon name="keyboard_arrow_up" />
          </span>
        {:else}
          <span class="inline-flex" in:fade={{ duration: 100, delay: 100 }}>
            <Icon name="keyboard_arrow_down" />
          </span>
        {/if}
      </button>
      {#if open}
        <div
          in:fade={{ duration: 100 }}
          out:fade={{ duration: 100 }}
          class="nav-tool-dropdown bg-white"
        >
          <h3 class="font-bold">All Tools</h3>
          <hr class="mt-2 mb-3" />
          <div class="flex flex-wrap gap-3">
            {#each allTools as tool}
              <Tool
                class="flex-shrink-0"
                showArrow={false}
                display="inline"
                name={tool.name}
                link={tool.link}
                icon={tool.icon}
              />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</nav>

<style lang="postcss">
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: var(--header-height);
    border-bottom: 1px solid var(--border-color);
  }

  .container {
    height: var(--header-height);
  }

  .logo-image {
    height: 60px;
  }

  .btn-tool {
    display: inline-flex;
    align-items: center;
    text-align: center;
    border: 1px solid transparent;
    padding: 0.3rem 0.4rem;
    border-radius: 4px;
  }

  .btn-tool:hover {
    border: 1px solid var(--border-color);
  }

  .btn-tool.open {
    background-color: var(--border-color);
  }

  .nav-tool-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.8rem;
    min-width: 315px;
  }
</style>
