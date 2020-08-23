<script>
  import { onMount } from "svelte";
  import API from "../API";
  import { urls } from "../API/urls";
  import _ from "lodash";
  import dayjs from "dayjs";
  import LocalizedFormat from "dayjs/plugin/localizedFormat";
  import { fade } from "svelte/transition";
  import InlineMenu from "./InlineMenu.svelte";
  import PostAuthorInfo from "./PostAuthorInfo.svelte";

  dayjs.extend(LocalizedFormat);

  export let post;
  export let showControls;
  export let refetch;
  export let author;

  let previewData;
  const { linkUrl, text, id, BoardId } = post;

  onMount(async () => {
    try {
      const linkPreviewData = await API.get(`${urls.post.linkPreview}${id}`);
      if (linkPreviewData.ok) {
        previewData = await linkPreviewData.json();
      }
    } catch (err) {
      console.log(err);
    }
  });

  async function onCopyLink() {
    await navigator.clipboard.writeText(linkUrl);
  }

  async function onDeletePostClick() {
    try {
      await API.del(`${urls.post.index}${id}`, { boardId: BoardId });
      refetch && (await refetch());
    } catch (err) {
      console.log(err);
    }
  }
</script>

<section
  class="border rounded w-full flex flex-col p-2 my-3 mx-2 hover:shadow-xl ">
  <div class="flex items-center justify-between">
    <PostAuthorInfo {author} />
    <div class="flex items-center">
      <button
        class="text-gray-600 hover:text-gray-800 hover:bg-gray-300 text-xl
        focus:bg-gray-300 focus:outline-none py-1 px-2 rounded mx-2"
        on:click={onCopyLink}>
        <i class="far fa-copy" />
      </button>
      {#if showControls}
        <InlineMenu>
          <button
            slot="menu-item-1"
            class="w-full p-2 hover:bg-gray-200 hover:text-red-700 flex
            items-center"
            on:click|stopPropagation={onDeletePostClick}>
            <i class="fas fa-trash w-8" />
            Delete
          </button>
        </InlineMenu>
      {/if}
    </div>
  </div>
  <div class="my-2">
    <a
      class="text-rausch hover:text-rausch-dark"
      href={linkUrl}
      target="_blank">
      {linkUrl}
    </a>
  </div>

  {#if !_.isEmpty(previewData)}
    <a
      class="border rounded p-2 my-2 flex flex-col hover:bg-gray-200 "
      href={linkUrl}
      target="_blank"
      transition:fade>
      <img src={previewData.img} alt="preview" class="mb-2 rounded" />
      <div>
        <div class="uppercase mb-1">{previewData.domain}</div>
        <p class="font-medium">{previewData.title}</p>
        <p class="text-sm">{previewData.description}</p>
      </div>
    </a>
  {/if}
  <p>{text}</p>
  <div class="flex justify-end">
    <div class="text-gray-600 text-sm ">
      {dayjs(post.createdAt).format('lll')}
    </div>
  </div>
</section>
