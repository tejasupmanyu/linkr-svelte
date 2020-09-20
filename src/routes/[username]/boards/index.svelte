<script context="module">
  export async function preload({ params }, { user }) {
    const { username } = params;
    try {
      const res = await this.fetch(`/api/user/${username}`, {
        headers: { "Content-Type": "application/json" },
      });
      const userDetails = await res.json();
      return { userDetails, username };
    } catch (err) {
      return { username, user };
    }
  }
</script>

<script>
  import NewBoardButton from "../../../client/components/NewBoardButton.svelte";
  import BoardThumb from "../../../client/components/BoardThumb.svelte";
  import _ from "lodash";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

  export let userDetails;
  export let username;

  let boardsByUser = _.get(userDetails, "boards", []);

  function onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    addNotification({
      text: "Copied Link URL!",
      position: "top-center",
      removeAfter: 4000,
    });
  }
</script>

<svelte:head>
  <title>Linkr</title>
</svelte:head>

<section class="p-8">
  {#if userDetails}
    <div class="flex justify-between">
      <h1 class="font-bold text-6xl">
        {`@${userDetails.username}'s`} Boards {`(${boardsByUser.length})`}
      </h1>
      <button
        class="text-gray-600 hover:text-gray-800 hover:bg-gray-300 text-xl
          focus:bg-gray-300 focus:outline-none py-1 px-2 rounded mx-2 h-12"
        on:click={onCopyLink}>
        <i class="far fa-copy" />
      </button>
    </div>

    <section class="flex flex-wrap">
      {#each boardsByUser as board, i (board.id)}
        <BoardThumb {board} showControls={false} refetchBoards />
      {/each}
    </section>
  {:else}
    <h1 class="text-6xl text-red-500 font-bold">404</h1>
    <h2 class="text-3xl">
      😕 No user found with username <em>{`${username}`}</em>
    </h2>
  {/if}
</section>
