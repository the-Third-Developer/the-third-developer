<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import logo from '$lib/images/TTD-circuitry-neruons-logo.png';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/game-of-life', label: 'Game of Life' },
	];
</script>

<nav class="sticky top-0 bg-slate-800 shadow-md z-50 drop-shadow-lg">
	<div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
		<a
			href="/"
			class="text-white text-xl font-bold hover:text-blue-300 transition-colors"
			title="the Third Developer"
		>
			<img src={logo} alt="the Third Developer" class="w-8 h-8" />
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

<main>
	<slot />
</main>
