<script lang="ts">
	import '../app.css';
	import AuthWrapper from '../lib/components/auth/AuthWrapper.svelte';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000
				// cacheTime: 60 * 1000
			}
		}
	});
	// https://www.reddit.com/r/sveltejs/comments/x7jdy7/the_differences_between_pagejs_pageserverjs_and/
</script>

<body>
	<QueryClientProvider client={queryClient}>
		<div class="max-w-4xl mx-auto p-5">
			<AuthWrapper>
				<slot />
			</AuthWrapper>
		</div>
		<SvelteQueryDevtools />
	</QueryClientProvider>
</body>
