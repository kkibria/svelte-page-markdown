<script>
  export const name = "someapp";

  import Navbar from "./components/Navbar.svelte";
  import RoutedPage from "./routing/RoutedPage.svelte";
  import Todos from "./components/Todo/Todos.svelte";

  import Tw from "./Tailwindcss.svelte";
  import sg from "./Sitecss.svelte";
</script>

<style>
  div.c-page {
    height: 100vh;
    --header-height: 5rem;
    --footer-height: 2rem;
    --content-height: calc(100% - var(--header-height) - var(--footer-height));
    --header-padding: 1rem;
  }

  div.c-header {
    height: var(--header-height);
    overflow-y: auto;
    @apply bg-gray-200;
    padding-left: var(--header-padding);
  }
  div.c-content {
    height: var(--content-height);
    overflow-y: auto
  }
  div.c-footer {
    height: var(--footer-height);
    overflow-y: auto;
    padding-left: var(--header-padding);
    @apply text-white bg-gray-700;
  }
</style>

<div class="c-page">
  <div class="c-header">
    <h1 class="font-bold">A Markdown Blog with Svelte + Firebase + PageJs + TailwindCSS + Markdown-it</h1>
    <Navbar />
    <hr />
  </div>
  <div class="c-content">
    <RoutedPage />
  </div>
  <div class="c-footer">
    <p>
      <a href="https://github.com/kkibria/svelte-page-blog">Source code in Github</a>
    </p>
  </div>
</div>
