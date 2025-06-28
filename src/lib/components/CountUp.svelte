<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let value = 0;
	export let initial = 0;
	export let duration = 2000;
	export let step = 1;
	export let roundto = 0;
	export let format = true;
	export let delay = 0;
	export let autostart = true;

	const dispatch = createEventDispatcher();

	let displayValue = initial;
	let animationId;
	let startTime;
	let isAnimating = false;

	function easeOutQuart(t) {
		return 1 - Math.pow(1 - t, 4);
	}

	function formatNumber(num) {
		if (!format) return num.toString();

		if (roundto > 0) {
			num = Math.round(num / roundto) * roundto;
		}

		return num.toLocaleString();
	}

	function animate(currentTime) {
		if (!startTime) startTime = currentTime;

		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = easeOutQuart(progress);

		const targetValue = initial + (value - initial) * easedProgress;
		displayValue = Math.floor(targetValue / step) * step;

		if (progress < 1) {
			animationId = requestAnimationFrame(animate);
		} else {
			displayValue = value;
			isAnimating = false;
			dispatch('complete');
		}
	}

	function start() {
		if (isAnimating) return;

		isAnimating = true;
		displayValue = initial;
		startTime = null;

		if (delay > 0) {
			setTimeout(() => {
				animationId = requestAnimationFrame(animate);
			}, delay);
		} else {
			animationId = requestAnimationFrame(animate);
		}
	}

	function stop() {
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
		isAnimating = false;
	}

	onMount(() => {
		if (autostart) {
			start();
		}

		return () => {
			stop();
		};
	});

	// Watch for value changes
	$: if (value !== displayValue && !isAnimating) {
		displayValue = value;
	}
</script>

<span>{formatNumber(displayValue)}</span>
