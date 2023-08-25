<script>
	import '../app.css';
	import AuthWrapper from '../primary/components/auth/AuthWrapper.svelte';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();
	// https://www.reddit.com/r/sveltejs/comments/x7jdy7/the_differences_between_pagejs_pageserverjs_and/
</script>

<QueryClientProvider client={queryClient}>
	<div class="max-w-4xl mx-auto p-5">
		<AuthWrapper>
			<slot />
		</AuthWrapper>
	</div>
</QueryClientProvider>
