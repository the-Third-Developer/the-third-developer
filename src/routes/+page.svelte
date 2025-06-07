<script>
	import GlowingHexagon from '$lib/components/GlowingHexagon.svelte';
	import Offerings from '$lib/components/Offerings.svelte';
	import SplitText from '$lib/components/SplitText.svelte';
	import dbinex from '$lib/images/dbinex.webp';
	import health from '$lib/images/health-sciences.webp';
	import cgm from '$lib/images/cgm.webp';
	import md from '$lib/images/md-lawyers.webp';
	import elemex from '$lib/images/elemex.webp';
	import cowbell from '$lib/images/cowbell.webp';
	import { onMount } from 'svelte';
	import { scrollFadeIn } from '$lib/actions/scrollFadeIn.js';

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

	let contactName = '';
	let contactEmail = '';
	let contactMessage = '';
	let contactStatus = '';
	let contactLoading = false;

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

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const gsap = (await import('gsap')).default;
			const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
			gsap.registerPlugin(ScrollTrigger);

			const tiles = document.querySelectorAll('.project-tile');
			gsap.set(tiles, {
				y: 50,
				opacity: 0,
				scale: 0.96,
				filter: 'blur(8px)',
			});
			gsap.to(tiles, {
				y: 0,
				opacity: 1,
				scale: 1,
				filter: 'blur(0px)',
				stagger: 0.15,
				duration: 0.9,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '#portfolio-grid',
					start: 'top 80%',
					toggleActions: 'play none none reverse',
				},
			});
		}
	});
</script>

<div class="relative pt-16 px-8 overflow-hidden bg-ink-500">
	<section
		id="hero"
		class="container mx-auto flex justify-center items-center relative z-10 pb-16 md:pb-48"
	>
		<div
			class="grid grid-cols-2 grid-rows-[auto_auto] items-center relative w-full"
		>
			<!-- Row 1, Col 1: Small text -->
			<div
				class="col-start-1 row-start-1 z-10 col-span-2 md:col-span-1 self-end"
			>
				<SplitText
					text="The first developer focuses on the problem."
					className="text-offwhite-500 text-2xl font-emphasis mb-8 block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
					splitType="words"
					delay={150}
					sequence={0}
				/>
				<SplitText
					text="The second developer focuses on the solution."
					className="text-offwhite-500 text-2xl font-emphasis mb-8 block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
					splitType="words"
					delay={150}
					sequence={1}
				/>
			</div>

			<!-- Row 1-2, Col 2: Hexagon image (spans both rows) -->
			<div
				class="col-start-1 md:col-start-2 row-start-3 md:row-start-1 row-span-1 md:row-span-2 col-span-2 md:col-span-1 flex justify-center items-center relative opacity-90"
			>
				<GlowingHexagon />
			</div>

			<!-- Row 2, Col 1: Large text (left) -->
			<div class="col-start-1 row-start-2 col-span-2 z-10 self-start">
				<SplitText
					text="I look through the surface to peer into the true meaning."
					className="text-white text-3xl font-emphasis mb-8 block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
					splitType="words"
					delay={100}
					sequence={2}
				/>
				<SplitText
					text="I am <span class='text-yellow-500'>the Third Developer</span>, <br/>finding answers that best fit your needs."
					className="text-white text-3xl md:text-4xl font-emphasis block leading-loose drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
					splitType="words"
					delay={100}
					sequence={3}
				/>
			</div>
		</div>
	</section>
	<section
		class="container mx-auto max-w-2xl"
		use:scrollFadeIn={{ threshold: 1, y: 40, duration: 600 }}
	>
		<h2
			class="text-offwhite-500 text-left md:text-justify text-2xl font-emphasis"
		>
			In a world obsessed with '<span class="text-blue-500">what</span>'
			and '<span class="text-blue-500">how</span>',
		</h2>
		<p class="text-offwhite-500 mt-4 text-left md:text-justify">
			In a world obsessed with "what" and "how", I bring the "why". Having
			honed my craft working with London's leading agencies, I don't just
			build websites and automate tasks - <span class="text-blue-300"
				>I unearth the deeper needs of your business</span
			>. Leveraging my experience with diverse clientele, from startups to
			global corporations, I craft solutions that resonate with your
			target audience and empower your team to focus on what truly matters
			- <span class="text-blue-300">growth</span>. Let's chat and discover
			how I can become your secret weapon.
		</p>
	</section>
	<section
		class="container mx-auto pt-16 pb-8 max-w-5xl"
		use:scrollFadeIn={{ threshold: 1, y: 40, duration: 600 }}
	>
		<Offerings />
	</section>
	<section id="portfolio" class="relative text-offwhite-500 px-6 py-24">
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
			id="portfolio-grid"
		>
			{#each projects as project, i}
				<a
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
					<img
						src={project.image}
						alt={project.name}
						class="rounded-md mb-4 relative z-10"
					/>
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

		<p class="text-center mt-16 text-2xl text-yellow-500 font-header">
			+ over 100 more.
		</p>
	</section>
	<section class="container mx-auto pt-16 relative text-center">
		<div
			class="max-w-md mx-auto border border-blue-500/20 rounded-xl p-8 bg-ink-500"
		>
			<h2 class="text-4xl font-bold font-header mb-8 text-offwhite-500">
				Let's Connect
			</h2>
			<form class="space-y-5" on:submit={handleContactSubmit}>
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
						class="absolute left-3 top-3 text-blue-500 bg-ink-500 px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-ink-500 peer-focus:px-1 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-ink-500 peer-not-placeholder-shown:px-1"
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
						class="absolute left-3 top-3 text-blue-500 bg-ink-500 px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-ink-500 peer-focus:px-1 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-ink-500 peer-not-placeholder-shown:px-1"
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
						class="absolute left-3 top-3 text-blue-500 bg-ink-500 px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-ink-500 peer-focus:px-1 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-ink-500 peer-not-placeholder-shown:px-1"
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
	</section>
	<section
		class="container mx-auto pt-16 pb-8 max-w-5xl text-center text-offwhite-500"
	>
		<p>Based out of St Thomas, Ontario.</p>
		<a
			href="mailto:iam@thethird.dev"
			class="text-yellow-500 mt-4 text-emphasis hover:underline"
			>iam@thethird.dev</a
		>
	</section>
</div>
