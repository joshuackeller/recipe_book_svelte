<script lang="ts">
	export let error: any;

	let message: string | undefined;
	$: {
		const response = error?.response?.data;
		if (!!response?.message) {
			message = response.message;
		} else if (!!response?.error) {
			if (typeof response.error === 'string') {
				message = response.error;
			} else {
				if (!!response.error.name && response.error.name === 'ZodError') {
					if (response.error.issues && response.error.issues.length > 0) {
						message = response.error.issues[0].message;
					}
				}
			}
		}
	}
</script>

{#if !!error}
	<p class="text-red-500 text-sm my-2">
		{message ?? 'Unkown Error'}
	</p>
{/if}
