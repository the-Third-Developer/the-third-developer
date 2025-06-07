<script>
	export let spotlightColor = 'rgba(64, 196, 255, 0.2)';
	export let className = '';
	let divRef;
	let isFocused = false;
	let position = { x: 0, y: 0 };
	let opacity = 0;

	function handleMouseMove(e) {
		if (!divRef || isFocused) return;
		const rect = divRef.getBoundingClientRect();
		position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
	}

	function handleFocus() {
		isFocused = true;
		opacity = 0.6;
	}

	function handleBlur() {
		isFocused = false;
		opacity = 0;
	}

	function handleMouseEnter() {
		opacity = 0.6;
	}

	function handleMouseLeave() {
		opacity = 0;
	}
</script>

<div
	bind:this={divRef}
	on:mousemove={handleMouseMove}
	on:focus={handleFocus}
	on:blur={handleBlur}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	class={`relative rounded-3xl border border-blue-500 bg-blue-500/050 overflow-hidden p-8 ${className}`}
	tabindex="-1"
	role="region"
>
	<div
		class="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
		style="opacity: {opacity}; background: radial-gradient(circle at {position.x}px {position.y}px, {spotlightColor}, transparent 80%);"
	></div>
	<span class="spark"></span>
	<slot />
</div>
