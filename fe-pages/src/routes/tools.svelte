<script>
  import Tool from '../components/Tool/index.svelte';
</script>

<section>
  <div class="container">
    <h1 class="section-title text-center">All Smart Tech Tools</h1>
    <p class="section-sub-title text-center">
      We have built a collection of smart tools to process your documents seamlessly.
    </p>

    <div id="toolList">
      <Tool name="PDF" />
    </div>
  </div>
</section>

<style>
  .section-title {
    font-size: 3.5rem;
    font-weight: 700;
  }

  .section-sub-title {
    font-size: 1.2rem;
    font-weight: 400;
  }

  section {
    padding: 40px 0;
  }
</style>
