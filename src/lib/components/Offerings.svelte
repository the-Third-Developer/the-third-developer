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
			desc: 'Accessible, on-brand experiences tailored to your needs—from basic email automation to complex procedures.',
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

<section class="container mx-auto pt-16 pb-8 max-w-5xl">
	<div class="grid md:grid-cols-3 gap-8">
		{#each offerings as offering}
			<SpotlightCard
				className="rounded-xl p-4 border-2 border-blue-500/25 cursor-pointer group"
			>
				<img
					src={offering.image}
					alt={offering.alt}
					class="w-100 mx-auto mb-6 p-4 max-h-48"
				/>
				<h3 class="text-3xl font-header text-white mb-4">
					{offering.title}
				</h3>
				<p class="text-offwhite-500">{offering.desc}</p>
			</SpotlightCard>
		{/each}
	</div>
</section>
