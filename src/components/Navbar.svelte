<script>
  import { userSubscribe } from "../firebase";

  let user;
  const unsubscribe = userSubscribe(u => (user = u));
</script>

<style>
  header {
    padding-top: 1em;
  }
  nav a {
    @apply bg-blue-500 text-white mr-4 no-underline font-bold px-4 py-2 rounded;
  }
  nav a:hover {
    @apply bg-blue-700;
  }
</style>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    {#if user}
      <a href="/todo">Todo</a>
      <a href="/private">Secret Page</a>
      <a href="/mdedit/0">Markdown Edit</a>
    {/if}
    <a href="/login">Login</a>
  </nav>
</header>
