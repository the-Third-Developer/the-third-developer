<script>
	import logo from '$lib/images/TTD-circuitry-neruons-logo.png';
	import { onMount } from 'svelte';

	let radius = 150;
	const cx = radius + 10;
	const cy = radius + 10;
	const svgSize = radius * 2 + 20; // 20 for a little breathing room for glow

	// Compute the 6 vertices of a regular hexagon
	const hexPoints = Array.from({ length: 6 }, (_, i) => {
		const angle = (Math.PI / 3) * i - Math.PI / 2;
		return {
			x: cx + radius * Math.cos(angle),
			y: cy + radius * Math.sin(angle),
		};
	});

	// Convert to SVG path string
	const hexPath =
		hexPoints
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
			.join(' ') + ' Z';

	// Dot sizes
	const maskDotRadius = 120;
	const yellowDotRadius = 6;
	const animationDuration = 15; // Reduced from 20 to 15 seconds

	// Tilt effect variables
	let container;
	let rotateX = 0;
	let rotateY = 0;
	let scale = 1;
	let isHovered = false;

	// Spring animation values
	const springConfig = {
		damping: 30,
		stiffness: 100,
		mass: 2,
	};

	// Tilt parameters
	const rotateAmplitude = 10; // Reduced from 14 to 10
	const scaleOnHover = 1.05; // Reduced from 1.1 to 1.05

	function handleMouseMove(e) {
		if (!container || !isHovered) return;

		const rect = container.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		rotateX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
		rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude;
	}

	function handleMouseEnter() {
		isHovered = true;
		scale = scaleOnHover;
	}

	function handleMouseLeave() {
		isHovered = false;
		scale = 1;
		rotateX = 0;
		rotateY = 0;
	}

	onMount(() => {
		// Add event listeners
		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseenter', handleMouseEnter);
		container.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			// Clean up event listeners
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseenter', handleMouseEnter);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div
	class="hexagon-logo-container"
	style="width: 100%; height: 100%; perspective: 800px; will-change: transform;"
	bind:this={container}
>
	<div
		class="hexagon-content"
		style="
			transform-style: preserve-3d;
			transform: rotateX({rotateX}deg) rotateY({rotateY}deg) scale({scale});
			transition: transform 0.1s ease-out;
			will-change: transform;
		"
	>
		<svg
			width="100%"
			height="100%"
			viewBox={`0 0 ${svgSize} ${svgSize}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<!-- Blue glow filter -->
				<filter
					id="blue-glow"
					x="-30%"
					y="-30%"
					width="160%"
					height="160%"
				>
					<feGaussianBlur stdDeviation="8" />
				</filter>
				<!-- Mask dot gradient (black to transparent) -->
				<radialGradient
					id="mask-dot-gradient"
					cx="50%"
					cy="50%"
					r="50%"
				>
					<stop offset="0%" stop-color="black" stop-opacity="1" />
					<stop offset="25%" stop-color="black" stop-opacity="1" />
					<stop offset="100%" stop-color="black" stop-opacity="0" />
				</radialGradient>
				<!-- Yellow dot gradient (yellow to transparent) -->
				<radialGradient
					id="main-dot-gradient"
					cx="50%"
					cy="50%"
					r="50%"
				>
					<stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
					<stop offset="100%" stop-color="#FFC233" stop-opacity="0" />
				</radialGradient>
				<!-- Mask definition -->
				<mask id="hex-mask" maskUnits="userSpaceOnUse">
					<rect
						x="0"
						y="0"
						width={svgSize}
						height={svgSize}
						fill="white"
					/>
					<circle
						r={maskDotRadius}
						fill="url(#mask-dot-gradient)"
						opacity="0"
					>
						<animate
							attributeName="opacity"
							from="0"
							to="1"
							dur="0.4s"
							fill="freeze"
						/>
						<animateMotion
							dur={`${animationDuration}s`}
							repeatCount="indefinite"
							rotate="auto"
						>
							<mpath xlink:href="#hexPath" />
						</animateMotion>
					</circle>
				</mask>
			</defs>

			<!-- Blue hexagon fill -->
			<polygon
				points={hexPoints.map(p => `${p.x},${p.y}`).join(' ')}
				fill="#0a2540"
				opacity="0.7"
			/>

			<!-- Blue hexagon border (glow) -->
			<path
				id="hexPath"
				d={hexPath}
				fill="none"
				stroke="#37a6df"
				stroke-width="3"
				filter="url(#blue-glow)"
				mask="url(#hex-mask)"
			/>
			<!-- Blue hexagon border (crisp) -->
			<path
				d={hexPath}
				fill="none"
				stroke="#37a6df"
				stroke-width="1"
				mask="url(#hex-mask)"
			/>

			<!-- Yellow line (glowing) -->
			<line
				x1={cx}
				y1={cy}
				x2={cx + yellowDotRadius * 2}
				y2={cy}
				stroke="url(#main-dot-gradient)"
				stroke-width="3"
				opacity="0.18"
			>
				<animateMotion
					dur={`${animationDuration}s`}
					repeatCount="indefinite"
					rotate="auto"
				>
					<mpath xlink:href="#hexPath" />
				</animateMotion>
			</line>
			<!-- Main yellow line -->
			<line
				x1={cx}
				y1={cy}
				x2={cx + yellowDotRadius}
				y2={cy}
				stroke="url(#main-dot-gradient)"
				stroke-width="2"
				opacity="0"
			>
				<animate
					attributeName="opacity"
					from="0"
					to="1"
					dur="0.4s"
					fill="freeze"
				/>
				<animateMotion
					dur={`${animationDuration}s`}
					repeatCount="indefinite"
					rotate="auto"
				>
					<mpath xlink:href="#hexPath" />
				</animateMotion>
			</line>
		</svg>
		<img src={logo} alt="TTD Logo" class="hexagon-logo-img" />
	</div>
</div>

<style>
	.hexagon-logo-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.hexagon-content {
		position: relative;
		width: 100%;
		height: 100%;
		will-change: transform;
	}
	.hexagon-logo-img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 50%; /* Adjust as needed */
		height: auto;
		pointer-events: none;
		z-index: 2;
	}
</style>
