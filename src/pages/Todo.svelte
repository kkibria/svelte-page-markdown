<script>
    import Todos from '../components/Todo/Todos.svelte';
 
    import { userSubscribe } from '../firebase';
    let user;
    const unsubscribe = userSubscribe(u => user = u);
</script>

{#if user}
    <Todos uid={user.uid} />
{/if}
