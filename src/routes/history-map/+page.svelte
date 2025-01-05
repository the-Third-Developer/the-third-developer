<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as topojson from 'topojson-client';

	let mapContainer;
	let width = 960;
	let height = 500;
	let currentRotation = [0, 0, 0];
	let isDragging = false;
	let currentYear = -3000;
	let svg;

	const projection = d3
		.geoOrthographic()
		.scale(250)
		.translate([width / 2, height / 2])
		.clipAngle(90);

	const path = d3.geoPath().projection(projection);

	const historicalEvents = [
		{
			year: -3000,
			type: 'religion',
			location: [31.13, 29.98], // [longitude, latitude]
			title: 'Ancient Egyptian Religion',
			icon: '🏛️',
		},
		// Add more events...
	];

	function updateEventMarkers() {
		if (!svg) return;

		// Remove existing markers
		svg.selectAll('.event-marker').remove();

		// Filter events based on current year
		const visibleEvents = historicalEvents.filter(
			event => event.year <= currentYear,
		);

		// Add markers for visible events
		svg.selectAll('.event-marker')
			.data(visibleEvents)
			.enter()
			.append('g')
			.attr('class', 'event-marker')
			.each(function (d) {
				const marker = d3.select(this);
				const [x, y] = projection(d.location);

				// Only show if point is visible (not on back of globe)
				if (x && y) {
					marker
						.append('text')
						.attr('x', x)
						.attr('y', y)
						.attr('text-anchor', 'middle')
						.attr('class', `event-icon ${d.type}`)
						.text(d.icon);

					marker
						.append('title')
						.text(
							`${d.title} (${d.year < 0 ? Math.abs(d.year) + ' BC' : d.year + ' AD'})`,
						);
				}
			});
	}

	$: currentYear, updateEventMarkers(); // Update markers when year changes

	onMount(async () => {
		// Load world map data
		const world = await d3.json(
			'https://unpkg.com/world-atlas@2/countries-110m.json',
		);
		const countries = topojson.feature(world, world.objects.countries);

		// Create SVG
		svg = d3
			.select(mapContainer)
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		// Add water background
		svg.append('circle')
			.attr('cx', width / 2)
			.attr('cy', height / 2)
			.attr('r', projection.scale())
			.attr('class', 'ocean');

		// Add countries
		const map = svg.append('g');
		map.selectAll('path')
			.data(countries.features)
			.enter()
			.append('path')
			.attr('d', path)
			.attr('class', 'country');

		// Update markers on drag
		svg.call(
			d3
				.drag()
				.on('start', () => (isDragging = true))
				.on('drag', event => {
					if (isDragging) {
						const rotate = projection.rotate();
						projection.rotate([
							rotate[0] + event.dx * 0.2,
							rotate[1] - event.dy * 0.2,
							rotate[2],
						]);
						map.selectAll('path').attr('d', path);
						updateEventMarkers(); // Update markers after rotation
					}
				})
				.on('end', () => (isDragging = false)),
		);
	});
</script>

<div class="flex justify-center items-center min-h-screen w-full m-0 p-0">
	<div
		class="absolute top-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
	>
		<input
			type="range"
			min="-7000"
			max="2024"
			bind:value={currentYear}
			step="1"
			class="w-[300px] h-5 cursor-pointer accent-blue-600"
		/>
		<span class="text-gray-800 text-xl font-bold">
			{currentYear < 0
				? Math.abs(currentYear) + ' BC'
				: currentYear + ' AD'}
		</span>
	</div>
	<div
		class="w-full h-screen bg-gray-100 flex justify-center items-center"
		bind:this={mapContainer}
	>
		<!-- Map will be rendered here -->
	</div>
</div>

<style>
	:global(.ocean) {
		fill: #cce5ff;
	}

	:global(.country) {
		fill: #d4d4d4;
		stroke: #fff;
		stroke-width: 0.5px;
	}

	:global(.country:hover) {
		fill: #a0a0a0;
		cursor: pointer;
	}

	:global(.event-icon) {
		font-size: 1.5rem;
		cursor: pointer;
		transform-origin: 50% 50%;
		transition: transform 0.2s;
	}

	:global(.event-icon:hover) {
		transform: scale(1.2);
	}

	:global(.event-icon.religion) {
		color: #8b4513;
	}

	:global(.event-icon.war) {
		color: #8b0000;
	}

	:global(.event-icon.language) {
		color: #4b0082;
	}
</style>
