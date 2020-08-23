<script context="module">
  export function preload(page, { user }) {
    return { user };
  }
</script>

<script>
  export let segment;
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import UserAvatarMenu from "./UserAvatarMenu.svelte";

  const { session } = stores();
  let user;

  onMount(() => {
    user = $session.user;
  });
</script>

<header
  class="absolute top-0 px-8 h-16 border-b border-gray-400 flex items-center
  w-full z-10 shadow-md">
  <nav class="flex flex-row justify-between w-full items-center">
    <a rel="prefetch" href="/" class="font-bold text-3xl flex items-center">
      Linkr
      <img class="h-8 ml-2" src="logo-512.png" alt="brand logo" />
    </a>
    {#if user}
      <UserAvatarMenu>
        <div
          class="flex items-center hover:bg-gray-200 rounded p-2"
          slot="trigger">
          <img
            class="rounded-full sm:h-10 sm:w-10 h-8 w-8"
            src={user.profileImageUrl}
            alt="avatar" />
          <div class="sm:mx-2 mx-1">
            <span class="font-medium text-sm sm:text-md">
              {user.displayName}
            </span>
          </div>
        </div>
        <a
          slot="menu-item-1"
          rel="prefetch"
          aria-current={segment === undefined ? 'page' : undefined}
          href={'/boards'}
          class="w-full p-4 hover:bg-gray-200 flex items-center
          hover:text-rausch">
          <i class="far fa-clipboard w-8 " />
          Boards
        </a>
        <a
          slot="menu-item-2"
          aria-current={segment === undefined ? 'page' : undefined}
          href="/auth/logout"
          class="w-full p-4 hover:bg-gray-200 hover:text-red-700 flex
          items-center">
          <i class="fas fa-sign-out-alt w-8" />
          Logout
        </a>
      </UserAvatarMenu>
    {:else if segment !== 'signin'}
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href="/signin"
        class="px-4 py-2 bg-rausch hover:bg-rausch-dark text-white rounded-full">
        Sign In
      </a>
    {/if}
  </nav>
</header>
