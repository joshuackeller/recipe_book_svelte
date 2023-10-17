<script>
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

<svelte:head>
	<script>
		(function (h, o, t, j, a, r) {
			h.hj =
				h.hj ||
				function () {
					(h.hj.q = h.hj.q || []).push(arguments);
				};
			h._hjSettings = { hjid: 3698137, hjsv: 6 };
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
			a.appendChild(r);
		})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
	</script>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="max-w-4xl mx-auto p-5">
		<AuthWrapper>
			<slot />
		</AuthWrapper>
	</div>
	<SvelteQueryDevtools />
</QueryClientProvider>
