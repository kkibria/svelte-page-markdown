<script>
	export const name = 'someapp';

    import Tailwindcss from './Tailwindcss.svelte';
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<section>
<h1 class="font-bold">A Page blog</h1>

{#if user}
    <Profile {...user} />
    <button on:click={ () => auth.signOut() }>Logout</button>
    <hr>
    <Todos uid={user.uid} />
{:else}
	<button on:click={login}>
		Signin with Google
	</button>
{/if}
<hr>
<p><a href='https://github.com/kkibria/svelte-todo'>source code in github</a></p>
</section>

<style lang="postcss">
h1 {
  @apply font-bold text-2xl;
}
</style>