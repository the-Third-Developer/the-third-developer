<script>
	import { onMount, tick } from 'svelte';

	const courses = [
		{
			course: 'PSYCH 3306 Learning',
			questions: [
				{
					chapter: 1,
					question:
						"List and define Aristotle's three principles of association.",
					answer: 'The three principles of association are similarity, contrast, and contiguity. Similarity refers to the idea that objects or events that are similar tend to be associated in the mind. Contrast involves associating ideas or events that are different from each other. Contiguity means that things that occur close together in time or space are often linked in thought.',
				},
				{
					chapter: 1,
					question:
						'Define and contrast the schools of thought of Empiricism and Nativism.',
					answer: 'Empiricism holds that knowledge comes from sensory experiences and is learned. Nativism argues that some knowledge is innate and present at birth. Empiricists believe that the environment shapes learning, while nativists believe that certain structures of the mind are hardwired.',
				},
				// Continue adding more questions here
			],
		},
		{
			course: 'PSYCH 2906 Perception',
			questions: [
				{
					chapter: 1,
					question: 'Define sensation and perception.',
					answer: 'Sensation refers to the process by which our sensory receptors and nervous system receive stimuli from the environment. Perception is the process of organizing and interpreting sensory information to give it meaning.',
				},
				{
					chapter: 1,
					question:
						'Describe the process of measurement known as psychometrics and explain how this process relates the physical world to perceptions of it.',
					answer: 'Psychometrics is the process of measuring mental capacities and processes. In relation to perception, it helps quantify how physical stimuli are detected and interpreted by the brain, linking the physical world to psychological perception.',
				},
				// Continue adding more questions here
			],
		},
	];

	let selectedCourse = null;
	let selectedQuestion = 0;
	let userAnswer = '';
	let showAnswer = false;
	let isMenuClosed = false;

	async function loadCourse(courseIndex) {
		selectedCourse = courses[courseIndex] || null;
		selectedQuestion = 0;
		userAnswer = '';
		showAnswer = false;
		await tick();
	}

	function nextQuestion() {
		if (selectedQuestion < selectedCourse.questions.length - 1) {
			selectedQuestion++;
			userAnswer = '';
			showAnswer = false;
		}
	}

	function previousQuestion() {
		if (selectedQuestion > 0) {
			selectedQuestion--;
			userAnswer = '';
			showAnswer = false;
		}
	}

	function checkAnswer() {
		showAnswer = true;
	}
</script>

<div class="bg-yellow-200">
	<div
		class="2xl:container mx-auto sm:flex items-stretch min-h-screen relative"
	>
		<div
			class="relative bg-blue-800 w-full sm:max-w-64 p-4 sm:p-8 sm:before:content-[''] before:absolute before:z-1 before:bg-blue-800 before:h-full before:w-screen before:right-0 before:top-0"
		>
			<div
				class="relative z-1 flex sm:block justify-between items-center"
			>
				<a class="text-yellow-500 font-semibold text-1xl" href="/"
					>Home</a
				>
				<label
					for="menuToggle"
					class="text-white sm:flex gap-1 items-center"
				>
					Check to {isMenuClosed ? 'open' : 'close'} menu
					<input
						type="checkbox"
						bind:checked={isMenuClosed}
						name="menuToggle"
						class="w-4 h-4"
					/>
				</label>
			</div>
			{#if !isMenuClosed}
				<h2 class="relative z-1 text-yellow-500 font-bold text-4xl">
					Courses
				</h2>
				{#if courses && courses.length > 0}
					<ul class="relative z-2 list-none p-0">
						{#each courses as course, index}
							<li class="inline md:block">
								<button
									on:click={() => loadCourse(index)}
									on:touchstart={() => loadCourse(index)}
									class="p-2 bg-blue-600 rounded mt-4 text-white font-bold hover:bg-blue-500 border-0 w-full"
									>{course.course}</button
								>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-white">No courses available</p>
				{/if}
			{/if}
		</div>

		<div class="relative text-center w-full pt-4 md:px-16 md:py-8">
			{#if selectedCourse}
				<div
					class="relative z-2 border-2 border-yellow-300 bg-yellow-100 p-4 rounded-16"
				>
					<h1 class="text-yellow-800 text-2xl font-medium">
						{selectedCourse.course}
					</h1>
					<h3 class="text-lg mb-2">
						Question {selectedQuestion + 1} of {selectedCourse
							.questions.length}
					</h3>
					<p class="mb-2">
						{selectedCourse.questions[selectedQuestion]?.question}
					</p>
					<p class="text-gray-700 font-bold">
						Chapter: {selectedCourse.questions[selectedQuestion]
							?.chapter}
					</p>

					<div class="grid gap-2 w-full">
						<textarea
							rows="6"
							bind:value={userAnswer}
							placeholder="Type your answer here..."
							class="w-full p-2 border-2 border-blue-500 bg-blue-100 m-0"
						></textarea>
						<button
							class="sm:w-fit bg-yellow-500 text-blue-900 px-4 py-2 font-bold border-2 border-yellow-500 rounded hover:bg-yellow-600 hover:border-yellow-600 m-0"
							on:click={checkAnswer}
							on:touchstart={checkAnswer}>Show Answer</button
						>
					</div>

					<div class="mt-4">
						{#if showAnswer}
							<div class="mb-2">
								<p
									class="mb-2 p-2 pb-4 border-2 border-yellow-500 whitespace-pre text-left"
								>
									<span class="mb-2 block text-center"
										>Your answer:</span
									>
									{userAnswer}
								</p>
								<p class="font-medium">
									{selectedCourse?.questions[selectedQuestion]
										?.answer}
								</p>
							</div>
						{/if}

						<div class="mt-4 flex gap-4 justify-center">
							<button
								on:click={previousQuestion}
								on:touchstart={previousQuestion}
								disabled={selectedQuestion === 0}
								class="w-fit p-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-500 border-0 disabled:cursor-not-allowed disabled:bg-blue-100"
								>Previous</button
							>
							<button
								on:click={nextQuestion}
								on:touchstart={nextQuestion}
								disabled={selectedQuestion ===
									selectedCourse.questions.length - 1}
								class="w-fit p-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-500 border-0"
								>Next</button
							>
						</div>
					</div>
				</div>
			{:else}
				<h1>Select a course to begin</h1>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Add your styles here */
</style>
