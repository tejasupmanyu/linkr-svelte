<script>
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let visible = false;
  onMount(() => (visible = true));
</script>

<section
  class="w-full h-full flex flex-col flex-grow items-center overflow-hidden relative">
  <img src="bg-linkr.png" class="absolute overflow-hidden" alt="background" />
  <section
    class="p-8 sm:w-1/3 mt-12 bg-white p-4 sm:bg-transparent overflow-auto">
    {#if visible}
      <section in:fly={{ y: 150, duration: 1000 }} out:fade>
        <h2 class="font-semibold text-6xl">
          👋
          <br />
          Welcome to
          <span class="text-rausch">Linkr</span>
        </h2>
        <p class="sm:text-3xl text-2xl">
          Create boards and share the most interesting links you come across the
          Internet 🌈
        </p>
      </section>
    {/if}
  </section>
</section>
