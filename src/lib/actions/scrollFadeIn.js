import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function scrollFadeIn(
	node,
	{ y = 40, duration = 0.6, ease = 'power3.out' } = {},
) {
	let anim;

	gsap.set(node, { opacity: 0, y });

	anim = gsap.to(node, {
		opacity: 1,
		y: 0,
		duration,
		ease,
		scrollTrigger: {
			trigger: node,
			start: 'top 80%',
			end: 'top 60%',
			scrub: true,
			once: false,
		},
	});

	return {
		destroy() {
			if (anim) anim.scrollTrigger && anim.scrollTrigger.kill();
			if (anim) anim.kill();
		},
	};
}
