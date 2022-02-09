<script>
  import Icon from 'Components/Icon/index.svelte';

  export let files = undefined;

  export let isUploading = false;

  export let uploadProgress = 0;

  let fileInput;

  const handleFileDrop = (ev) => {
    ev.preventDefault();
    console.log(ev);

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }

  const handleFileDragOver = (ev) => {
    ev.preventDefault();
    console.log('file drag');
  }

  const handleUploadClick = () => {
    fileInput.click();
  }
</script>

<div class="dropzone" on:drop="{handleFileDrop}" on:dragover="{handleFileDragOver}">
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
</div>

<style>
  .dropzone {
    --dropzone-height: 300px;
  }

  .dropzone-container {
    width: 100%;
    border: 2px solid var(--document-color);
    background: linear-gradient(16deg, var(--document-color) 5%, var(--document-color-light) 100%);
    padding: 0.5rem;
    border-radius: 2px;
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
</style>
