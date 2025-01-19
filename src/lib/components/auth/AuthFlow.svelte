<script lang="ts">
	import { page } from '$app/stores';
	import useCreateAccount from '../../context/mutations/auth/useCreateAccount';
	import useSignIn from '../../context/mutations/auth/useSignIn';
	import useResendConfirmationEmail from '../../context/mutations/auth/useResendConfirmationEmail';
	import { token } from '../../stores/token';
	import Button from '../base/Button.svelte';
	import TextInput from '../fields/TextInput.svelte';
	import ErrorMessage from '../base/ErrorMessage.svelte';
	import useResetPasswordRequest from '$lib/context/mutations/auth/useResetPasswordRequest';

	enum AuthFlow {
		sign_in = 'sign_in',
		create_account = 'create_account',
		resend = 'resend',
		confirm_error = 'confirm_error',
		confirm_success = 'confirm_success',
		reset_password_request = 'reset_password_request',
		reset_password = 'reset_password'
	}

	let authFlow: AuthFlow = AuthFlow.sign_in;
	$: {
		let authFlowParam = $page.url.searchParams.get('authFlow');
		if (!!authFlowParam) {
			if (
				authFlowParam === AuthFlow.create_account ||
				authFlowParam === AuthFlow.sign_in ||
				authFlowParam === AuthFlow.resend ||
				authFlowParam === AuthFlow.confirm_error ||
				authFlowParam === AuthFlow.confirm_success
			) {
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
		await $createAccount.mutateAsync({ email, password, name });
	};

	const resendConfirmationEmail = useResendConfirmationEmail();
	const handleResendEmail = async () => {
		await $resendConfirmationEmail.mutateAsync({ email });
	};

	const resetPasswordRequest = useResetPasswordRequest();
	const handleResetPasswordRequest = async () => {
		await $resetPasswordRequest.mutateAsync({ email });
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
					<Button isLoading={$signIn.isPending} text="Sign In" type="submit" classes="w-full" />
				</form>
				<div class="flex flex-col justify-center items-center gap-1 text-xs underline pt-3">
					<!-- <a
						href={`${$page.url.pathname}?authFlow=create_account`}
						class="pt-4 pb-1 text-center text-xs cursor-pointer">or create an account</a
					> -->
					<a
						href={`${$page.url.pathname}?authFlow=${AuthFlow.resend}`}
						class="text-center cursor-pointer">Resend the Confirmation Email</a
					>
				</div>
				<ErrorMessage error={$signIn.error} />
			</div>
		</div>
	{:else if authFlow === AuthFlow.create_account}
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
							isLoading={$createAccount.isPending}
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
	{:else if authFlow === AuthFlow.resend}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<form class="space-y-2" on:submit|preventDefault={handleResendEmail}>
					<h2 class="text-center mb-2">Resend Confirmation</h2>
					<div>
						<TextInput bind:value={email} name="email" type="email" label="Email" />
					</div>
					<Button
						isLoading={$resendConfirmationEmail.isPending}
						isSuccess={$resendConfirmationEmail.isSuccess}
						successText={'Email Sent'}
						disabled={$resendConfirmationEmail.isPending || $resendConfirmationEmail.isSuccess}
						text="Resend Email"
						type="submit"
						classes="w-full"
					/>
				</form>
				<div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=sign_in`}
						class="pt-4 pb-1 text-center text-xs cursor-pointer"
						>or <span class="underline">sign in</span></a
					>
				</div>
				<ErrorMessage error={$resendConfirmationEmail.error} />
			</div>
		</div>
	{:else if authFlow === AuthFlow.reset_password_request}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<form class="space-y-2" on:submit|preventDefault={handleResetPasswordRequest}>
					<h2 class="text-center mb-2">Reset Password</h2>
					<div>
						<TextInput bind:value={email} name="email" type="email" label="Email" />
					</div>
					<Button
						isLoading={$resetPasswordRequest.isPending}
						isSuccess={$resetPasswordRequest.isSuccess}
						successText={'Email Sent'}
						disabled={$resetPasswordRequest.isPending || $resetPasswordRequest.isSuccess}
						text="Send Link"
						type="submit"
						classes="w-full"
					/>
				</form>
				<div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=${AuthFlow.sign_in}`}
						class="pt-4 pb-1 text-center text-xs cursor-pointer underline">sign in</a
					>
				</div>
				<ErrorMessage error={$resendConfirmationEmail.error} />
			</div>
		</div>
	{:else if authFlow === AuthFlow.confirm_success}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<h2 class="text-center mb-2">Email Confirmed Successfully</h2>

				<div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=sign_in`}
						class="px-8 py-2 bg-black rounded-lg text-white hover:bg-black/80 whitespace-nowrap"
						>Go To Sign In</a
					>
				</div>
				<ErrorMessage error={$resendConfirmationEmail.error} />
			</div>
		</div>{:else if authFlow === AuthFlow.confirm_error}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<h2 class="text-center mb-2">Error: Could not confirm Email</h2>

				<div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=resend`}
						class="px-8 py-2 bg-black rounded-lg text-white hover:bg-black/80 whitespace-nowrap"
						>Try Again</a
					>
				</div>
				<ErrorMessage error={$resendConfirmationEmail.error} />
			</div>
		</div>
	{/if}
</div>
