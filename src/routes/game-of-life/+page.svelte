<script>
	import { onMount } from 'svelte';

	let canvas;
	let rows = 60;
	let cols = 100;
	const cellSize = 10;
	let playing = false;
	let interval;
	let zoom = 1;
	let offsetX = 0;
	let offsetY = 0;
	let isDragging = false;
	let lastMouseX = 0;
	let lastMouseY = 0;
	let hasDragged = false;

	let grid = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => (Math.random() > 0.8 ? 1 : 0)),
	);

	function countNeighbors(x, y) {
		let count = 0;
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx === 0 && dy === 0) continue;
				const nx = x + dx;
				const ny = y + dy;
				if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
					count += grid[nx][ny];
				}
			}
		}
		return count;
	}

	function nextGeneration() {
		grid = grid.map((row, x) =>
			row.map((cell, y) => {
				const neighbors = countNeighbors(x, y);
				if (cell === 1 && (neighbors === 2 || neighbors === 3))
					return 1;
				if (cell === 0 && neighbors === 3) return 1;
				return 0;
			}),
		);
	}

	function draw() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate(offsetX, offsetY);
		ctx.scale(zoom, zoom);

		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				if (grid[x][y]) {
					ctx.fillStyle = '#00aa44';
					ctx.fillRect(
						y * cellSize,
						x * cellSize,
						cellSize,
						cellSize,
					);
				}
			}
		}
		ctx.restore();
	}

	function tick() {
		nextGeneration();
		draw();
	}

	function toggle() {
		playing = !playing;
		if (playing) {
			interval = setInterval(tick, 100);
		} else {
			clearInterval(interval);
		}
	}

	function reset() {
		grid = Array.from({ length: rows }, () =>
			Array.from({ length: cols }, () => 0),
		);
		draw();
	}

	function randomize() {
		grid = Array.from({ length: rows }, () =>
			Array.from({ length: cols }, () => (Math.random() > 0.8 ? 1 : 0)),
		);
		draw();
	}

	function handleClick(event) {
		if (hasDragged) return;

		const rect = canvas.getBoundingClientRect();
		const canvasX = (event.clientX - rect.left - offsetX) / zoom;
		const canvasY = (event.clientY - rect.top - offsetY) / zoom;

		const y = Math.floor(canvasX / cellSize);
		const x = Math.floor(canvasY / cellSize);

		if (x >= 0 && x < rows && y >= 0 && y < cols) {
			grid[x][y] = grid[x][y] ? 0 : 1;
			draw();
		}
	}

	function handleWheel(event) {
		event.preventDefault();
		const zoomAmount = 0.1;
		const scale = event.deltaY < 0 ? 1 + zoomAmount : 1 - zoomAmount;

		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;

		const worldX = (mouseX - offsetX) / zoom;
		const worldY = (mouseY - offsetY) / zoom;

		zoom *= scale;

		offsetX = mouseX - worldX * zoom;
		offsetY = mouseY - worldY * zoom;

		draw();
	}

	function startPan(event) {
		isDragging = true;
		hasDragged = false;
		lastMouseX = event.clientX;
		lastMouseY = event.clientY;
	}

	function pan(event) {
		if (!isDragging) return;
		const dx = event.clientX - lastMouseX;
		const dy = event.clientY - lastMouseY;

		if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
			hasDragged = true;
		}

		offsetX += dx;
		offsetY += dy;
		lastMouseX = event.clientX;
		lastMouseY = event.clientY;
		draw();
	}

	function stopPan() {
		isDragging = false;
	}

	onMount(() => {
		draw();
	});
</script>

<div class="flex flex-col justify-center h-screen p-6">
	<canvas
		class="block mx-auto border-2 border-gray-700 cursor-pointer max-w-full max-h-[80vh]"
		bind:this={canvas}
		width={cols * cellSize}
		height={rows * cellSize}
		on:click={handleClick}
		on:wheel={handleWheel}
		on:mousedown={startPan}
		on:mousemove={pan}
		on:mouseup={stopPan}
		on:mouseleave={stopPan}
	/>

	<div class="flex flex-col gap-2 mt-4 justify-center items-center">
		<div class="flex gap-2">
			<button
				class="bg-blue-500 hover:bg-blue-600 {playing
					? 'bg-red-500 hover:bg-red-600'
					: ''} text-white px-4 py-2 rounded-md"
				on:click={toggle}>{playing ? 'Pause' : 'Play'}</button
			>
			<button
				class="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
				on:click={reset}>Reset</button
			>
			<button
				class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md"
				on:click={randomize}>Randomize</button
			>
		</div>
		<div class="flex gap-2 items-center">
			<div class="flex flex-col gap-2 items-center">
				<label for="rows" class="m-0">Rows - {rows}</label>
				<input
					type="range"
					id="rows"
					bind:value={rows}
					min="10"
					max="1000"
					class="w-full bg-gray-300"
				/>
			</div>
			<div class="flex flex-col gap-2 items-center">
				<label for="cols" class="m-0">Cols - {cols}</label>
				<input
					type="range"
					id="cols"
					bind:value={cols}
					min="10"
					max="1000"
					class="w-full bg-gray-300"
				/>
			</div>
		</div>
	</div>
</div>
