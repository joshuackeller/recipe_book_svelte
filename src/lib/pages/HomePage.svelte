<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import TextInput from '$lib/components/fields/TextInput.svelte';
	import DocumentTextIcon from '$lib/components/icons/DocumentTextIcon.svelte';
	import UserGroupIcon from '$lib/components/icons/UserGroupIcon.svelte';
	import video from '$lib/assets/recipe_book_demo.mp4';
	import { onMount } from 'svelte';

	let email: string = '';
	let name: string = '';
</script>

<div class="grid gap-5">
	<h1 class="text-center text-5xl">
		pantry<span class="blinking-element">_</span>
	</h1>
	<div class="border-2 border-black p-5 rounded-xl">
		<video src={video} autoplay muted loop class="aspect-[16/11] max-h-[600px] object-cover">
			<source src={video} type="video/mp4" />
			<track kind="captions" />
		</video>
	</div>
	<div class="flex gap-5">
		<div class="flex flex-1 items-center gap-x-5 p-5 border- border-black rounded-xl">
			<DocumentTextIcon classes="h-16 w-16" />
			<div>
				<div class="text-2xl font-bold">Save your recipes</div>
				<p>Store all your recipes in one place. Access them from anywhere</p>
			</div>
		</div>
		<div class="flex flex-1 items-center gap-x-5 p-5 border- border-black rounded-xl">
			<UserGroupIcon classes="h-16 w-16" />
			<div>
				<div class="text-2xl font-bold">Share recipes</div>
				<p>Create groups and shares recipes with family and friends.</p>
			</div>
		</div>
	</div>
	<div class="flex p-5 border-2 border-black rounded-xl">
		<div class="flex-1">
			<div class="text-xl font-bold">Ready to sign up?</div>
			<p>
				We're still in beta, so right now we're currently only accepting waitlist users. Enter your
				email and we'll reach out as soon as possible!
			</p>
		</div>
		<div class="flex-1 grid gap-y-2">
			<TextInput bind:value={name} name="name" type="text" placeholder="John Doe" />
			<TextInput bind:value={email} name="email" type="email" placeholder="johndoe@email.com" />
			<Button text="Join Waitlist" classes="w-full" />
		</div>
	</div>
</div>

<style>
	.blinking-element {
		animation: blink-animation 1s infinite;
	}

	@keyframes blink-animation {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
