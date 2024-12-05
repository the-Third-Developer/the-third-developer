<script>
    let answers = Array(50).fill(null);
    const questions = [
        {
            category: "Introduction to Psychological Testing",
            items: [
                { question: "What is a psychological test?", options: ["A casual observation", "A systematic procedure for measuring behavior", "A random survey", "An unstructured interview"] },
                { question: "Which psychologist is associated with the first modern intelligence test?", options: ["Sir Francis Galton", "Alfred Binet", "Lewis Terman", "Wilhelm Wundt"] },
                { question: "What is the primary purpose of psychological assessment?", options: ["Entertainment", "Diagnosis, evaluation, and decision-making", "Data storage", "Prediction of random events"] }
            ]
        },
        {
            category: "Reliability",
            items: [
                { question: "Reliability refers to:", options: ["A test’s ability to measure what it claims to", "The consistency of test scores", "The fairness of test items", "A test’s correlation with real-world outcomes"] },
                { question: "What type of reliability evaluates a test’s stability over time?", options: ["Internal consistency", "Test-retest reliability", "Alternate-form reliability", "Inter-rater reliability"] },
                { question: "A high inter-rater reliability indicates:", options: ["Test items measure the same construct", "Test scores are consistent across time", "Test scorers provide similar results", "A test measures what it claims"] }
            ]
        },
        {
            category: "Validity",
            items: [
                { question: "Validity refers to:", options: ["The extent to which a test measures what it claims", "The consistency of test scores", "The ease of test administration", "The test’s cultural neutrality"] },
                { question: "Criterion validity involves:", options: ["Evaluating item difficulty", "Correlating test scores with external outcomes", "Measuring internal structure", "Testing cultural relevance"] },
                { question: "Which type of validity focuses on whether test items represent the construct comprehensively?", options: ["Construct validity", "Criterion validity", "Content validity", "Predictive validity"] }
            ]
        },
        {
            category: "Types of Tests",
            items: [
                { question: "What type of test measures optimal performance?", options: ["Typical response test", "Maximum performance test", "Speed test", "Personality test"] },
                { question: "Personality tests are an example of:", options: ["Maximum performance tests", "Diagnostic tools", "Typical response tests", "Aptitude tests"] },
                { question: "What are typical response tests used to assess?", options: ["Ability", "Behavior or preferences", "Knowledge", "Skills"] }
            ]
        },
        {
            category: "Sources of Measurement Error",
            items: [
                { question: "Content sampling error arises from:", options: ["Misalignment in test-taker conditions", "Unrepresentative test items", "Test-taker fatigue", "Discrepant scorer interpretations"] },
                { question: "Time sampling error refers to:", options: ["Scorer inconsistency", "Variations in test-taker performance due to timing", "Poorly written test items", "Environmental distractions"] },
                { question: "Which of the following is a source of measurement error?", options: ["Scoring inconsistencies", "Test standardization", "Test length", "Proper item difficulty"] }
            ]
        },
        {
            category: "Bias and Fairness",
            items: [
                { question: "Test bias occurs when:", options: ["Test items are too easy", "A test unfairly advantages or disadvantages certain groups", "Scores are inconsistent", "Cultural factors are considered"] },
                { question: "What is a common strategy to reduce cultural bias in tests?", options: ["Use culturally neutral items", "Remove all difficult questions", "Exclude minority groups", "Avoid standardization"] },
                { question: "Differential validity refers to:", options: ["Variability in reliability estimates", "Differences in predictive validity across groups", "Test content unrelated to constructs", "Consistency of test instructions"] }
            ]
        },
        {
            category: "Applications",
            items: [
                { question: "Psychological tests can be used for:", options: ["Clinical diagnosis", "Educational placement", "Employment selection", "All of the above"] },
                { question: "An example of a high-stakes assessment is:", options: ["A personality quiz", "A professional licensing exam", "A casual interview", "A diagnostic screening"] },
                { question: "Which test assesses specific skills for job performance?", options: ["Cognitive ability tests", "Personality tests", "Work sample tests", "Diagnostic tools"] }
            ]
        },
        {
            category: "Ethics and Standards",
            items: [
                { question: "What is informed consent?", options: ["An agreement between test administrators", "Ensuring test-takers understand the purpose and implications", "A contract for test distribution", "Scoring confidentiality"] },
                { question: "Ethical test administration requires:", options: ["Equal conditions for all test-takers", "Tailored instructions for individuals", "The exclusion of high-stakes questions", "Random item selection"] },
                { question: "Confidentiality in testing refers to:", options: ["Hiding test items", "Securely storing and sharing test results responsibly", "Limiting test duration", "Avoiding item repetition"] }
            ]
        },
        {
            category: "Test Development",
            items: [
                { question: "What is a key step in test conceptualization?", options: ["Administering the test immediately", "Developing conceptual definitions", "Random item selection", "Choosing test format"] },
                { question: "Standardization ensures:", options: ["Uniformity in test administration and scoring", "Test-taker variability", "Time constraints", "Random item formats"] },
                { question: "A test blueprint is used to:", options: ["Generate random questions", "Ensure content represents the domain comprehensively", "Increase time pressure", "Compare group performances"] }
            ]
        },
        {
            category: "Contemporary Issues",
            items: [
                { question: "Computerized adaptive testing (CAT) adjusts test difficulty based on:", options: ["Random selection", "Test-taker responses", "Pre-assigned difficulty levels", "Average test performance"] },
                { question: "One advantage of CAT is:", options: ["Test length is standardized", "Higher test security", "Increased engagement and precision", "Reduced need for scoring"] },
                { question: "Modern tests emphasize:", options: ["Flexibility, cultural fairness, and technological integration", "Uniformity and complexity", "Exclusion of diverse populations", "Length and difficulty"] }
            ]
        }
    ];

    let results = null;

    const correctAnswers = [
        'b', 'b', 'b',  // Introduction
        'b', 'b', 'c',  // Reliability
        'a', 'b', 'c',  // Validity
        'b', 'c', 'b',  // Types of Tests
        'b', 'b', 'a',  // Sources of Measurement Error
        'b', 'a', 'b',  // Bias and Fairness
        'd', 'b', 'c',  // Applications
        'b', 'a', 'b',  // Ethics and Standards
        'b', 'a', 'b',  // Test Development
        'b', 'c', 'a'   // Contemporary Issues
    ];

    function getAnswerIndex(option, allOptions) {
        return ['a', 'b', 'c', 'd'][allOptions.indexOf(option)];
    }

    function submitAnswers() {
        results = questions.flatMap((category, categoryIndex) => 
            category.items.map((item, itemIndex) => {
                const globalIndex = categoryIndex * 3 + itemIndex;
                const userAnswer = answers[globalIndex] ? 
                    getAnswerIndex(answers[globalIndex], item.options) : null;
                return {
                    question: item.question,
                    userAnswer,
                    correctAnswer: correctAnswers[globalIndex],
                    isCorrect: userAnswer === correctAnswers[globalIndex],
                    category: category.category
                };
            })
        );
    }
