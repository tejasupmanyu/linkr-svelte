<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  let Popover;
  onMount(async () => {
    Popover = (await import("svelte-popover")).default;
  });
</script>

<svelte:component
  this={Popover}
  stopPropagation
  overlayColor="transparent"
  placement="bottom-center"
  arrowColor="#e2e8f0">
  <button
    class="px-2 rounded-sm border hover:bg-gray-300 text-gray-600"
    slot="target">
    <i class="fas fa-ellipsis-h" />
  </button>
  <div slot="content" class="bg-white border rounded-md w-32">
    <ul class="w-full">
      <li>
        <slot name="menu-item-1" />
      </li>
      <li>
        <slot name="menu-item-2" />
      </li>
    </ul>
  </div>
</svelte:component>
