<script context="module">
  export async function preload(page, { user }) {
    if (!user) {
      this.redirect(302, "/");
    }

    const res = await this.fetch(`/api/board/`, {
      headers: { "Content-Type": "application/json" },
    });
    const boards = await res.json();
    return { boards, user };
  }
</script>

<script>
  import { onMount } from "svelte";
  import NewBoardButton from "../client/components/NewBoardButton.svelte";
  import BoardThumb from "../client/components/BoardThumb.svelte";
  import API from "../client/API";
  import { urls } from "../client/API/urls";
  import { getNotificationsContext } from "svelte-notifications";
  import { APP_URL } from "../client/constants";

  const { addNotification } = getNotificationsContext();

  export let user;
  export let boards;
  let boardsByUser = [];

  onMount(() => {
    boardsByUser = boards;
  });

  async function fetchAllBoards(createdBoard) {
    const boards = await API.get(urls.board.index);
    boardsByUser = await boards.json();
  }

  function onCopyLink() {
    navigator.clipboard.writeText(`${APP_URL}/${user.username}/boards`);
    addNotification({
      text: "Copied URL!",
      position: "top-center",
      removeAfter: 4000,
    });
  }
</script>

<svelte:head>
  <title>Linkr - Your Boards</title>
</svelte:head>

<section class="p-8">
  <div class="flex justify-between">
    <h1 class="font-bold text-3xl md:text-6xl">
      📌 Boards
      {`(${boardsByUser.length})`}
    </h1>
    <button
      class="text-gray-600 hover:text-gray-800 hover:bg-gray-300 text-xl
        focus:bg-gray-300 focus:outline-none py-1 px-2 rounded mx-2 h-12"
      on:click={onCopyLink}>
      <i class="far fa-copy" />
    </button>
  </div>
  <section class="flex flex-wrap flex-col sm:flex-row">
    {#each boardsByUser as board, i (board.id)}
      <BoardThumb {board} refetchBoards={fetchAllBoards} showControls={true} />
    {/each}
    <NewBoardButton onAddNewBoard={fetchAllBoards} />
  </section>
</section>
