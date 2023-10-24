<script lang="ts">
	import { page } from '$app/stores';
	import useCreateAccount from '../../context/mutations/auth/useCreateAccount';
	import useSignIn from '../../context/mutations/auth/useSignIn';
	import { token } from '../../stores/token';
	import Button from '../base/Button.svelte';
	import TextInput from '../fields/TextInput.svelte';
	import ErrorMessage from '../base/ErrorMessage.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	enum AuthFlow {
		sign_in = 'sign_in',
		create_account = 'create_account'
	}

	let authFlow: AuthFlow = AuthFlow.sign_in;
	$: {
		let authFlowParam = $page.url.searchParams.get('authFlow');
		if (!!authFlowParam) {
			if (authFlowParam === AuthFlow.create_account || authFlowParam === AuthFlow.sign_in) {
				authFlow = authFlowParam;
			}
		}
	}

	let email: string = '';
	let password: string = '';
	let name: string = '';

	const signIn = useSignIn();
	const handleSignIn = async () => {
		await $signIn.mutateAsync(
			{ email, password },
			{
				onSuccess: (response) => {
					if (!!response?.token) {
						token.set(response.token);
					}
				}
			}
		);
	};

	const createAccount = useCreateAccount();
	const handleCreateAccount = async () => {
		await $createAccount.mutateAsync(
			{ email, password, name },
			{
				onSuccess: (response) => {
					if (!!response?.token) {
						token.set(response.token);
					}
				}
			}
		);
	};
</script>

<div>
	{#if authFlow === AuthFlow.sign_in}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<form class="space-y-2" on:submit|preventDefault={handleSignIn}>
					<h2 class="text-center mb-2">Sign In</h2>
					<div>
						<TextInput bind:value={email} name="email" type="email" label="Email" />
						<TextInput bind:value={password} type="password" name="password" label="Password" />
					</div>
					<Button isLoading={$signIn.isLoading} text="Sign In" type="submit" classes="w-full" />
				</form>
				<!-- <div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=create_account`}
						class="pt-4 pb-1 text-center text-xs cursor-pointer">or Create Account</a
					>
				</div> -->
			</div>
		</div>
	{:else}
		<div class="flex justify-center py-20">
			<div class="w-full max-w-sm">
				<div class="p-5 border-2 border-black rounded-xl">
					<form class="space-y-2" on:submit|preventDefault={handleCreateAccount}>
						<h2 class="text-center mb-2">Create Account</h2>
						<div>
							<TextInput bind:value={name} name="name" type="text" label="Name" />
							<TextInput bind:value={email} name="email" type="email" label="Email" />
							<TextInput bind:value={password} type="password" name="password" label="Password" />
						</div>
						<Button
							isLoading={$createAccount.isLoading}
							text="Create Account"
							type="submit"
							classes="w-full"
						/>
					</form>
					<div class="flex justify-center">
						<a
							href={`${$page.url.pathname}?authFlow=sign_in`}
							class="pt-4 pb-1 text-center text-xs cursor-pointer"
							>or Sign In
						</a>
					</div>
				</div>
				<ErrorMessage error={$createAccount.error} />
			</div>
		</div>
	{/if}
</div>
