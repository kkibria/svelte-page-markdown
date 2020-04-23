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

<main>
 <svelte:component this={page} params={params} />
</main>

<style>
  main {
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>