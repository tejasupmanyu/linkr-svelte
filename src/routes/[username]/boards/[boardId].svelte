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
  import Post from "../../../client/components/Post.svelte";
  import _ from "lodash";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

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
  {#if boardDetails}
    <section class="sm:w-1/2 w-full m-auto flex flex-col items-center">
      <div class="self-start w-full">
        <a
          class="mb-4 hover:text-rausch"
          href={`${userDetails.username}/boards`}>
          <i class="fas fa-arrow-left" />
          All boards by
          {`@${userDetails.username}`}
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
      {#each postsInBoard as post, i (post.id)}
        <Post {post} author={userDetails} showControls={false} />
      {/each}
      {#if _.isEmpty(postsInBoard)}
        <p>There's nothing here yet.</p>
      {/if}
    </section>
  {:else}
    <h1 class="text-6xl text-red-500 font-bold">404</h1>
    <h2 class="text-3xl">😕 No such board found!</h2>
  {/if}
</section>
