<script context="module">
  export async function preload({ params }, { user }) {
    let { boardId, username } = params;
    if (user && user.username === username) {
      this.redirect(302, `/boards/${boardId}`);
    }
    try {
      const boardResponse = await this.fetch(`/api/board/${boardId}`, {
        headers: { "Content-Type": "application/json" },
      });
      const boardDetails = await boardResponse.json();
      const userResponse = await this.fetch(`/api/user/${username}`, {
        headers: { "Content-Type": "application/json" },
      });
      const userDetails = await userResponse.json();
      if (
        !(boardDetails && userDetails && boardDetails.UserId === userDetails.id)
      ) {
        return { board, username };
      } else {
        return { boardId, boardDetails, username, userDetails };
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<script>
  import { onMount } from "svelte";
  import { urls } from "../../../client/API/urls";
  import NewPost from "../../../client/components/NewPost.svelte";
  import Post from "../../../client/components/Post.svelte";
  import _ from "lodash";

  export let boardDetails;
  export let boardId;
  export let userDetails;

  let board = boardDetails;
  let postsInBoard = _.get(board, "posts", []);

  onMount(() => {
    board = boardDetails;
  });

  async function fetchBoardDetails() {
    const boardResponse = await API.get(`${urls.board.index}${boardId}`);
    board = await boardResponse.json();
  }
</script>

<section class="p-8">
  {#if boardDetails}
    <section class="sm:w-1/2 w-full m-auto flex flex-col items-center">
      <div class="self-start">
        <a
          class="mb-4 hover:text-rausch"
          href={`${userDetails.username}/boards`}>
          <i class="fas fa-arrow-left" />
          All boards by {`@${userDetails.username}`}
        </a>
        <h1 class="mx-auto font-bold text-3xl sm:text-6xl">🎯 {board.name}</h1>
      </div>
      {#each postsInBoard as post, i (post.id)}
        <Post {post} author={userDetails} showControls={false} />
      {/each}
    </section>
  {:else}
    <h1 class="text-6xl text-red-500 font-bold">404</h1>
    <h2 class="text-3xl">😕 No such board found!</h2>
  {/if}
</section>
