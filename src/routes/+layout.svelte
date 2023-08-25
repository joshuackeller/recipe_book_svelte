<script>
	import '../app.css';
	import AuthWrapper from '../primary/components/auth/AuthWrapper.svelte';
</script>

<div class="max-w-4xl mx-auto p-5">
	<AuthWrapper>
		<slot />
	</AuthWrapper>
</div>
