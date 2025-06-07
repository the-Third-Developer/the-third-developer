export function scrollFadeIn(node, options = {}) {
	let anim;
	let cleanup;

	async function init() {
		// Only run on the client
		if (typeof window === 'undefined') return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const {
			y = 24,
			duration = 0.6,
			ease = 'power3.out',
			start = 'top 85%',
			end = 'top 65%',
			scrub = 0.3,
		} = options;

		gsap.set(node, { opacity: 0, y });

		anim = gsap.to(node, {
			opacity: 1,
			y: 0,
			ease,
			scrollTrigger: {
				trigger: node,
				start,
				end,
				scrub,
				toggleActions: 'play none none none',
			},
		});

		cleanup = () => {
			if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
			if (anim) anim.kill();
		};
	}

	init();

	return {
		destroy() {
			if (cleanup) cleanup();
		},
	};
}
