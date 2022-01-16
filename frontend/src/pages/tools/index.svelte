<script>
  import Layout from 'Layout/index.svelte';
  import Section from 'Components/Section/index.svelte';
  import Tool from 'Components/Tool/index.svelte';
  import allTools from 'Data/tools';
</script>

<Layout>
  <Section>
    <h1 class="text-5xl text-center font-bold">
      All Smart Tech Tools
    </h1>
    <p class="text-center text-xl mt-4 max-w-lg ml-auto mr-auto">
      Our collection of Tech tools to process digital documents and streamline your workflow seamlessly.
    </p>
    <div class="mt-20 flex justify-center">
      {#each allTools as tool}
        <Tool class="flex-shrink-0 ml-1.5 mr-1.5" name={tool.name} link={tool.link} icon={tool.icon} description={tool.description} />
      {/each}
    </div>
  </Section>
</Layout>
