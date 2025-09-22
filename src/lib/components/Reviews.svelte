<script>
	import { onMount } from 'svelte';
	const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
	let itemsPerPage = 3;

	let reviews = [];
	let currentIndex = 0;

	onMount(async () => {
		const baseUrl = 'https://places.googleapis.com/v1/places/';
		const placeId = import.meta.env.VITE_GOOGLE_PLACES_PLACE_ID;
		const fields = 'reviews';
		const url = `${baseUrl}${placeId}?fields=${fields}&key=${apiKey}`;

		const res = await fetch(url);
		const data = await res.json();
		switch (data.reviews.length) {
			case 0:
			case 1:
				itemsPerPage = 1;
				break;
			case 2:
				itemsPerPage = 2;
				break;
			default:
				itemsPerPage = 3;
				break;
		}
		reviews = data.reviews || [];
	});

	function nextSlide() {
		if (currentIndex + 3 < reviews.length) {
			currentIndex += 3;
		} else {
			currentIndex = 0;
		}
	}

	function prevSlide() {
		if (currentIndex - 3 >= 0) {
			currentIndex -= 3;
		} else {
			currentIndex = Math.max(0, reviews.length - 3);
		}
	}

	$: visibleReviews = reviews.slice(currentIndex, currentIndex + 3);
	$: hasNext = currentIndex + 3 < reviews.length;
	$: hasPrev = currentIndex > 0;
</script>

{#if reviews.length > 0}
	<div class="flex flex-col gap-6 pb-8 z-10">
		<h2 class="text-2xl font-bold text-offwhite-500 text-center">
			Reviews from Google
		</h2>

		<div class="relative">
			<!-- Navigation Buttons -->
			{#if hasPrev}
				<button
					on:click={prevSlide}
					class="absolute left-0 top-0 z-10 bg-offwhite-500/20 hover:bg-offwhite-500/30 text-offwhite-500 p-2 rounded-full transition-colors"
					aria-label="Previous reviews"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
			{/if}

			{#if hasNext}
				<button
					on:click={nextSlide}
					class="absolute right-0 top-0 z-10 bg-offwhite-500/20 hover:bg-offwhite-500/30 text-offwhite-500 p-2 rounded-full transition-colors"
					aria-label="Next reviews"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</button>
			{/if}

			<!-- Reviews Container -->
			<div class="grid gap-4 grid-cols-{itemsPerPage}">
				{#each visibleReviews as review}
					<div
						class="flex flex-col gap-3 p-4 bg-offwhite-500/5 rounded-lg border border-offwhite-500/10"
					>
						<div class="flex flex-wrap items-center gap-2">
							<h3 class="text-lg font-bold text-offwhite-500">
								{review.authorAttribution.displayName}
							</h3>
							{#if review.rating}
								<div class="flex items-center gap-1">
									{#each Array(review.rating) as _, i}
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="text-yellow-400"
										>
											<path
												d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
											/>
										</svg>
									{/each}
								</div>
							{/if}
						</div>
						<p class="text-sm text-gray-300 leading-relaxed">
							{review.originalText.text}
						</p>
					</div>
				{/each}
			</div>

			<!-- Dots Indicator -->
			{#if reviews.length > 3}
				<div class="flex justify-center gap-2 mt-4">
					{#each Array(Math.ceil(reviews.length / 3)) as _, i}
						<button
							on:click={() => (currentIndex = i * 3)}
							class="w-2 h-2 rounded-full transition-colors {currentIndex ===
							i * 3
								? 'bg-offwhite-500'
								: 'bg-offwhite-500/30'}"
							aria-label="Go to page {i + 1}"
						></button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
