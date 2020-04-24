<script>
  export const name = "someapp";

  import Navbar from "./components/Navbar.svelte";
  import RoutedPage from "./routing/RoutedPage.svelte";
  import Todos from "./components/Todo/Todos.svelte";

  import Tailwindcss from "./Tailwindcss.svelte";
</script>

<style>
  div.c-page {
    --header-height: 10vh;
    --footer-height: 5vh;
    --content-height: calc(99vh - var(--header-height) - var(--footer-height));
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
  }
  div.c-footer {
    height: var(--footer-height);
    overflow-y: auto;
  }
</style>

<div class="c-page">
  <div class="c-header">
    <h1 class="font-bold">A Markdown Blog with Svelte + Firebase + PageJs + TailsindCSS</h1>
    <Navbar />
    <hr />
  </div>
  <div class="c-content">
    <RoutedPage />
  </div>
  <div class="c-footer">
    <hr />
    <p>
      <a href="https://github.com/kkibria/svelte-page-blog">source code in github</a>
    </p>
  </div>
</div>
