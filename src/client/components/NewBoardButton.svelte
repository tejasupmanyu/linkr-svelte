<script>
  import {
    uniqueNamesGenerator,
    starWars,
    adjectives,
    colors,
  } from "unique-names-generator";
  import API from "../API";
  import { urls } from "../API/urls";
  import { fade } from "svelte/transition";

  export let onAddNewBoard;

  const nameGeneratorConfig = {
    dictionaries: [adjectives, colors, starWars],
    length: 3,
    separator: " ",
    style: "capital",
  };
  async function onAddNewBoardClick() {
    const randomBoardName = uniqueNamesGenerator(nameGeneratorConfig);
    const createdBoard = await API.post(urls.board.index, {
      name: randomBoardName,
    });
    onAddNewBoard && (await onAddNewBoard(createdBoard));
  }
</script>

<style>
  button:hover {
    font-size: 2.5em;
    border-width: 6px;
  }
</style>

<button
  class="bg-white border-4 border-rausch border-dashed rounded h-48 sm:w-48
  w-full mr-4 my-4 text-rausch font-semibold text-3xl hover:text-rausch-dark
  hover:shadow-xl"
  {...$$props}
  on:click={onAddNewBoardClick}
  transition:fade>
  <i class="fa fa-plus" />
</button>
