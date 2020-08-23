<script context="module">
  export async function preload(page, { user }) {
    if (!user) {
      this.redirect(302, "/");
    }

    const res = await this.fetch(`/api/board/`, {
      headers: { "Content-Type": "application/json" },
    });
    const boards = await res.json();
    return { boards };
  }
</script>

<script>
  import { onMount } from "svelte";
  import NewBoardButton from "../client/components/NewBoardButton.svelte";
  import BoardThumb from "../client/components/BoardThumb.svelte";
  import API from "../client/API";
  import { urls } from "../client/API/urls";

  export let boards;
  let boardsByUser = [];

  onMount(() => {
    boardsByUser = boards;
  });

  async function fetchAllBoards(createdBoard) {
    const boards = await API.get(urls.board.index);
    boardsByUser = await boards.json();
  }
</script>

<svelte:head>
  <title>Linkr - Your Boards</title>
</svelte:head>

<section class="p-8">
  <h1 class="font-bold text-4xl sm:text-6xl">
    📌 Boards {`(${boardsByUser.length})`}
  </h1>
  <section class="flex flex-wrap flex-col sm:flex-row">
    {#each boardsByUser as board, i (board.id)}
      <BoardThumb {board} refetchBoards={fetchAllBoards} showControls={true} />
    {/each}
    <NewBoardButton onAddNewBoard={fetchAllBoards} />
  </section>
</section>
