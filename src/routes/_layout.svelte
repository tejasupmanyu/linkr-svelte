<script>
  import Nav from "../client/components/Nav.svelte";
  import Home from "./index.svelte";
  import Footer from "../client/components/Footer.svelte";
  export let segment;
</script>

<svelte:head>
  <title>Linkr</title>
</svelte:head>

<Nav {segment} />

<main class="pt-16 absolute h-full w-full">
  <slot />
</main>

<Footer />
