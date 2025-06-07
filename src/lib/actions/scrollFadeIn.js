export function scrollFadeIn(
	node,
	{ threshold = 1, y = 40, duration = 600 } = {},
) {
	let observer;

	node.style.opacity = 0;
	node.style.transform = `translateY(${y}px)`;

	const handleIntersect = entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				node.style.transition = `opacity ${duration}ms cubic-bezier(.4,0,.2,1), transform ${duration}ms cubic-bezier(.4,0,.2,1)`;
				node.style.opacity = 1;
				node.style.transform = 'translateY(0)';
				observer.disconnect();
			}
		});
	};

	observer = new IntersectionObserver(handleIntersect, { threshold });
	observer.observe(node);

	return {
		destroy() {
			observer && observer.disconnect();
		},
	};
}
