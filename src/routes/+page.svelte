<script lang="ts">
	let myNumberVar = 4;

	const increment = () => {
		myNumberVar++;
	};
	const decrement = () => {
		myNumberVar--;
	};
</script>

<div class="flex gap-2 p-5 text-2xl">
	<button on:click={decrement}>-</button>
	<h1>{myNumberVar}</h1>
	<button on:click={increment}>+</button>
</div>
