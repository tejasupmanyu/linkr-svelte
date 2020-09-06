<script>
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let visible = false;
  onMount(() => (visible = true));
</script>

<style>
  :global(.wire-bg) {
    background-image: url("https://i.ibb.co/48sD6rJ/bg-linkr.png");
    background-size: 100%;
    background-repeat: repeat;
  }
</style>

<section class="w-full h-full p-8 flex flex-col flex-grow items-center wire-bg">
  {#if visible}
    <section
      class="sm:w-1/3 mt-12 bg-white p-4 sm:bg-transparent"
      in:fly={{ y: 150, duration: 1000 }}
      out:fade>
      <h2 class="font-semibold text-6xl">
        👋 <br /> Welcome to <span class="text-rausch">Linkr</span>
      </h2>
      <p class="sm:text-3xl text-2xl">
        Create boards and share the most interesting links you come across the
        Internet 🌈
      </p>
    </section>
  {/if}
</section>
