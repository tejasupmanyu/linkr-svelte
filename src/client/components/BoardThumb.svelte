<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import InlineMenu from "./InlineMenu.svelte";
  import API from "../API";
  import { urls } from "../API/urls";
  import _ from "lodash";
  import { fade } from "svelte/transition";

  export let board;
  export let refetchBoards;
  export let showControls;
  let user;

  const coverColors = [
    "bg-red-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-green-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-teal-200",
    "bg-orange-200",
  ];
  const { session } = stores();

  onMount(() => {
    user = $session.user;
  });

  let canEditBoardName = false;
  let isChangingBoardName = false;
  let boardName = _.get(board, "name", "");

  async function navigateToBoard(event) {
    if (showControls) {
      await goto(`/boards/${board.id}`);
    } else {
      await goto(`${window.location.pathname}/${board.id}`);
    }
  }

  async function onDeleteBoardClick() {
    await API.del(`${urls.board.index}/${board.id}`);
    refetchBoards();
  }

  async function onRenameBoard(event) {
    if (boardName) {
      isChangingBoardName = true;
      await API.patch(`${urls.board.index}/${board.id}`, { name: boardName });
      refetchBoards();
    } else {
      boardName = board.name;
    }
    canEditBoardName = false;
  }

  function renameBoardClick() {
    if (!isChangingBoardName && showControls) {
      canEditBoardName = true;
    }
  }

  function getBoardCoverColorClass() {
    const id = board.id;
    return coverColors[id % coverColors.length];
  }
</script>

<button class="mr-4 my-4" on:click={navigateToBoard} transition:fade>
  <div
    class={`relative bg-white border-2 p-2 rounded h-48 sm:w-48 w-full shadow-xl
      hover:shadow-2xl hover:bg-gray-100 flex flex-col  cover ${showControls ? 'justify-between' : 'justify-end'}`}>
    {#if showControls}
      <div class="flex justify-end z-10">
        <InlineMenu>
          <button
            slot="menu-item-1"
            class="w-full p-2 hover:bg-gray-200 border-b flex items-center"
            on:click|stopPropagation={renameBoardClick}>
            <i class="fas fa-edit w-8" />
            Rename
          </button>
          <button
            slot="menu-item-2"
            class="w-full p-2 hover:bg-gray-200 hover:text-red-700 flex
              items-center"
            on:click|stopPropagation={onDeleteBoardClick}>
            <i class="fas fa-trash w-8" />
            Delete
          </button>
        </InlineMenu>
      </div>
    {/if}
    <div
      class={`${getBoardCoverColorClass()} absolute top-0 left-0 h-full w-full overflow-hidden`}>
      <img src="linkbg.png" alt="cover" class="absolute top-0 left-0 w-full" />
    </div>
    {#if canEditBoardName}
      <input
        placeholder="Board Name"
        bind:value={boardName}
        on:blur|stopPropagation={onRenameBoard}
        on:click|stopPropagation
        on:keydown|stopPropagation
        on:keypress|stopPropagation
        on:keyup|stopPropagation
        class="px-2 py-3 border rounded bg-white z-10 h-12" />
    {:else}
      <button
        class="font-semibold hover:bg-white rounded bg-white z-10 h-12
          bg-opacity-50"
        on:click|stopPropagation={renameBoardClick}>
        {`${board.name}`}
      </button>
    {/if}
  </div>
</button>
