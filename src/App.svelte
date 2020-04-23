<script>
	export const name = 'someapp';

    import Navbar from './components/Navbar.svelte';
    import RoutedPage from './routing/RoutedPage.svelte';
    import Todos from './components/Todo/Todos.svelte';
 
    import Tailwindcss from './Tailwindcss.svelte';

</script>

<section>
    <h1 class="font-bold">A Page blog</h1>
    <Navbar/>
    <hr>

    <RoutedPage></RoutedPage>
 
    <hr>
    <p><a href='https://github.com/kkibria/svelte-todo'>source code in github</a></p>
</section>

<style lang="postcss">
    h1 {
        @apply font-bold text-2xl;
    }
</style>