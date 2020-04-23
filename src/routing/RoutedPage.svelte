<script>
  import Login from '../pages/Login.svelte';

  import router from "page";
  import routes from "./routes.js";
  import { userSubscribe } from "../firebase";

  let page;
  let params;
  let auth;

  let user;
  const unsubscribe = userSubscribe(u => (user = u));

  // Iterate through the routes
  routes.forEach(route => {
    router(
      route.path,

      (ctx, next) => {
        auth = route.auth;
        params = ctx.params;
        next();
      },

      () => {
        page = route.component;
      }
    );
  });

  // Start the router
  router.start();
</script>

<style>
  main {
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>

<main>
  {#if !auth || user}
    <svelte:component this={page} {params} />
  {:else}
    <Login/>
  {/if}

</main>
