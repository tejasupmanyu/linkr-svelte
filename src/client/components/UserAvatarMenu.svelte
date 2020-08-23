<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  let Popover;
  let popoverVisible = false;
  onMount(async () => {
    Popover = (await import("svelte-popover")).default;
  });

  function onMenuItemClick(event) {
    popoverVisible = !popoverVisible;
  }
</script>

<svelte:component
  this={Popover}
  open={popoverVisible}
  stopPropagation
  overlayColor="transparent"
  placement="bottom-center"
  class="shadow-xl"
  arrowColor="#e2e8f0">
  <button class="focus:outline-none focus:border-2" slot="target">
    <slot name="trigger" />
  </button>
  <div slot="content" class="bg-white border rounded-md w-48 shadow-md z-20">
    <ul class="w-full">
      <li on:click={onMenuItemClick}>
        <slot name="menu-item-1" />
      </li>
      <li on:click={onMenuItemClick}>
        <slot name="menu-item-2" />
      </li>
    </ul>
  </div>
</svelte:component>
