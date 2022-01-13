<script>
  import { fade } from 'svelte/transition';
  import Logo from 'Components/Logo/SmartTechTools.svg';
  import Icon from 'Components/Icon/index.svelte';
  import clickOutside from 'Utils/clickOuside';

  let open = false;

  const handleOutsideClick = () => {
    open = false;
  };

  const toggleDropdown = () => {
    open = !open;
  };
</script>

<nav class="navbar flex items-start">
  <div class="container ml-auto mr-auto flex flex-wrap items-center">
    <div>
      <a href="/" class="flex items-center">
        <img class="logo-image" src="{Logo}" alt="Smart Tech Tools Logo">
      </a>
    </div>
    <div class="ml-auto relative" use:clickOutside on:click_outside="{handleOutsideClick}">
      <button class="btn-tool" class:open on:click="{toggleDropdown}">
        <Icon name="apps" />
        <span class="pl-1 pr-1">Tools</span>
        {#if open}
          <span class="inline-flex" in:fade="{{duration: 100, delay: 100}}">
            <Icon name="keyboard_arrow_up" />
          </span>
        {:else}
          <span class="inline-flex" in:fade="{{duration: 100, delay: 100}}">
            <Icon name="keyboard_arrow_down" />
          </span>
        {/if}
      </button>
      {#if open}
        <div in:fade="{{duration: 100}}" out:fade="{{duration: 100}}" class="nav-tool-dropdown bg-white">
          <a href="/" class="flex items-center">
            <span class="pl-1">Home</span>
          </a>
          <a href="/" class="flex items-center">
            <span class="pl-1">Settings</span>
          </a>
          <a href="/" class="flex items-center">
            <span class="pl-1">Help</span>
          </a>
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
    border-bottom: 1px solid #f0f0f3;
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
    border: 1px solid #f0f0f3;
  }

  .btn-tool.open {
    background-color: #f0f0f3;
  }

  .nav-tool-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 1rem;
    border: 1px solid #f0f0f3;
    border-radius: 4px;
    padding: 0.8rem;
    min-width: 350px;
  }
</style>
