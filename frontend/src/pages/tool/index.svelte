<script>
  import Layout from 'Layout/index.svelte'
  import Section from 'Components/Section/index.svelte'
  import Dropzone from 'Components/Dropzone/index.svelte'
  import FileList from 'Components/FileList/index.svelte'
  import { FILE_STATUS } from './constants'
  import { uploadFilesSequence } from './api'
  import { fileUploadStore, addFilesToStore, filesStore, removeFileFromStore, isFileConverting, updateFile } from './store'
  import { getPageData, formatFiles } from './utils'

  const link = process.env.PAGE_LINK || '/image-to-pdf'

  export let pageData = getPageData(link);

  let files = []

  $: files, addFilesToStore(formatFiles(files, pageData))

  const handleRemove = (e) => {
    removeFileFromStore(e.detail)
    if ($filesStore.length < 1) {
      files = []
    }
  }

  const handleConvert = () => {
    uploadFilesSequence(pageData.metadata.api, $filesStore, pageData.metadata.fileSizeLimit, updateFile)
  }
</script>

<Layout>
  <Section>
    <div
      class="flex items-center justify-center text-xl max-w-lg ml-auto mr-auto"
    >
      <div class="document-icon">
        {@html pageData.icon}
      </div>
      <div class="document-title ml-4">
        <h1 class="text-4xl font-normal">{pageData.name}</h1>
      </div>
    </div>
    <p class="text-center mt-2 max-w-lg ml-auto mr-auto">
      {pageData.description}
    </p>
    <div class="mt-20 max-w-5xl ml-auto mr-auto">
      {#if $filesStore && $filesStore.length}
        <FileList list={$filesStore} on:remove="{handleRemove}" on:convert="{handleConvert}" isConverting="{$isFileConverting}" fileStatues="{FILE_STATUS}" />
      {:else}
        <Dropzone
          accept={pageData.metadata?.inputFiles?.join(',')}
          multiple={pageData.metadata?.inputFiles.length > 1}
          bind:files
          isUploading={$fileUploadStore.isUploading}
          uploadProgress={$fileUploadStore.uploadProgress}
        />
      {/if}
    </div>
  </Section>
</Layout>

<style lang="postcss">
  .document-icon {
    width: 45px;
  }
</style>
