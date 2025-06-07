<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let element;
	let gsap;
	let ScrollTrigger;
	let SplitText;

	export let text = '';
	export let className = '';
	export let delay = 100;
	export let duration = 0.6;
	export let ease = 'power3.out';
	export let splitType = 'chars';
	export let from = { opacity: 0, y: 40 };
	export let to = { opacity: 1, y: 0 };
	export let threshold = 0.1;
	export let rootMargin = '-100px';
	export let textAlign = 'left';
	export let onLetterAnimationComplete = () => {};
	export let sequence = 0;

	let isVisible = false;

	onMount(async () => {
		if (!browser) return;

		// Dynamically import GSAP modules
		const gsapModule = await import('gsap');
		const scrollTriggerModule = await import('gsap/ScrollTrigger');
		const splitTextModule = await import('gsap/SplitText');

		gsap = gsapModule.default;
		ScrollTrigger = scrollTriggerModule.default;
		SplitText = splitTextModule.default;

		gsap.registerPlugin(ScrollTrigger, SplitText);

		const absoluteLines = splitType === 'lines';
		if (absoluteLines) element.style.position = 'relative';

		// Set initial state with reduced opacity
		gsap.set(element, { opacity: 0.1 });

		// Create a temporary div to parse HTML
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = text;
		tempDiv.remove();

		const splitter = new SplitText(element, {
			type: splitType,
			absolute: absoluteLines,
			linesClass: 'split-line',
		});

		let targets;
		switch (splitType) {
			case 'lines':
				targets = splitter.lines;
				break;
			case 'words':
				targets = splitter.words;
				break;
			case 'words, chars':
				targets = [...splitter.words, ...splitter.chars];
				break;
			default:
				targets = splitter.chars;
		}

		targets.forEach(t => {
			t.style.willChange = 'transform, opacity';
			gsap.set(t, { ...from, immediateRender: true });
		});

		const startPct = (1 - threshold) * 100;
		const m = /^(-?\d+)px$/.exec(rootMargin);
		const raw = m ? parseInt(m[1], 10) : 0;
		const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
		const start = `top ${startPct}%${sign}`;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: element,
				start,
				toggleActions: 'play none none none',
				once: true,
			},
			smoothChildTiming: true,
			onComplete: () => {
				isVisible = true;
				onLetterAnimationComplete();
			},
		});

		// Calculate total duration of this animation
		const totalDuration = duration + (targets.length * delay) / 1000;

		// Add sequence delay based on previous animations
		if (sequence > 0) {
			tl.add(() => {}, sequence * totalDuration);
		}

		tl.to(element, { opacity: 1, duration: 0.001 });
		tl.to(targets, {
			...to,
			duration: duration * 0.8, // Slightly faster animation
			ease,
			stagger: delay / 1000,
			force3D: true,
		});

		return () => {
			tl.kill();
			ScrollTrigger.getAll().forEach(t => t.kill());
			gsap.killTweensOf(targets);
			splitter.revert();
		};
	});
</script>

<div
	bind:this={element}
	class="split-parent overflow-hidden inline-block whitespace-normal {className}"
	style="text-align: {textAlign}; word-wrap: break-word; opacity: 0;"
	aria-hidden="true"
>
	{@html text}
</div>
