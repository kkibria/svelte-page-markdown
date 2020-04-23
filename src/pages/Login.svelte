<script>
    import { auth, googleProvider, userSubscribe } from '../firebase';
    import Profile from '../components/Profile.svelte';

    let user;
    const unsubscribe = userSubscribe(u => user = u);
 
    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<h1>Login Page</h1>

{#if user}
    <Profile {...user} />
    <button on:click={ () => auth.signOut() }>Logout</button>
{:else}
	<button on:click={login}>
		Signin with Google
	</button>
{/if}
