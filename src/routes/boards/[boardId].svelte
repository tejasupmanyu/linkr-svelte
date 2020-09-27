<script context="module">
  export async function preload({ params }, { user }) {
    if (!user) {
      this.redirect(302, "/");
    }
    let { boardId } = params;
    const res = await this.fetch(`/api/board/${boardId}`, {
      headers: { "Content-Type": "application/json" },
    });
    const boardDetails = await res.json();
    return { boardId, boardDetails, user };
  }
</script>

<script>
  import { onMount } from "svelte";
  import API from "../../client/API";
  import { urls } from "../../client/API/urls";
  import NewPost from "../../client/components/NewPost.svelte";
  import Post from "../../client/components/Post.svelte";
  import _ from "lodash";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

  export let boardDetails;
  export let boardId;
  export let user;

  let board = boardDetails;
  let postsInBoard;
  $: postsInBoard = _.get(board, "posts", []);

  onMount(() => {
    board = boardDetails;
  });

  async function fetchBoardDetails() {
    const boardResponse = await API.get(`${urls.board.index}${boardId}`);
    board = await boardResponse.json();
  }

  function onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    addNotification({
      text: "Copied Board URL!",
      position: "top-center",
      removeAfter: 4000,
    });
  }
</script>

<section class="p-8">
  <section class="sm:w-1/2 w-full m-auto flex flex-col items-center">
    <div class="self-start w-full">
      <a class="mb-4 hover:text-rausch" href={`/boards`}>
        <i class="fas fa-arrow-left" />
        All boards
      </a>
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-3xl sm:text-6xl">🎯 {board.name}</h1>
        <button
          class="text-gray-600 hover:text-gray-800 hover:bg-gray-300 text-xl
          focus:bg-gray-300 focus:outline-none py-1 px-2 rounded mx-2 h-12"
          on:click={onCopyLink}>
          <i class="far fa-copy" />
        </button>
      </div>
    </div>
    <NewPost onAddNewPost={fetchBoardDetails} {boardId} author={user} />
    {#each postsInBoard as post, i (post.id)}
      <Post {post} showControls refetch={fetchBoardDetails} author={user} />
    {/each}
  </section>
</section>
