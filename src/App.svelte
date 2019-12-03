<script>
	export let messagetext;
	import { jsonData } from "./stores.js";
	import Upload from './Upload.svelte';
	import CoursesView from './CoursesView.svelte';
</script>
<header>
	<h1>{messagetext}</h1>
</header>
<main>
	<Upload />
	<CoursesView data={$jsonData} />
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	header {
		background-color: purple;
		color: white;
		text-align: center;
		margin: 0;
	}
	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>