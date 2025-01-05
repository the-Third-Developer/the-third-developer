<script>
	import '../app.css';

	const navItems = [{ href: '/pokemon-calculations', label: 'Pokemon Calc' }];
</script>

<nav class="sticky top-0 bg-slate-800 shadow-md z-50 drop-shadow-lg">
	<div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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

<main>
	<slot />
</main>
