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
</script>

<section class="p-8">
  <section class="sm:w-1/2 w-full m-auto flex flex-col items-center">
    <div class="self-start">
      <a class="mb-4 hover:text-rausch" href={`/boards`}>
        <i class="fas fa-arrow-left" /> All boards
      </a>
      <h1 class="mx-auto font-bold text-3xl sm:text-6xl">🎯 {board.name}</h1>
    </div>
    <NewPost onAddNewPost={fetchBoardDetails} {boardId} author={user} />
    {#each postsInBoard as post, i (post.id)}
      <Post {post} showControls refetch={fetchBoardDetails} author={user} />
    {/each}
  </section>
</section>
