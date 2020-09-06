<script context="module">
  export function preload(page, { user }) {
    if (user) {
      return this.redirect(302, "/");
    }
    return { user };
  }
</script>

<svelte:head>
  <title>Linkr - Sign In</title>
</svelte:head>

<section class="w-full h-full p-8 wire-bg flex flex-grow flex-col">
  <section
    class="sm:w-1/4 sm:h-1/4 w-full h-1/2 border p-4 m-auto inset-auto my-40
      flex justify-center flex-col shadow-xl rounded bg-white">
    <a href="/" class="hover:text-rausch mb-2">
      <i class="fas fa-arrow-left" /> Go back to home
    </a>
    <p class="font-medium text-3xl mb-4">Join Linkr</p>
    <a
      href="/auth/google"
      class="px-4 py-2 bg-rausch hover:bg-rausch-dark text-white rounded">
      Sign In With Google
    </a>
  </section>
</section>
