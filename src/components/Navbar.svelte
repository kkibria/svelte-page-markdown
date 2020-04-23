<script>
  import { userSubscribe } from '../firebase';

  let user;
  const unsubscribe = userSubscribe(u => user = u);
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
{#if user}
    <a href="/todo">Todo</a>
    <a href="/private">Secret Page</a>
{/if}
    <a href="/login">Login</a>
  </nav>
</header>

<style>
  header {
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  nav a {
    margin-right: 10px;
    text-decoration: none;
  }
</style>