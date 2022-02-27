<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'Components/Icon/index.svelte'
  import { saveFile } from 'Utils/download'

  export let list = []
  export let isConverting = false;
  export let fileStatues = {};

  const dispatch = createEventDispatcher()

  const handleRemove = (file) => {
    dispatch('remove', file);
  }

  const handleConvertClick = () => dispatch('convert')
</script>

<div class="fl-container">
  <div>
    {#each list as item}
      <div class="fl-item" class:failed="{fileStatues.FILE_SIZE_EXCEEDS === item.status}">
        <div class="fl-content">
          <div class="fl-item-name">
            <span class="xs-label">Name: </span>
            {item.file}
          </div>
          <div class="fl-item-convert">
            <span class="xs-label">Convert: </span>
            to {item.convert}
          </div>
          <div class="fl-item-status">
            <span class="xs-label">Status: </span>
            <span class="status-chip">{item.status}</span>
          </div>
          <div class="fl-item-size">
            <span class="xs-label">File Size: </span>
            {item.size}
          </div>
        </div>
        <div class="fl-item-aciton">
          {#if item.status !== fileStatues.UPLOADING}
            <button class="btn-close" on:click="{() => handleRemove(item)}">
              <Icon name="close" />
            </button>
          {:else if item.status === fileStatues.PROCESSED}
            <button class="btn-download" on:click="{() => saveFile(item.download)}">
              Download
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div class="fl-action">
    <button class="btn-convert" on:click="{!isConverting ? handleConvertClick : undefined}" disabled="{isConverting}">
      {#if isConverting}
        Converting... <span class="btn-icon"><Icon name="sync" /></span>
      {:else}
        Convert <span class="btn-icon"><Icon name="arrow_forward" /></span>
      {/if}
    </button>
  </div>
</div>

<style>
  .fl-container {
    background-color: var(--bg-color-dim);
  }

  .fl-item {
    padding: 1rem;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    background-color: var(--bg-color-light);
  }

  .fl-item.failed {
    background-color: #9c2323;
  }

  .fl-content {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .xs-label {
    display: none;
  }

  .fl-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .fl-item:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }

  .fl-item-name {
    flex: 1;
    padding-right: 0.8rem;
    word-break: break-all;
  }

  .fl-item-convert {
    flex: 0 0 80px;
    max-width: 100px;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }

  .fl-item-status {
    white-space: nowrap;
    flex: 0 0 130px;
    max-width: 130px;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  .fl-item-size {
    flex: 0 0 100px;
    max-width: 100px;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  .fl-item-aciton {
    flex: 0 0 90px;
    max-width: 90px;
    padding-left: 0.8rem;
    text-align: right;
  }

  .btn-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    vertical-align: middle;
  }

  .status-chip {
    text-align: center;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }

  .fl-action {
    padding-top: 50px;
  }

  .btn-convert {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--document-color);
    cursor: pointer;
    width: 100%;
    padding: 0.8rem 1.5rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    margin-left: 7px;
  }

  .btn-download {
    display: inline-flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0.5rem;
    background: var(--document-color);
    cursor: pointer;
    border-radius: 4px;
  }

  @media (max-width: 767px) {
    .fl-content {
      flex-direction: column;
    }

    .fl-content > div {
      flex: 1;
      width: 100%;
      max-width: 100%;
      text-align: left;
      padding: 4px 0;
    }

    .xs-label {
      display: inline-block;
    }
  }
</style>
