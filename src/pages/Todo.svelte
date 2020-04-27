<script>
  import Todos from "../components/Todo/Todos.svelte";

  import { userSubscribe } from "../firebase";
  let user;
  const unsubscribe = userSubscribe(u => (user = u));
</script>

<h1 class="pg-heading">To do</h1>
{#if user}
  <Todos uid={user.uid} />
{/if}
