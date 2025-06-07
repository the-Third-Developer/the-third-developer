<script>
	import { onMount } from 'svelte';

	export let rows = 12;
	export let columns = 24;
	export let lineColor = '#40C4FF';
	export let baseAngle = 0;

	let container;
	let width = 0,
		height = 0;
	let mouse = { x: 0, y: 0 };
	let lineRefs = Array(rows * columns);
	let prevAngles = Array(rows * columns).fill(baseAngle);
	let highlightStates = Array(rows * columns).fill(false);
	$: if (lineRefs.length !== rows * columns) lineRefs = Array(rows * columns);
	$: if (prevAngles.length !== rows * columns)
		prevAngles = Array(rows * columns).fill(baseAngle);
	$: if (highlightStates.length !== rows * columns)
		highlightStates = Array(rows * columns).fill(false);

	// Update container size on mount and resize
	function updateSize() {
		if (container) {
			const rect = container.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
		}
	}

	// Listen to window pointermove and store mouse position in screen coordinates
	function handlePointerMove(e) {
		mouse = { x: e.clientX, y: e.clientY };
		requestAnimationFrame(updateAngles); // Use requestAnimationFrame for smoother updates
	}

	// Calculate and set the angle for each line
	function updateAngles() {
		lineRefs.forEach((line, i) => {
			if (!line) return;
			const rect = line.getBoundingClientRect();
			const centerX = rect.x + rect.width / 2;
			const centerY = rect.y + rect.height / 2;
			const b = mouse.x - centerX;
			const a = mouse.y - centerY;
			const c = Math.sqrt(a * a + b * b) || 1;
			let r =
				((Math.acos(b / c) * 180) / Math.PI) *
				(mouse.y > centerY ? 1 : -1);
			r = r + 90;
			// Shortest-path angle interpolation
			let prev = prevAngles[i] || 0;
			let delta = r - prev;
			if (delta > 180) r -= 360;
			if (delta < -180) r += 360;
			prevAngles[i] = r;
			line.style.setProperty('--rotate', `${r}deg`);

			// Highlight logic
			const mouseOver =
				mouse.x >= rect.left &&
				mouse.x <= rect.right &&
				mouse.y >= rect.top &&
				mouse.y <= rect.bottom;
			if (mouseOver) {
				highlightStates[i] = true;
				// Reset highlight after 2 seconds
				clearTimeout(line._highlightTimeout);
				line._highlightTimeout = setTimeout(() => {
					highlightStates[i] = false;
				}, 2000);
			}
		});
	}

	onMount(() => {
		updateSize();
		window.addEventListener('resize', updateSize);
		window.addEventListener('pointermove', handlePointerMove);
		// Set initial angles
		setTimeout(updateAngles, 0);
		return () => {
			window.removeEventListener('resize', updateSize);
			window.removeEventListener('pointermove', handlePointerMove);
		};
	});

	// Calculate cell and line sizes
	$: cellW = width / columns;
	$: cellH = height / rows;
	$: lineLength = Math.min(cellW, cellH);
	$: lineThickness = 2;

	// Precompute all line positions for the grid
	$: lines = Array.from({ length: rows * columns }, (_, i) => {
		const col = i % columns;
		const row = Math.floor(i / columns);
		// Evenly space columns and rows, so lines are always uniform
		const cx = ((col + 0.5) / columns) * width;
		const cy = ((row + 0.5) / rows) * height;
		return { cx, cy };
	});
</script>

<div
	bind:this={container}
	class="magnet-bg-grid"
	style="
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
		will-change: transform;
	"
>
	{#each lines as { cx, cy }, i}
		<div
			bind:this={lineRefs[i]}
			class="magnet-bg-line"
			style="
				width: {lineLength}px;
				height: {lineThickness}px;
				background: {highlightStates[i] ? '#FFB401' : lineColor};
				left: calc({cx}px - {lineLength / 2}px);
				top: calc({cy}px - {lineThickness / 2}px);
				transform: rotate(var(--rotate, {baseAngle}deg));
				border-radius: 1px;
				opacity: 0.2;
				position: absolute;
				transition: transform 0.3s cubic-bezier(0.4, 2, 0.6, 1), background 0.2s ease-out, opacity 0.2s ease-out;
				will-change: transform, background, opacity;
			"
		/>
	{/each}
</div>

<style>
	.magnet-bg-grid {
		pointer-events: none;
		z-index: 0;
	}
	/* No .magnet-bg-line here, all styles are inline for full dynamic control */
</style>