</script>

<div class="min-h-screen p-6 flex flex-col items-center bg-gray-800 text-yellow-300">
    <h1 class="text-3xl font-bold mb-6 text-yellow-400">Psychological Testing Quiz</h1>
    <div class="space-y-8 w-full max-w-3xl">
        {#each questions as category, categoryIndex}
            <div>
                <h2 class="text-2xl font-semibold mb-4">{category.category}</h2>
                <div class="space-y-4">
                    {#each category.items as question, questionIndex}
                        {@const globalIndex = categoryIndex * 3 + questionIndex}
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-lg">{question.question}</p>
                            <div class="mt-2 space-y-2">
                                {#each question.options as option, optionIndex}
                                    <label class="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`question-${categoryIndex}-${questionIndex}`}
                                            class="text-yellow-400 focus:ring-yellow-500"
                                            value={option}
                                            on:change={() => answers[globalIndex] = option}
                                        />
                                        <span>({['a', 'b', 'c', 'd'][optionIndex]}) {option}</span>
                                    </label>
                                {/each}
                            </div>
                            {#if results && results[globalIndex]}
                                <div class="mt-2 {results[globalIndex].isCorrect ? 'text-green-400' : 'text-red-400'}">
                                    {#if results[globalIndex].isCorrect}
                                        ✓ Correct!
                                    {:else}
                                        ✗ Incorrect. The correct answer is: ({results[globalIndex].correctAnswer})
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <button
        class="mt-6 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600"
        on:click={submitAnswers}
    >
        Submit Answers
    </button>
    
    {#if results}
        <div class="mt-6 text-xl">
            Total Score: {results.filter(r => r.isCorrect).length} / {results.length}
        </div>
    {/if}
</div>