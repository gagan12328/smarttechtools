<script>
  import Icon from 'Components/Icon/index.svelte';

  let fileInput;

  const handleUploadClick = () => {
    fileInput.click();
  }
</script>

<div class="dropzone">
  <form class="dropzone-container">
    <label class="input-control" for="file_jfkll2f">
      <input bind:this="{fileInput}" type="file" id="file_jfkll2f" />
      <button class="upload-btn" on:click|preventDefault="{handleUploadClick}">
        <span class="upload-icon mr-2">
          <Icon name="upload_file" />
        </span>
        CHOOSE FILES
      </button>
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
  }

  .input-control {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--dropzone-height);
    border: 2px dashed rgba(0,0,0,0.15);
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
