import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		messagetext: 'Plan your transition'
	}
});

export default app;