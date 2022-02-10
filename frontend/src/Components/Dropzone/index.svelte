<script>
  import Icon from 'Components/Icon/index.svelte';

  export let files = undefined;

  export let isUploading = false;

  export let uploadProgress = 0;

  let isDragging = false;

  let fileInput;

  const handleFileDrop = (ev) => {
    ev.preventDefault();
    console.log(ev);

    let droppedFiles = []
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          droppedFiles.push(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        droppedFiles.push(ev.dataTransfer.files[i])
      }
    }
    isDragging = false;
    files = droppedFiles;
  }

  const handleFileDragOver = (ev) => {
    ev.preventDefault();
    isDragging = true;
  }

  const handleFileDragEnd = (ev) => {
    isDragging = false;
  }

  const handleUploadClick = () => {
    fileInput.click();
  }
</script>

<div class="dropzone" on:drop="{handleFileDrop}" on:dragover="{handleFileDragOver}" on:dragleave="{handleFileDragEnd}">
  {#if isDragging}
    <div class="dropzone-container relative overflow-hidden">
      <div class="input-control"></div>
      <div class="dragging bg-blue-400 animate-pulse"></div>
      <div class="dragging-upload-label">
        <Icon name="upload" class="text-5xl animate-bounce" />
      </div>
    </div>
  {:else}
    {#if isUploading}
      <div class="dropzone-container relative overflow-hidden">
        <div class="input-control"></div>
        <div class="dragging bg-white opacity-50 transition-all" style="{`width: ${uploadProgress}%`}"></div>
        <div class="dragging-upload-label">
          <h3 class="text-2xl">Uploading {uploadProgress}%</h3>
        </div>
      </div>
    {:else}
      <form class="dropzone-container">
        <label class="input-control" for="file_jfkll2f">
          <input {...$$restProps} bind:this="{fileInput}" type="file" id="file_jfkll2f" bind:files />
          <div class="pt-6">
            <button class="upload-btn" on:click|preventDefault="{handleUploadClick}">
              <span class="upload-icon mr-2">
                <Icon name="upload_file" />
              </span>
              CHOOSE FILES
            </button>
            <div class="label-text text-white text-sm text-center mt-2">
              or
              <div>DROP FILES HERE</div>
            </div>
          </div>
        </label>
      </form>
    {/if}
  {/if}
</div>

<style>
  .dropzone {
    --dropzone-height: 300px;
  }

  @media (max-width: 767px) {
    .dropzone {
      --dropzone-height: 200px;
    }
  }

  .dropzone-container {
    width: 100%;
    border: 1px solid var(--document-color);
    background: linear-gradient(16deg, var(--document-color) 5%, var(--document-color-light) 100%);
    padding: 0.5rem;
    border-radius: 2px;
  }

  .dragging {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .input-control {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--dropzone-height);
    cursor: pointer;
  }

  .input-control input {
    display: none;
  }

  .upload-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 1.2rem 1.7rem;
    font-weight: bold;
    border: 0;
  }

  .dragging-upload-label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
