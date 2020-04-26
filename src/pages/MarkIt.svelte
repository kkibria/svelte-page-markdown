<script>
	import markdownIt from "markdown-it";
	import * as jq from 'jquery';
	
	const instance = new markdownIt();
	
	let value = "Hello, *this* is some **markdown**!";
</script>

<textarea bind:value style="width: 100%" />

{@html instance.render(value)}