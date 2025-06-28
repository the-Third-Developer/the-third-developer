<script>
	import website from '$lib/images/website.png';
	import swirl from '$lib/images/swirl.png';
	import handplant from '$lib/images/handplant.png';
	import SpotlightCard from '$lib/components/SpotlightCard.svelte';

	const offerings = [
		{
			image: website,
			alt: 'Websites Icon',
			title: 'Crafting Websites with Character',
			desc: 'Accessible, on-brand experiences tailored to your needs—from basic websites to complex web applications including e-commerce, booking systems, and more.',
		},
		{
			image: swirl,
			alt: 'Automation Icon',
			title: 'Streamlining Operations with Automation',
			desc: 'Tailored systems from task automation to complex procedures, freeing your time for what matters most.',
		},
		{
			image: handplant,
			alt: 'Consultation Icon',
			title: 'Personalized Consultation',
			desc: 'Guidance through every step of the development process—ensuring your vision comes to life.',
		},
	];
</script>

<div class="grid md:grid-cols-3 gap-8">
	{#each offerings as offering}
		<SpotlightCard className="rounded-xl p-4 group">
			<img
				src={offering.image}
				alt={offering.alt}
				class="mx-auto mb-6 p-4 h-48 cursor-auto opacity-50"
			/>
			<h3 class="text-3xl font-header text-white mb-4 leading-normal">
				{offering.title}
			</h3>
			<p class="text-offwhite-500">{offering.desc}</p>
		</SpotlightCard>
	{/each}
</div>
