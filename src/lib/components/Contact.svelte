<script>
	let contactName = '';
	let contactEmail = '';
	let contactMessage = '';
	let contactStatus = '';
	let contactLoading = false;

	let formContainer;

	async function handleContactSubmit(e) {
		e.preventDefault();
		contactStatus = '';
		contactLoading = true;
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: contactName,
					email: contactEmail,
					message: contactMessage,
				}),
			});
			if (res.ok) {
				contactStatus = 'Message sent! Thank you for reaching out.';
				contactName = '';
				contactEmail = '';
				contactMessage = '';
			} else {
				const data = await res.json();
				contactStatus =
					data.error || 'Something went wrong. Please try again.';
			}
		} catch (err) {
			contactStatus = 'Something went wrong. Please try again.';
		}
		contactLoading = false;
	}
</script>

<div class="relative flex items-center justify-center">
	<div
		class="max-w-md mx-auto border border-blue-500/20 rounded-xl p-8 bg-ink-500 relative overflow-hidden"
		bind:this={formContainer}
	>
		<h2
			class="text-4xl font-bold font-header mb-8 text-offwhite-500 relative z-10"
		>
			Let's Connect
		</h2>
		<form class="space-y-5 relative z-10" on:submit={handleContactSubmit}>
			<div class="relative">
				<input
					type="text"
					name="name"
					id="contact-name"
					required
					bind:value={contactName}
					class="peer w-full p-3 rounded-md bg-transparent border border-blue-500/20 text-offwhite-500 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Name"
				/>
				<label
					for="contact-name"
					class="absolute left-3 top-3 text-blue-500 bg-ink-500 rounded-md px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-ink-500 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-yellow-500 peer-[&:not(:placeholder-shown)]:bg-ink-500 peer-[&:not(:placeholder-shown)]:px-1"
				>
					Name
				</label>
			</div>
			<div class="relative">
				<input
					type="email"
					name="email"
					id="contact-email"
					required
					bind:value={contactEmail}
					class="peer w-full p-3 rounded-md bg-transparent border border-blue-500/20 text-offwhite-500 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Email"
				/>
				<label
					for="contact-email"
					class="absolute left-3 top-3 text-blue-500 bg-ink-500 px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-ink-500 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-yellow-500 peer-[&:not(:placeholder-shown)]:bg-ink-500 peer-[&:not(:placeholder-shown)]:px-1"
				>
					Email
				</label>
			</div>
			<div class="relative">
				<textarea
					name="message"
					id="contact-message"
					rows="4"
					required
					bind:value={contactMessage}
					class="peer w-full p-3 rounded-md bg-transparent border border-blue-500/20 text-offwhite-500 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Message"
				></textarea>
				<label
					for="contact-message"
					class="absolute left-3 top-3 text-blue-500 bg-ink-500 px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-ink-500 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-yellow-500 peer-[&:not(:placeholder-shown)]:bg-ink-500 peer-[&:not(:placeholder-shown)]:px-1"
				>
					Message
				</label>
			</div>
			<button
				type="submit"
				class="w-full py-3 px-6 rounded-md bg-blue-500 text-black font-semibold transition hover:bg-yellow-500 disabled:opacity-60"
				disabled={contactLoading}
			>
				{contactLoading ? 'Sending...' : "LET'S CHAT"}
			</button>
			{#if contactStatus}
				<p class="mt-2 text-offwhite-500">{contactStatus}</p>
			{/if}
		</form>
	</div>
</div>
