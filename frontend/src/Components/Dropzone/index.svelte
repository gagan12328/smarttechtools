<script>
  import Icon from 'Components/Icon/index.svelte'

  export let files = undefined

  let isDragging = false

  let fileInput

  const handleFileDrop = (ev) => {
    ev.preventDefault()
    let droppedFiles = []
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile()
          droppedFiles.push(file)
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        droppedFiles.push(ev.dataTransfer.files[i])
      }
    }
    isDragging = false
    files = droppedFiles
  }

  const handleFileDragOver = (ev) => {
    ev.preventDefault()
    isDragging = true
  }

  const handleFileDragEnd = (ev) => {
    isDragging = false
  }

  const handleUploadClick = () => {
    fileInput.click()
  }
</script>

<div
  class="dropzone"
  on:drop={handleFileDrop}
  on:dragover={handleFileDragOver}
  on:dragleave={handleFileDragEnd}
>
  <div class="dz-container dark:bg-stone-800 p-5">
    <div class="dz-content">
      <input
        {...$$restProps}
        class="input-control"
        bind:this={fileInput}
        type="file"
        id="file_jfkll2f"
        bind:files
      />
      <button
        class="upload-btn"
        on:click|preventDefault={handleUploadClick}
        title="Choose files to upload"
      >
        {#if isDragging}
          <span class="upload-btn-label">
            Drop
          </span>
        {:else}
          <span class="upload-btn-label">
            Choose Files
          </span>
          <span class="upload-icon">
            <Icon name="content_paste_search" />
          </span>
        {/if}
      </button>
      <div class="label-text text-stone-400 text-sm text-center mt-2">
        <div>Drop files here. 10 MB maximum file size.</div>
      </div>
    </div>
  </div>
</div>

<style>
  .dropzone {
    --dropzone-height: 200px;
  }

  @media (max-width: 767px) {
    .dropzone {
      --dropzone-height: 200px;
    }
  }

  .input-control {
    display: none;
  }

  .dz-container {
    background-image: linear-gradient(45deg,rgba(0,0,0,.06) 25%,transparent 0),linear-gradient(-45deg,rgba(0,0,0,.06) 25%,transparent 0),linear-gradient(45deg,transparent 75%,rgba(0,0,0,.06) 0),linear-gradient(-45deg,transparent 75%,rgba(0,0,0,.06) 0);
    background-size: 24px 24px;
    background-position: 0 0,0 12px,12px -12px,-12px 0;
  }

  .dz-content {
    padding: 20px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: var(--dropzone-height);
  }

  .upload-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--document-color);
    border-radius: 4px;
    padding: 0.8rem 1.5rem;
    font-weight: 400;
    border: 0;
  }

  .upload-btn-label {
    padding: 0 3.5rem;
  }

  .upload-icon {
    display: inline-block;
    width: 35px;
    height: 35px;
    vertical-align: middle;
    padding: 4px;
  }
</style>
