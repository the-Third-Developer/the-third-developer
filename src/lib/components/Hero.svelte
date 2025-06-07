<script>
	import GlowingHexagon from '$lib/components/GlowingHexagon.svelte';
	import SplitText from '$lib/components/SplitText.svelte';
</script>

<div
	class="grid grid-cols-2 grid-rows-[auto_auto] items-center relative w-full"
>
	<!-- Row 1, Col 1: Small text -->
	<div
		class="col-start-1 row-start-1 z-10 col-span-2 md:col-span-1 self-end pointer-events-none"
	>
		<SplitText
			text="The first developer focuses on the problem."
			className="text-offwhite-500 text-2xl font-emphasis mb-8 block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
			splitType="words"
			delay={150}
			sequence={0}
		/>
		<SplitText
			text="The second developer focuses on the solution."
			className="text-offwhite-500 text-2xl font-emphasis mb-8 block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
			splitType="words"
			delay={150}
			sequence={1}
		/>
	</div>

	<!-- Row 1-2, Col 2: Hexagon image (spans both rows) -->
	<div
		class="col-start-1 md:col-start-2 row-start-3 md:row-start-1 row-span-1 md:row-span-2 col-span-2 md:col-span-1 flex justify-center items-center relative opacity-90"
	>
		<GlowingHexagon />
	</div>

	<!-- Row 2, Col 1: Large text (left) -->
	<div
		class="col-start-1 row-start-2 col-span-2 z-10 self-start pointer-events-none"
	>
		<SplitText
			text="I look through the surface to peer into the true meaning."
			className="text-white text-3xl font-emphasis mb-8 block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]"
			splitType="words"
			delay={100}
			sequence={2}
		/>
		<SplitText
			text="I am <span class='text-yellow-500'>the Third Developer</span>, <br/>finding answers that best fit your needs."
			className="text-white text-2xl md:text-3xl lg:text-4xl font-emphasis block drop-shadow-[2px_4px_6px_rgba(0,0,0,1)] leading-[2]"
			splitType="words"
			delay={100}
			sequence={3}
		/>
	</div>
</div>
