<script>
  import router from "page";
  import routes from "./routes.js";
  import { userSubscribe } from '../firebase';

  let page;
  let params;

  let user;
  const unsubscribe = userSubscribe(u => user = u);

  // Iterate through the routes
  routes.forEach(route => {
    router(
      route.path,

      (ctx, next) => {
        params = ctx.params;
        next();
      },

      () => {
        if (route.auth && !user) {
          router.redirect("/login");
        } else {
          page = route.component;
        }
      }
    );
  });

  // Start the router
  router.start();
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
  
{#if user}
    <a href="/private">Secret Page</a>
{/if}
  </nav>
</header>

<main>
 <svelte:component this={page} params={params} />
</main>

<style>
  main,
  header {
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  nav a {
    margin-right: 10px;
    text-decoration: none;
  }
</style>