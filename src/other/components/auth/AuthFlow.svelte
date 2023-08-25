<script lang="ts">
	import { page } from '$app/stores';

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
</script>

<div>
	{#if authFlow === AuthFlow.sign_in}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<form class="space-y-2">
					<h2 class="text-center mb-2">Sign In</h2>
					<!-- <TextInput
          inputClass="w-full"
          name="name"
          label="Name"
          type="text"
          value={name}
          setValue={setName}
        />
        <TextInput
          inputClass="w-full"
          name="email"
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          inputClass="w-full"
          name="password"
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button
          isLoading={creatingAccount}
          disabled={creatingAccount}
          class=""
          type="submit"
        >
          Create Account
        </Button> -->
				</form>
				<div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=create_account`}
						class="pt-4 pb-1 text-center text-xs cursor-pointer">or Create Account</a
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex justify-center py-20">
			<div class="p-5 w-full max-w-sm border-2 border-black rounded-xl">
				<form class="space-y-2">
					<h2 class="text-center mb-2">Create Account</h2>
					<!-- <TextInput
              inputClass="w-full"
              name="name"
              label="Name"
              type="text"
              value={name}
              setValue={setName}
            />
            <TextInput
              inputClass="w-full"
              name="email"
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <TextInput
              inputClass="w-full"
              name="password"
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />
            <Button
              isLoading={creatingAccount}
              disabled={creatingAccount}
              class=""
              type="submit"
            >
              Create Account
            </Button> -->
				</form>
				<div class="flex justify-center">
					<a
						href={`${$page.url.pathname}?authFlow=sign_in`}
						class="pt-4 pb-1 text-center text-xs cursor-pointer"
						>or Sign In
					</a>
				</div>
			</div>
		</div>
	{/if}
</div>
