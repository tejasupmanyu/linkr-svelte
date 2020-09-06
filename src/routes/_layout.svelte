<script>
  import Nav from "../client/components/Nav.svelte";
  import Home from "./index.svelte";
  import Footer from "../client/components/Footer.svelte";
  export let segment;
</script>

<style>
  :global(#sapper) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>

<svelte:head>
  <title>Linkr</title>
</svelte:head>
<Nav {segment} />

<main class="relative h-full w-full flex flex-grow flex-col">
  <slot />
  <Footer />
</main>
