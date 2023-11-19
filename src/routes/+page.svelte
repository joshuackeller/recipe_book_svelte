<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import TextInput from '$lib/components/fields/TextInput.svelte';
	import DocumentTextIcon from '$lib/components/icons/DocumentTextIcon.svelte';
	import UserGroupIcon from '$lib/components/icons/UserGroupIcon.svelte';
	import video from '$lib/assets/recipe_book_demo.mp4';
	import useCreateWaitlistMember from '$lib/context/mutations/waitlist/useCreateWaitlistMember';
	import { waitlist } from '$lib/stores/waitlist';
	import ErrorMessage from '$lib/components/base/ErrorMessage.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { token } from '$lib/stores/token';

	let email: string = '';
	let name: string = '';

	const createWaitlistMember = useCreateWaitlistMember();

	const handleCreateWaitlistMember = () => {
		$createWaitlistMember.mutateAsync(
			{ email, name },
			{
				onSuccess: () => {
					waitlist.set(true);
				},
				onError: (error) => {
					console.log(error);
				}
			}
		);
	};

	onMount(() => {
		if (!!$token) {
			goto(`/recipes`);
		}
	});
</script>

<div class="grid gap-5">
	<h1 class="text-center text-5xl">
		recipio<span class="blinking-element">_</span>
	</h1>
	<div class="border-2 border-black p-5 rounded-xl">
		<video src={video} autoplay muted loop class="aspect-[16/11] max-h-[600px] object-cover">
			<source src={video} type="video/mp4" />
			<track kind="captions" />
		</video>
	</div>
	<div class="flex gap-5">
		<div class="flex flex-1 items-center gap-x-5 p-5 border-2 border-black rounded-xl">
			<DocumentTextIcon classes="h-16 w-16 hidden md:block" />
			<div>
				<div class="text-2xl font-bold">Save your recipes</div>
				<p>Store all your recipes in one place. Access them from anywhere</p>
			</div>
		</div>
		<div class="flex flex-1 items-center gap-x-5 p-5 border-2 border-black rounded-xl">
			<UserGroupIcon classes="h-16 w-16 hidden md:block" />
			<div>
				<div class="fle mt-0">
					<p class="text-2xl font-bold">Share recipes</p>
				</div>
				<p>Create groups and shares recipes with family and friends.</p>
			</div>
		</div>
	</div>
	<div class="flex flex-col sm:flex-row gap-5 p-5 border-2 border-black rounded-xl">
		<div class="flex-1">
			<div class="text-xl font-bold">Ready to sign up?</div>
			<p>
				We're still in beta, so right now we're currently only accepting waitlist users. Enter your
				email and we'll reach out as soon as possible!
			</p>
		</div>
		{#if $waitlist === true}
			<div class="flex-1 flex flex-col items-center">
				<CheckCircleIcon classes="h-10 w-10" />
				<p class="font-bold text-lg">Thanks for signing up!</p>
				<p class="font-bold text-lg">We'll be in touch soon!</p>
			</div>
		{:else}
			<form on:submit|preventDefault={handleCreateWaitlistMember} class="flex-1 grid gap-y-2">
				<TextInput bind:value={name} name="name" type="text" placeholder="John Doe" required />
				<TextInput
					bind:value={email}
					name="email"
					type="email"
					placeholder="johndoe@email.com"
					required
				/>
				<Button
					text="Join Waitlist"
					classes="w-full"
					type="submit"
					isLoading={$createWaitlistMember.isLoading}
					disabled={$createWaitlistMember.isLoading}
				/>
				<ErrorMessage error={$createWaitlistMember.error} />
			</form>
		{/if}
	</div>
	<div>
		<a href="/recipes" class="text-sm">Sign In</a>
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
