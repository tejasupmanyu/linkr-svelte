<script>
  import _ from "lodash";

  export let author;

  let authorImgUrl = _.get(author, "profileImageUrl", "user.svg");
</script>

{#if author}
  <div class="flex items-center">
    <img class="rounded-full h-12 w-12" src={authorImgUrl} alt="user avatar" />
    <div class="flex flex-col ml-2">
      <p class="font-medium">
        {_.get(author, 'displayName', author.firstName)}
      </p>
      <p class="font-light">@{author.username}</p>
    </div>
  </div>
{/if}
