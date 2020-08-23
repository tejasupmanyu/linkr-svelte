<script>
  import API from "../API";
  import { urls } from "../API/urls";
  import { isValidUrl } from "../utils/helpers";
  import { fade } from "svelte/transition";

  export let onAddNewPost;
  export let boardId;

  let linkUrl = "";
  let text = "";
  let linkUrlError = "";

  async function onAddNewPostClick() {
    const isValidLink = isValidUrl(linkUrl);
    if (isValidLink) {
      linkUrlError = "";
      const createdBoard = await API.post(`${urls.post.index}`, {
        linkUrl,
        text,
        boardId,
      });
      onAddNewPost && (await onAddNewPost());
      reset();
    } else {
      linkUrlError = "Not a valid url";
    }
  }

  function reset() {
    linkUrl = "";
    text = "";
    linkUrlError = "";
  }
</script>

<style>
  textarea {
    resize: none;
  }
</style>

<section class="border rounded w-full flex flex-col p-2 m-2" transition:fade>
  <input
    class="border rounded my-2 p-2"
    bind:value={linkUrl}
    placeholder="url" />
  <span class="text-red-500">{linkUrlError}</span>
  <textarea
    class="border h-rounded h-24 my-2 p-2"
    bind:value={text}
    placeholder="Enter something ..." />
  <div class="self-end">
    <span
      class={`mr-2  ${text.length > 220 ? 'text-orange-500' : 'text-green-500'}`}>
      {240 - text.length}
    </span>
    <button
      class="bg-rausch rounded text-white py-2 px-3 disabled:opacity-50
      disabled:bg-rausch hover:bg-rausch-dark"
      disabled={!linkUrl || text.length > 240}
      on:click={onAddNewPostClick}>
      Create
    </button>
  </div>

</section>
