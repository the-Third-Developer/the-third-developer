<script>
	import { onMount } from 'svelte';

	export let rows = 16;
	export let columns = 30;
	export let lineColor = '#40C4FF';
	export let baseAngle = 0;

	let container;
	let width = 0,
		height = 0;
	let mouse = { x: 0, y: 0 };
	let lineRefs = Array(rows * columns);
	$: if (lineRefs.length !== rows * columns) lineRefs = Array(rows * columns);

	// Helper to bind line refs in each block
	function getLineRef(i) {
		return el => (lineRefs[i] = el);
	}

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
		updateAngles();
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
			const r =
				((Math.acos(b / c) * 180) / Math.PI) *
				(mouse.y > centerY ? 1 : -1);
			line.style.setProperty('--rotate', `${r}deg`);
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
  "
>
	{#each lines as { cx, cy }, i}
		<div
			bind:this={lineRefs[i]}
			class="magnet-bg-line"
			style="
        width: {lineLength}px;
        height: {lineThickness}px;
        background: {lineColor};
        left: calc({cx}px - {lineLength / 2}px);
        top: calc({cy}px - {lineThickness / 2}px);
        transform: rotate(var(--rotate, {baseAngle}deg));
        border-radius: 1px;
        opacity: 0.2;
        position: absolute;
        transition: transform 0.18s cubic-bezier(0.4, 2, 0.6, 1);
        will-change: transform;
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
