<script>
	import { scrollFadeIn } from '$lib/actions/scrollFadeIn.js';
	import { onMount, tick } from 'svelte';
	import Countup from 'svelte-countup';
	import dbinex from '$lib/images/dbinex.webp';
	import health from '$lib/images/health-sciences.webp';
	import cgm from '$lib/images/cgm.webp';
	import md from '$lib/images/md-lawyers.webp';
	import elemex from '$lib/images/elemex.webp';
	import cowbell from '$lib/images/cowbell.webp';

	let projects = [
		{
			name: 'DB Interiors & Partners',
			description:
				'Modern interiors and exteriors for Canadian businesses.',
			url: 'https://dbinex.ca',
			image: dbinex,
		},
		{
			name: 'London Research and Care Partners',
			description: '100 years of diabetes research and care.',
			url: 'https://londonresearchandcarepartners.com/',
			image: health,
		},
		{
			name: 'Covent Garden Market',
			description: 'A vibrant hub for local food and culture.',
			url: 'https://coventmarket.com/',
			image: cgm,
		},
		{
			name: 'MD Lawyers',
			description: 'You need us when it matters most.',
			url: 'https://md-lawyers.ca/',
			image: md,
		},
		{
			name: 'Elemex',
			description: 'Innovative facade solutions for modern architecture.',
			url: 'https://elemex.ca/',
			image: elemex,
		},
		{
			name: 'Cowbell Brewery',
			description: "Ontario's destination craft brewery.",
			url: 'https://cowbellbrewing.com/',
			image: cowbell,
		},
	];

	let projectEls = [];
	let gridContainer;
	let svgEl;
	let lines = [];
	let gsapAnimV, gsapAnimH;

	function getNumCols() {
		if (!gridContainer) return 1;
		const style = getComputedStyle(gridContainer);
		return style.gridTemplateColumns.split(' ').length;
	}

	function updateLines() {
		const numCols = getNumCols();
		lines = [];
		if (!gridContainer || projectEls.length === 0) return;
		const gridRect = gridContainer.getBoundingClientRect();
		const rects = projectEls.map(el => el?.getBoundingClientRect());
		if (rects.some(r => !r)) return;

		// Vertical lines (between columns)
		for (let col = 1; col < numCols; col++) {
			const leftTile = rects[col - 1];
			const rightTile = rects[col];
			if (leftTile && rightTile) {
				const x = (leftTile.right + rightTile.left) / 2 - gridRect.left;
				lines.push({ type: 'v', x });
			}
		}

		// Horizontal lines (between rows)
		const numRows = Math.ceil(projects.length / numCols);
		for (let row = 1; row < numRows; row++) {
			const topTile = rects[(row - 1) * numCols];
			const bottomTile = rects[row * numCols];
			if (topTile && bottomTile) {
				const y = (topTile.bottom + bottomTile.top) / 2 - gridRect.top;
				lines.push({ type: 'h', y });
			}
		}
	}

	async function animateDashLines() {
		if (gsapAnimV && gsapAnimV.scrollTrigger)
			gsapAnimV.scrollTrigger.kill();
		if (gsapAnimV) gsapAnimV.kill();
		if (gsapAnimH && gsapAnimH.scrollTrigger)
			gsapAnimH.scrollTrigger.kill();
		if (gsapAnimH) gsapAnimH.kill();
		if (!svgEl) return;
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);
		const vLines = svgEl.querySelectorAll('line[data-dir="v"]');
		const hLines = svgEl.querySelectorAll('line[data-dir="h"]');
		gsap.set(vLines, { strokeDasharray: 16, strokeDashoffset: 0 });
		gsap.set(hLines, { strokeDasharray: 16, strokeDashoffset: 0 });
		// Animate vertical lines (up/down)
		gsapAnimV = gsap.to(vLines, {
			strokeDashoffset: 1024,
			ease: 'none',
			scrollTrigger: {
				trigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				// markers: true,
			},
		});
		// Animate horizontal lines (left/right)
		gsapAnimH = gsap.to(hLines, {
			strokeDashoffset: -512,
			ease: 'none',
			scrollTrigger: {
				trigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				// markers: true,
			},
		});
		await tick(); // ensure DOM is updated
		ScrollTrigger.refresh();
	}

	function setup() {
		updateLines();
		setTimeout(animateDashLines, 0); // Wait for DOM update
	}

	onMount(() => {
		setup();
		window.addEventListener('resize', setup);
		return () => {
			window.removeEventListener('resize', setup);
			if (gsapAnimV && gsapAnimV.scrollTrigger)
				gsapAnimV.scrollTrigger.kill();
			if (gsapAnimV) gsapAnimV.kill();
			if (gsapAnimH && gsapAnimH.scrollTrigger)
				gsapAnimH.scrollTrigger.kill();
			if (gsapAnimH) gsapAnimH.kill();
		};
	});
</script>

<div class="relative">
	<svg
		class="absolute inset-0 w-full h-full pointer-events-none z-20"
		style="width:100%;height:100%;"
		bind:this={svgEl}
	>
		{#each lines as line}
			{#if line.type === 'v'}
				<line
					data-dir="v"
					x1={line.x}
					y1="0"
					x2={line.x}
					y2={gridContainer ? gridContainer.offsetHeight : 0}
					stroke="#40C4FF"
					stroke-width="1"
					stroke-dasharray="8 8"
					opacity="0.2"
				/>
			{:else if line.type === 'h'}
				<line
					data-dir="h"
					x1="0"
					y1={line.y}
					x2={gridContainer ? gridContainer.offsetWidth : 0}
					y2={line.y}
					stroke="#40C4FF"
					stroke-width="1"
					stroke-dasharray="8 8"
					opacity="0.2"
				/>
			{/if}
		{/each}
	</svg>

	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
		id="portfolio-grid"
		bind:this={gridContainer}
	>
		{#each projects as project, i}
			<a
				bind:this={projectEls[i]}
				href={project.url}
				target="_blank"
				class="relative group project-tile rounded-xl overflow-hidden p-6 bg-opacity-10 backdrop-blur-md transition-all duration-300"
				use:scrollFadeIn={{
					y: 24,
					start: 'top 90%',
					end: 'top 70%',
					scrub: 0.3,
				}}
			>
				<!-- Circuit Dots -->
				<div
					class="absolute top-2 left-2 w-2 h-2 bg-yellow-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#FFB401]"
				></div>
				<div
					class="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_6px_#40C4FF]"
				></div>
				<div
					class="absolute bottom-2 left-2 w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_6px_#40C4FF]"
				></div>
				<div
					class="absolute bottom-2 right-2 w-2 h-2 bg-yellow-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#FFB401]"
				></div>

				<!-- Tile Content -->
				<div class="relative">
					<img
						src={project.image}
						alt={project.name}
						class="rounded-md mb-4 relative z-10 w-full h-48 object-cover"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-ink-500/60 to-transparent rounded-md"
					></div>
				</div>
				<h3
					class="text-xl font-semibold text-offwhite-500 z-10 relative"
				>
					{project.name}
				</h3>
				<p class="text-blue-200 mt-2 z-10 relative">
					{project.description}
				</p>
			</a>
		{/each}
	</div>
</div>

<p class="text-center mt-16 text-2xl text-yellow-500 font-header">
	+ over <Countup
		initial={1}
		value={100}
		duration={5000}
		step={3}
		roundto={100}
		format={false}
	/> more.
</p>
