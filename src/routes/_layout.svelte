<script>
  import { onMount } from "svelte";
  import Nav from "../client/components/Nav.svelte";
  import Home from "./index.svelte";
  import Footer from "../client/components/Footer.svelte";
  export let segment;

  let Notifications;
  onMount(async () => {
    Notifications = (await import("svelte-notifications")).default;
  });
</script>

<style>
  :global(#sapper) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  :global(.default-notification-style) {
    background: #cbd5e0 !important;
  }
</style>

<svelte:head>
  <title>Linkr</title>
</svelte:head>
<Nav {segment} />

<svelte:component this={Notifications}>
  <main class="relative h-full w-full flex flex-grow flex-col">
    <slot />
    <Footer />
  </main>
</svelte:component>
