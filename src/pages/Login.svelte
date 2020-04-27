<script>
    import { auth, googleProvider, userSubscribe } from '../firebase';
    import Profile from '../components/Profile.svelte';

    let user;
    const unsubscribe = userSubscribe(u => user = u);
 
    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>

<h1 class="pg-heading">Login Page</h1>

{#if user}
    <Profile {...user} />
    <button class="btn btn-blue"
        on:click={ () => auth.signOut() }>
        Logout
    </button>
{:else}
	<button class="btn btn-blue"
        on:click={login}>
		Signin with Google
	</button>
{/if}
