<script>
  // components
  import Tool from '../components/Tool/index.svelte';
  import Section from '../components/Section/index.svelte';
  import Navbar from '../components/Navbar/index.svelte';
  import tools from '../data/tools';
</script>

<Navbar />

<main>
  <Section>
    <h1 slot="title" class="section-title text-center">All Smart Tech Tools</h1>
    <p slot="sub-title" class="section-sub-title text-center mb-5">
      We have built a collection of smart tools to process your documents seamlessly.
    </p>

    <div id="toolList" class="tool-list">
      {#each tools as tool}
        <Tool name="{tool.name}" icon="{tool.icon}" link="{tool.link}" />
      {/each}
    </div>
  </Section>
</main>

<style>
  .section-title {
    font-size: 3.5rem;
    font-weight: 700;
  }

  .section-sub-title {
    font-size: 1.2rem;
    font-weight: 400;
  }

  .tool-list {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
</style>
