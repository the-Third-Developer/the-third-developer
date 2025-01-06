<script>
	import { onMount } from 'svelte';
	import '../app.css';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/history-map', label: 'Historical Map' },
		{ href: '/poke-math', label: 'Pokemon Math' },
	];

	let showNav = false;
	let keySequence = '';
	const showWord = 'show';
	const hideWord = 'hide';

	function handleKeydown(e) {
		// For the word detection, only handle alphabetical keys
		if (!/^[a-zA-Z]$/.test(e.key)) return;

		keySequence += e.key.toLowerCase();

		// Keep only the last 6 characters (length of 'hide')
		if (keySequence.length > hideWord.length) {
			keySequence = keySequence.slice(-hideWord.length);
		}

		// Check if the sequence matches either word
		if (keySequence === showWord) {
			showNav = true;
			keySequence = ''; // Reset sequence
		} else if (keySequence === hideWord) {
			showNav = false;
			keySequence = ''; // Reset sequence
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
	});
</script>

{#if showNav}
	<nav class="sticky top-0 bg-slate-800 shadow-md z-50 drop-shadow-lg">
		<div
			class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
		>
			<a
				href="/"
				class="text-white text-xl font-bold hover:text-blue-300 transition-colors"
			>
				The Third Developer
			</a>
			<ul class="flex gap-8">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="text-gray-200 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<main>
	<slot />
</main>
