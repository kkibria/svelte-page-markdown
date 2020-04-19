<script>
  import router from "page";
  import routes from "./routes.js";

  let page;
  let params;
  let user = true;

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
    <a href="/private">Secret Page</a>
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