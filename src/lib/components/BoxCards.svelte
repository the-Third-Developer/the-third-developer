<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	// Props for customizing the cards
	export let cards = [
		{
			number: '01',
			eyebrow: 'Design and Planning',
			title: 'Design and Planning',
			description:
				'This phase begins with discovery sessions to understand your goals, audience, and brand identity. From there, we move into creating website wireframes and mockups that map out structure, navigation, and visual direction.',
			chip: 'Discovery → Wireframes → Mockups',
		},
		{
			number: '02',
			eyebrow: 'Development',
			title: 'Development',
			description:
				'We turn the approved designs into a fully functional website. This includes front-end and back-end coding, setting up content management systems (CMS), and implementing any data structures or integrations required.',
			chip: 'Code → CMS → Integrations',
		},
		{
			number: '03',
			eyebrow: 'Revisions',
			title: 'Revisions',
			description:
				'After development, we refine the website based on your feedback. This stage focuses on polishing design details, ensuring usability, and making adjustments until the site matches your vision and needs.',
			chip: 'Feedback → Adjustments → Approval',
		},
		{
			number: '04',
			eyebrow: 'Launch',
			title: 'Launch',
			description:
				'Once revisions are complete and the site is approved, we handle deployment and launch. This includes final testing, performance checks, and ensuring everything runs smoothly as your website goes live.',
			chip: 'Testing → Deployment → Live',
		},
	];

	export let radius = 280;
	export let showControls = true;

	let ring;
	let cardElements = [];
	let state = { index: 0 };
	let currentRotation = 0; // Track cumulative rotation

	const n = 4; // Fixed to 4 cards for cube
	const step = 90; // 90 degrees per step for cube

	onMount(() => {
		// Layout the 4 cards in cube formation
		cardElements.forEach((el, i) => {
			const ry = i * step;
			el.style.transform = `translate3d(-50%, -50%, 0) rotateY(${ry}deg) translateZ(${radius}px)`;
		});
	});

	function next() {
		state.index = (state.index + 1) % n;
		currentRotation -= step; // Subtract 90 degrees for clockwise rotation

		gsap.to(ring, {
			rotateY: currentRotation,
			duration: 0.8,
			ease: 'power2.inOut',
		});
	}

	function prev() {
		state.index = (state.index - 1 + n) % n;
		currentRotation += step; // Add 90 degrees for counter-clockwise rotation

		gsap.to(ring, {
			rotateY: currentRotation,
			duration: 0.8,
			ease: 'power2.inOut',
		});
	}

	function goToIndex(index) {
		const diff = index - state.index;
		const steps = diff >= 0 ? diff : diff + n;

		for (let i = 0; i < steps; i++) {
			setTimeout(() => next(), i * 100);
		}
	}
</script>

<div class=" text-blue-100">
	<div class="flex flex-col items-center mb-4">
		<h2 class="text-white text-2xl font-emphasis mb-2">The Process</h2>
		<h3 class="text-offwhite-500 text-lg font-emphasis">
			Plan - Build - Launch
		</h3>
	</div>
	<div
		class="relative w-full grid place-items-center px-4 py-12"
		style="perspective: 1400px; perspective-origin: 50% 40%;"
	>
		<div
			class="relative w-full max-w-4xl"
			style="height: min(40vh, 500px); transform-style: preserve-3d;"
			bind:this={ring}
		>
			{#each cards.slice(0, 4) as card, i}
				<article
					class="absolute top-1/2 left-1/2 w-4/5 min-h-72 md:w-full h-full md:max-w-lg cursor-pointer rounded-xl overflow-hidden border border-blue-400/25 shadow-2xl backdrop-blur-sm"
					style="transform-style: preserve-3d; background: linear-gradient(170deg, rgba(0, 14, 33, 0.5) 0%, rgba(0, 12, 30, 0.5) 60%); box-shadow: 0 10px 30px rgba(0,0,0,.45), inset 0 0 0 1px rgba(95,178,255,.06);"
					bind:this={cardElements[i]}
				>
					<div
						class="absolute inset-0 rounded-xl pointer-events-none blur-md"
						style="box-shadow: inset 0 0 0 2px rgba(95,178,255,.12), inset 0 -80px 120px rgba(0,0,0,.35);"
					></div>
					<div
						class="absolute inset-0 rounded-xl pointer-events-none opacity-35 mix-blend-screen blur-sm"
						style="background: linear-gradient(115deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 40%), radial-gradient(120% 120% at -20% -20%, rgba(95,178,255,.30) 0%, rgba(95,178,255,0) 50%); transform: translateZ(1px);"
					></div>
					<div
						class="absolute inset-0 p-4 sm:p-6 md:p-7 grid content-between"
					>
						<div>
							<div
								class="opacity-70 text-xs sm:text-sm tracking-widest uppercase mb-2"
							>
								<span class="text-yellow-500"
									>{card.number}</span
								>
								·
								{card.eyebrow}
							</div>
							<h2
								class="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3"
							>
								{card.title}
							</h2>
							<p
								class="opacity-80 text-xs sm:text-sm leading-relaxed"
							>
								{card.description}
							</p>
						</div>
						<div
							class="justify-self-start px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-yellow-400/40 bg-blue-500/8 text-yellow-200 text-xs"
						>
							{card.chip}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
	{#if showControls}
		<div class="grid place-items-center gap-3 mt-8">
			<div
				class="inline-grid grid-flow-col gap-2 sm:gap-2.5 bg-white/5 border border-white/8 p-1.5 sm:p-2 rounded-full backdrop-blur-sm"
			>
				<button
					class="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full cursor-pointer bg-white/7 hover:bg-white/12 transition-colors duration-200 text-sm sm:text-base"
					on:click={prev}>◀︎</button
				>
				<button
					class="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full cursor-pointer bg-white/7 hover:bg-white/12 transition-colors duration-200 text-sm sm:text-base"
					on:click={next}>▶︎</button
				>
			</div>
			<div class="grid grid-flow-col gap-2 mt-1">
				{#each Array(4) as _, i}
					<button
						class="w-3 h-3 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-colors duration-200 {i ===
						state.index
							? 'bg-white'
							: 'bg-white/25 hover:bg-white/50'}"
						on:click={() => goToIndex(i)}
						aria-label="Go to card {i + 1}"
					></button>
				{/each}
			</div>
		</div>
	{/if}
</div>
