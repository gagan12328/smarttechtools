<script>
  import Layout from 'Layout/index.svelte';
  import Section from 'Components/Section/index.svelte';
  import Tool from 'Components/Tool/index.svelte';
  import allTools from 'Data/tools';
  import Dropzone from 'Components/Dropzone/index.svelte';

  export let name = '';
  export let icon = '';
  export let description = '';
  export const color = '';
  export const link = '';
  export const id = '';
</script>

<Layout>
  <Section>
    <div class="flex items-center justify-center text-xl max-w-lg ml-auto mr-auto">
      <div class="document-icon">
        <img src="{icon}" alt="{name}" />
      </div>
      <div class="document-title text-center ml-4">
        <h1 class="text-4xl font-bold">{name}</h1>
      </div>
    </div>
    <p class="text-center text-lg mt-2 max-w-lg ml-auto mr-auto">{description}</p>
    <div class="mt-20 max-w-5xl ml-auto mr-auto">
      <Dropzone />
    </div>
  </Section>
</Layout>

<style lang="postcss">
  .document-icon {
    width: 25px;
  }
</style>
