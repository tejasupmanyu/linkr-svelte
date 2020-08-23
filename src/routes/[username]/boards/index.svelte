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
  import { onMount } from "svelte";
  import NewBoardButton from "../../../client/components/NewBoardButton.svelte";
  import BoardThumb from "../../../client/components/BoardThumb.svelte";
  import API from "../../../client/API";
  import { urls } from "../../../client/API/urls";
  import _ from "lodash";

  export let userDetails;
  export let username;

  let boardsByUser = _.get(userDetails, "boards", []);
</script>

<svelte:head>
  <title>Linkr</title>
</svelte:head>

<section class="p-8">
  {#if userDetails}
    <h1 class="font-bold text-6xl">
      {`@${userDetails.username}'s`} Boards {`(${boardsByUser.length})`}
    </h1>
    <section class="flex flex-wrap">
      {#each boardsByUser as board, i (board.id)}
        <BoardThumb {board} showControls={false} refetchBoards />
      {/each}
    </section>
  {:else}
    <h1 class="text-6xl text-red-500 font-bold">404</h1>
    <h2 class="text-3xl">
      😕 No user found with username
      <em>{`${username}`}</em>
    </h2>
  {/if}
</section>
