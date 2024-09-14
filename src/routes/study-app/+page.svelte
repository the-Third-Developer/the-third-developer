<script>
    const courses = [
	{
		course: 'PSYCH 3306',
		chapter: 1,
		title: 'Learning Study Notes - Chapter 1',
		questions: [
			{
				type: 'short-answer',
				question: "List and define Aristotle's three principles of association.",
				answer:
					'The three principles of association are similarity, contrast, and contiguity. Similarity refers to the idea that objects or events that are similar tend to be associated in the mind. Contrast involves associating ideas or events that are different from each other. Contiguity means that things that occur close together in time or space are often linked in thought.'
			},
			{
				type: 'short-answer',
				question: 'Define and contrast the schools of thought of Empiricism and Nativism.',
				answer:
					'Empiricism holds that knowledge comes from sensory experiences and is learned. Nativism argues that some knowledge is innate and present at birth. Empiricists believe that the environment shapes learning, while nativists believe that certain structures of the mind are hardwired.'
			},
			{
				type: 'short-answer',
				question: 'Define what the Associationists believed about sensations and memory.',
				answer:
					'Associationists believed that sensations and memory are linked through associations formed by principles such as similarity, contrast, and contiguity. They theorized that thoughts are connected to one another in the mind, creating memory networks.'
			},
			{
				type: 'short-answer',
				question: "Describe Ebbinghaus' procedure to study memory.",
				answer:
					'Ebbinghaus used nonsense syllables to test memory and learning by observing how long it took to memorize lists of these syllables, and how quickly they were forgotten. He tested himself repeatedly over time to measure retention.'
			},
			{
				type: 'short-answer',
				question:
					'Outline how Ebbinghaus tested and supported each of the following principles: Frequency, Recency, Contiguity.',
				answer:
					'Ebbinghaus tested frequency by repeating lists and found that items repeated more often were more likely to be remembered. He tested recency by measuring how recently an item was learned and found that items learned more recently were recalled better. He tested contiguity by testing associations between items learned close together in time and found that closer items were more strongly associated.'
			},
			{
				type: 'short-answer',
				question: 'What are three reasons that we should use animals as research subjects?',
				answer:
					'1. Animal models provide insight into basic biological processes. 2. Animals can be used in controlled experiments that would not be ethical in humans. 3. Animal research has led to important medical and psychological discoveries.'
			},
			{
				type: 'short-answer',
				question: 'What are three reasons we should NOT use animals as research subjects?',
				answer:
					'1. Ethical concerns about causing harm to animals. 2. Differences between humans and animals may limit the applicability of research findings. 3. Advances in technology and non-invasive methods could reduce the need for animal testing.'
			},
			{
				type: 'short-answer',
				question: "Define what is meant by 'behaviourism' as defined by Watson and Skinner.",
				answer:
					'Behaviourism is a theory of learning that focuses on observable behaviors rather than internal mental states. Watson and Skinner argued that all behaviors are learned through interactions with the environment via conditioning.'
			},
			{
				type: 'short-answer',
				question:
					'Define and give an example of an intervening variable in psychological research.',
				answer:
					'An intervening variable is a variable that helps explain the relationship between an independent variable and a dependent variable. For example, in a study of stress and illness, the intervening variable might be immune function.'
			},
			{
				type: 'short-answer',
				question: 'What are the three major parts of a neuron?',
				answer: 'The three major parts of a neuron are the cell body (soma), dendrites, and axon.'
			},
			{
				type: 'short-answer',
				question: 'What are feature detectors? Give an example of one.',
				answer:
					'Feature detectors are neurons that respond to specific visual stimuli such as edges, lines, or movement. An example is edge detectors in the visual cortex that respond to the outline of objects.'
			},
			{
				type: 'short-answer',
				question:
					"How do visual feature detectors support both the nativist and the empiricist position of how 'knowledge' is formed?",
				answer:
					'Feature detectors support nativism because they suggest that certain neural mechanisms are innate. They support empiricism because experience fine-tunes these detectors based on exposure to the environment.'
			},
			{
				type: 'short-answer',
				question:
					'What are the three types of changes that can occur in the brain as a result of learning? Describe some research that provided evidence for ONE of those changes (your choice).',
				answer:
					'The three types of changes are synaptic plasticity, neurogenesis, and changes in neural networks. Research on synaptic plasticity, such as studies of long-term potentiation (LTP), shows how repeated activation of synapses strengthens them, aiding memory and learning.'
			},
			{
				type: 'short-answer',
				question: 'What’s the difference between ideas being stored locally or being distributed?',
				answer:
					'Local storage of ideas suggests that specific memories or knowledge are stored in particular parts of the brain. Distributed storage suggests that memories and knowledge are spread across multiple regions of the brain, with many neurons involved in each memory.'
			}
		]
	},
	{
		course: 'FOID 1006',
		chapter: 1,
		title: 'Crime Study Notes - Chapter 1',
		questions: [
			{
				type: 'short-answer',
				question: 'Describe the goals of emergency response.',
				answer:
					'The goals of emergency response are to preserve life, secure the scene, and prevent further injury or harm while providing immediate assistance to victims and ensuring the safety of responders.'
			},
			{
				type: 'short-answer',
				question: 'Describe how emergency response can contaminate a scene.',
				answer:
					'Emergency response can contaminate a scene through the movement of personnel, vehicles, or equipment that may disturb evidence, and by introducing foreign materials that could confuse forensic analysis.'
			},
			{
				type: 'short-answer',
				question: 'List three dangers that may be present at the scene.',
				answer:
					'1. Hazardous materials, 2. Armed suspects, 3. Structural instability or fire risks.'
			},
			{
				type: 'short-answer',
				question: 'Explain three considerations in establishing a scene perimeter.',
				answer:
					'1. The size of the crime scene, 2. The location and nature of evidence, 3. The need to control access to prevent contamination and maintain the integrity of the scene.'
			},
			{
				type: 'short-answer',
				question: 'Explain the value of using a methodical scene process.',
				answer:
					'A methodical scene process ensures that all evidence is identified, collected, and preserved properly, reducing the risk of missing crucial information and maintaining the integrity of the investigation.'
			},
			{
				type: 'short-answer',
				question: 'List six basic activities of scene processing.',
				answer:
					'1. Securing the scene, 2. Initial walkthrough, 3. Documenting the scene, 4. Searching for evidence, 5. Collecting and packaging evidence, 6. Final walkthrough and scene closure.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the role of the Forensic Identification Officer (crime scene investigator) within the Major Case Management System.',
				answer:
					'The Forensic Identification Officer collects, preserves, and analyzes physical evidence, ensuring the integrity of the evidence chain and providing expert testimony as part of the investigation.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the role of the Scenes of Crime Officer within the Major Case Management System.',
				answer:
					'The Scenes of Crime Officer is responsible for the initial assessment and documentation of the crime scene, gathering evidence, and providing support to the Forensic Identification Officer.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the role of the Scene investigator within the Major Case Management System.',
				answer:
					'The Scene Investigator is responsible for managing the entire crime scene process, from securing the scene to overseeing evidence collection and ensuring all investigative protocols are followed.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the Policy and Procedure from Major Case Management of the Crime Scene examination.',
				answer:
					'The policy requires a structured and methodical approach to examining a crime scene, involving secure containment, proper documentation, and comprehensive evidence collection.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the Policy and Procedure from Major Case Management of the Post Mortem examination.',
				answer:
					'The policy outlines procedures for coordinating with forensic pathologists, ensuring proper handling of the body, documenting the findings, and linking post mortem results to the crime scene investigation.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the Policy and Procedure from Major Case Management of Accessing Experts.',
				answer:
					'The policy ensures that qualified forensic experts are engaged in a timely manner, their expertise is used appropriately, and their findings are properly documented and integrated into the investigation.'
			},
			{
				type: 'short-answer',
				question:
					'Acquire an understanding and appreciation of the role forensic science plays in a crime scene investigation.',
				answer:
					'Forensic science plays a crucial role in identifying, analyzing, and interpreting physical evidence, which helps reconstruct the events of a crime and links suspects to the crime scene.'
			},
			{
				type: 'short-answer',
				question: 'Explain what evidence is by recognizing it and articulating its relevance.',
				answer:
					'Evidence refers to physical or testimonial items that are relevant to proving or disproving facts in an investigation. Its relevance is based on its ability to establish connections between the crime, suspect, and victim.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the scientific method of crime scene investigation as it leads to a logically organized scene investigation from the initial response and interviews of first responders, applying scene protection through to the closing of the scene.',
				answer:
					'The scientific method involves a systematic approach, beginning with observation (initial response), forming hypotheses (possible scenarios), testing (evidence collection), and reaching conclusions (crime reconstruction). Proper scene protection and documentation are vital throughout the process.'
			},
			{
				type: 'short-answer',
				question:
					'Explain investigative bias and identify methods to reduce or eliminate the bias.',
				answer:
					'Investigative bias occurs when preconceived notions influence the investigation. To reduce bias, investigators should rely on objective evidence, seek diverse viewpoints, and avoid premature conclusions.'
			},
			{
				type: 'short-answer',
				question:
					'Explain management of a crime scene using appropriate techniques, personnel, and equipment.',
				answer:
					'Crime scene management involves assigning trained personnel, using specialized equipment for documentation and collection, and employing proper techniques to ensure evidence integrity and scene security.'
			},
			{
				type: 'short-answer',
				question: 'Explain collection and preservation of evidence from a crime scene.',
				answer:
					'Evidence collection must follow strict protocols, including wearing protective gear, using proper containers for different types of evidence, and maintaining chain of custody to ensure its admissibility in court.'
			},
			{
				type: 'short-answer',
				question:
					'Explain the process of evidence submission to a forensic lab for expert analysis.',
				answer:
					'Evidence is securely packaged, labeled, and documented before submission to a forensic lab, where it undergoes analysis by experts. Results are documented and communicated to the investigative team.'
			},
			{
				type: 'short-answer',
				question: 'Explain the role of the police in a criminal investigation.',
				answer:
					'The police secure the crime scene, collect evidence, interview witnesses, and collaborate with forensic teams to build a case against suspects and bring them to justice.'
			},
			{
				type: 'short-answer',
				question: 'Explain the role of the scene investigator in a criminal investigation.',
				answer:
					'The scene investigator is responsible for documenting, collecting, and preserving evidence, as well as ensuring that all investigative procedures at the crime scene are followed.'
			},
			{
				type: 'short-answer',
				question:
					'Explain what training/education other than scene processing would be an advantage to the scene investigator.',
				answer:
					'Additional training in forensic science, criminology, or legal procedures would be beneficial for a scene investigator, as it would enhance their understanding of the broader context of the investigation.'
			},
			{
				type: 'short-answer',
				question:
					'Explain what evidence is and define the two types (Testimonial and Physical evidence).',
				answer:
					'Evidence is anything that can prove or disprove facts in a case. Testimonial evidence is statements made under oath, while physical evidence is tangible items collected at the crime scene.'
			},
			{
				type: 'short-answer',
				question: 'List the considerations of context of evidence as it affects the scene.',
				answer:
					'Considerations include the location of the evidence, its condition, the time it was found, and how it relates to other pieces of evidence and the crime scene itself.'
			},
			{
				type: 'short-answer',
				question: 'Define evidence dynamics.',
				answer:
					'Evidence dynamics refer to any factors that can alter, shift, or degrade physical evidence at a crime scene, such as environmental factors, human interference, or the passage of time.'
			},
			{
				type: 'short-answer',
				question: 'Explain the Macroscene and Microscene.',
				answer:
					'The Macroscene refers to the overall, larger crime scene, while the Microscene refers to smaller, localized areas where specific pieces of evidence are found. Both are interrelated in crime scene analysis.'
			},
			{
				type: 'short-answer',
				question: 'List the ingredients of a good processing methodology of a scene.',
				answer:
					'1. Securing the scene, 2. Proper documentation, 3. Methodical evidence collection, 4. Chain of custody, 5. Use of appropriate personnel and equipment, 6. Final walkthrough and review.'
			},
			{
				type: 'short-answer',
				question:
					'Describe the difference between individual and class characteristics of evidence.',
				answer:
					'Individual characteristics are unique to a specific item, like fingerprints or DNA, while class characteristics are shared by a group of items, like the tread pattern of a tire.'
			},
			{
				type: 'short-answer',
				question: 'Explain the importance of proper collection procedures.',
				answer:
					'Proper collection procedures are essential to preserve the integrity of evidence, prevent contamination, and ensure that the evidence is admissible in court.'
			},
			{
				type: 'short-answer',
				question:
					'Provide examples of different evidence found at a scene and explain the significance of the evidence in terms of identification.',
				answer:
					'Examples include fingerprints (used for identifying individuals), blood samples (used for DNA analysis), and ballistic evidence (used to identify the type of firearm used in a crime).'
			},
			{
				type: 'short-answer',
				question:
					'In your own words, define evidence as it relates to physical and testimonial evidence.',
				answer:
					'Evidence includes any physical objects or witness statements that can be used to support or refute facts in an investigation. Physical evidence includes tangible items, while testimonial evidence comes from witness accounts.'
			},
			{
				type: 'short-answer',
				question:
					'In your own words, explain the value of evidence as an issue of context rather than merely content.',
				answer:
					'The value of evidence lies not only in what it is but in its relationship to other items and the circumstances of the crime scene. Context helps explain its relevance and connection to the investigation.'
			},
			{
				type: 'short-answer',
				question:
					'Chisum and Rynearson offer that while considering the context of the evidence, such context can manifest itself in several ways. List these manifestations and in your own words summarize each.',
				answer:
					'Manifestations include location, time, environmental conditions, and interactions with other evidence. Each provides clues about the circumstances of the crime and how events unfolded.'
			},
			{
				type: 'short-answer',
				question: 'In the context of physical evidence, explain Continuity.',
				answer:
					'Continuity refers to maintaining an unbroken chain of custody for physical evidence from the time it is collected until it is presented in court, ensuring its integrity and admissibility.'
			},
			{
				type: 'short-answer',
				question:
					'Why is it important for the scene investigator to conduct a professional and ethical investigation?',
				answer:
					'A professional and ethical investigation ensures that the rights of all parties are respected, evidence is handled properly, and the integrity of the justice system is maintained.'
			},
			{
				type: 'short-answer',
				question: 'Explain the difference between individual and class characteristics.',
				answer:
					'Individual characteristics are unique features that can be traced to a specific source, such as DNA, while class characteristics are shared by a group or type, such as tire tread patterns.'
			},
			{
				type: 'short-answer',
				question: 'Explain Locard’s principle of exchange.',
				answer:
					'Locard’s principle states that whenever two objects come into contact, they exchange material, meaning that perpetrators leave trace evidence behind at a crime scene and may take evidence away.'
			},
			{
				type: 'short-answer',
				question: 'Explain cross contamination.',
				answer:
					'Cross contamination occurs when evidence from one source is unintentionally transferred to another, potentially compromising the integrity of the investigation and making it difficult to draw accurate conclusions.'
			},
			{
				type: 'short-answer',
				question:
					'What are the influences that are included in the term Evidence Dynamics? Chisum and Turvey listed several influences they considered important. Name these influences.',
				answer:
					'The influences include environmental factors, human interaction, time, and the movement of objects or individuals within the scene, all of which can affect the condition and interpretation of evidence.'
			},
			{
				type: 'short-answer',
				question:
					'In your own words, explain the Macroscene and the Microscene. What is the relationship between these elements of the crime scene?',
				answer:
					'The Macroscene is the overall environment of the crime scene, while the Microscene consists of the smaller, specific areas where individual pieces of evidence are found. Both are interconnected and contribute to the overall understanding of the crime.'
			}
		]
	},
	{
		course: 'PSYCH 2906',
		chapter: 1,
		title: 'Perception Study Notes - Chapter 1',
		questions: [
			{
				type: 'short-answer',
				question: 'Define sensation and perception.',
				answer:
					'Sensation refers to the process by which our sensory receptors and nervous system receive stimuli from the environment. Perception is the process of organizing and interpreting sensory information to give it meaning.'
			},
			{
				type: 'short-answer',
				question:
					'Describe the process of measurement known as psychometrics and explain how this process relates the physical world to perceptions of it.',
				answer:
					'Psychometrics is the process of measuring mental capacities and processes. In relation to perception, it helps quantify how physical stimuli are detected and interpreted by the brain, linking the physical world to psychological perception.'
			},
			{
				type: 'short-answer',
				question: 'Outline the parts of the eye and describe how the sense of vision operates.',
				answer:
					'The main parts of the eye include the cornea, lens, retina, and optic nerve. Light enters through the cornea and lens, focuses on the retina, where photoreceptors (rods and cones) detect the light, and sends signals through the optic nerve to the brain for interpretation.'
			},
			{
				type: 'short-answer',
				question: 'Discuss theories and data that explain how we perceive objects.',
				answer:
					'Theories such as Gestalt theory, which suggests that we perceive objects as whole rather than as individual parts, and feature integration theory, which explains how we combine visual features to perceive coherent objects, are supported by experimental data on visual processing.'
			},
			{
				type: 'short-answer',
				question: 'Describe the perception of colour and theories that explain how it works.',
				answer:
					'Color perception is explained by the trichromatic theory, which posits that color vision is based on three types of cone cells sensitive to red, green, and blue light, and the opponent-process theory, which suggests that colors are perceived in opposing pairs, such as red-green and blue-yellow.'
			},
			{
				type: 'short-answer',
				question: 'Explain how human beings make inferences about distance and depth.',
				answer:
					'Humans use both monocular and binocular cues to perceive depth and distance. Monocular cues include size, texture gradient, and linear perspective, while binocular cues rely on the slight difference in images between both eyes (binocular disparity).'
			},
			{
				type: 'short-answer',
				question: 'Outline the parts of the ear and describe how the sense of hearing operates.',
				answer:
					'The ear consists of the outer ear, middle ear, and inner ear. Sound waves travel through the outer ear to the eardrum in the middle ear, which vibrates and sends these vibrations through the ossicles to the cochlea in the inner ear, where hair cells convert them into neural signals sent to the brain.'
			},
			{
				type: 'short-answer',
				question:
					'Describe the many different types of sensing equipment that we carry in our skins and explain what they sense.',
				answer:
					'Our skin contains different types of receptors, including mechanoreceptors (for touch), thermoreceptors (for temperature), nociceptors (for pain), and proprioceptors (for position). These receptors detect pressure, temperature, pain, and body movement.'
			},
			{
				type: 'short-answer',
				question: 'Outline how the apparatus for the chemical senses (taste, smell) works.',
				answer:
					'Taste involves taste buds on the tongue detecting chemicals in food, while smell is processed by olfactory receptors in the nose that detect airborne chemicals. Both systems send signals to the brain, where these chemical stimuli are interpreted.'
			},
			{
				type: 'short-answer',
				question:
					'Explain why psychologists study sensation and perception and how it can be applied to our everyday lives.',
				answer:
					'Psychologists study sensation and perception to understand how we interpret the world around us, which has practical applications in areas like visual design, hearing aids, and improving road safety through better understanding of depth perception.'
			},
			{
				type: 'short-answer',
				question:
					'Differentiate between the terms sensation and perception and outline how we know there are more than five senses.',
				answer:
					'Sensation refers to the detection of stimuli, while perception involves the interpretation of those stimuli. Beyond the five senses, humans have other senses, such as proprioception (body position), vestibular sense (balance), and nociception (pain).'
			},
			{
				type: 'short-answer',
				question:
					'Understand how stimuli in the physical world get converted into neural signals our brain can process.',
				answer:
					'Stimuli are detected by sensory receptors, which convert the physical energy (e.g., light, sound, chemicals) into electrical signals through a process called transduction. These signals are then transmitted via neurons to specific areas of the brain for processing.'
			},
			{
				type: 'short-answer',
				question:
					'Outline the theories that have been made throughout history during the study of sensation and perception.',
				answer:
					'Throughout history, theories such as empiricism (the idea that perception is learned through experience), nativism (the idea that perception is innate), and the Gestalt principles have shaped our understanding of sensation and perception.'
			},
			{
				type: 'short-answer',
				question:
					'Take facts we know from the research of sensation and perception and apply them to automobile collisions.',
				answer:
					'Research on depth perception, reaction time, and attention has been applied to understand how drivers judge distances and make split-second decisions. Factors like the size-arrival effect, where larger objects appear to move slower, impact the timing of collision responses.'
			},
			{
				type: 'short-answer',
				question:
					'Define the two terms sensation and perception. In your definitions, highlight the differences between the two terms.',
				answer:
					'Sensation is the process of detecting stimuli from the environment through sensory organs, while perception is the interpretation and organization of these sensory inputs. Sensation is about receiving input, while perception is about making sense of it.'
			},
			{
				type: 'short-answer',
				question:
					'How do researchers know we have more than five senses? Name at least seven sensory systems.',
				answer:
					'Researchers know we have more than five senses because sensory systems like proprioception, nociception, and balance have been discovered. Seven sensory systems include sight, hearing, taste, smell, touch, proprioception (body position), and vestibular (balance).'
			},
			{
				type: 'short-answer',
				question: 'What is the process of transduction?',
				answer:
					'Transduction is the process by which sensory receptors convert physical stimuli, such as light or sound waves, into electrical signals that can be interpreted by the brain.'
			},
			{
				type: 'short-answer',
				question: 'Define JND and give an example of one in your life.',
				answer:
					'JND, or Just Noticeable Difference, is the smallest difference in a stimulus that can be detected. For example, when adjusting the volume of music, the smallest increase in volume you can notice is a JND.'
			},
			{
				type: 'short-answer',
				question:
					'Define the phrase time to collision. How does the size-arrival effect change our perception of collision times?',
				answer:
					'Time to collision refers to the estimated time before an object impacts another. The size-arrival effect changes our perception by making larger objects appear to move slower, leading to misjudgment of collision times.'
			},
			{
				type: 'short-answer',
				question: 'What is the doctrine of specific nerve energies?',
				answer:
					'The doctrine of specific nerve energies states that the nature of perception is defined by the pathway that sensory information takes to the brain, rather than the type of stimulus. For example, activating the optic nerve results in visual sensations, even if the stimulus is not light.'
			},
			{
				type: 'short-answer',
				question:
					'What is the difference between the direct perception and information-processing view?',
				answer:
					'Direct perception suggests that we perceive the world directly from the sensory information available without needing internal mental processes, while the information-processing view posits that perception involves the brain actively interpreting sensory data.'
			},
			{
				type: 'short-answer',
				question: 'What is phenomenology and why is it so difficult to address in science?',
				answer:
					'Phenomenology is the subjective experience of perception, or how things feel to us. It is difficult to address scientifically because it deals with personal, internal experiences that cannot be objectively measured.'
			}
		]
	}
];

    
    let selectedCourse = courses[0]; // To store the currently selected course
    let selectedQuestion = 0; // To store the currently selected question index
    let userAnswer = ''; // To store the user's answer
    let showAnswer = false; // To control when the correct answer is shown
    
    function loadCourse(courseIndex) {
        selectedCourse = courses?.[courseIndex] || null; // Ensure selectedCourse is set or null
        selectedQuestion = 0; // Reset to the first question
        userAnswer = ''; // Clear previous user answer
        showAnswer = false; // Reset answer visibility
    }

    function nextQuestion() {
        if (selectedQuestion < selectedCourse.questions.length - 1) {
            selectedQuestion++;
            userAnswer = ''; // Clear previous user answer for the next question
            showAnswer = false; // Hide previous answer
        }
    }

    function previousQuestion() {
        if (selectedQuestion > 0) {
            selectedQuestion--;
            userAnswer = ''; // Clear previous user answer for the previous question
            showAnswer = false; // Hide previous answer
        }
    }

    function checkAnswer() {
        showAnswer = true; // Reveal the correct answer when the user submits their response
    }
</script>

<!-- Page Layout -->
<div class="bg-yellow-200">
<div class="2xl:container mx-auto sm:flex items-stretch min-h-screen relative">
    <div class="relative bg-blue-800 w-full sm:max-w-64 p-4 sm:p-8 sm:before:content-[''] before:absolute before:z-1 before:bg-blue-800 before:h-full before:w-screen before:right-0 before:top-0">
        <h2 class="relative z-1 text-yellow-500 font-bold text-4xl">Courses</h2>
        <!-- Ensure courses array is defined and iterate over it -->
        {#if courses && courses.length > 0}
            <ul class="relative z-2 list-none p-0">
                {#each courses as course, index}
                    <li class="inline md:block">
                        <button on:click={() => loadCourse(index)} class="p-2 bg-blue-600 rounded mt-4 text-white font-bold hover:bg-blue-500 border-0">{course.course}</button>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No courses availabgle</p>
        {/if}
    </div>

    <div class="relative text-center w-full p-4 md:px-16 md:py-8">
        {#if selectedCourse}
			<div class="relative z-2 border-2 border-yellow-300 bg-yellow-100 p-4 rounded-16">
				<h1 class="text-yellow-800 text-2xl font-medium">{selectedCourse.title}</h1>
				<div class="flex flex-col items-center">
					<h3 class="text-lg mb-2">Question {selectedQuestion + 1} of {selectedCourse.questions.length}</h3>
					<p class="mb-2">{selectedCourse.questions[selectedQuestion]?.question}</p>

					<div class="grid gap-2 w-full">
						<textarea rows="10" bind:value={userAnswer} placeholder="Type your answer here..." class="w-full p-2 border-2 border-blue-500 bg-blue-100 m-0 " />
						<button class="sm:w-fit bg-yellow-500 text-blue-900 px-4 py-2 font-bold border-2 border-yellow-500 rounded hover:bg-yellow-600 hover:border-yellow-600 m-0" on:click={checkAnswer}>Submit</button>
					</div>
				</div>
				

				<div class="mt-4">
					{#if showAnswer}
						<div class="mb-2">
							<p class="mb-2">Your answer: {userAnswer}</p>
							<p class="font-medium">Correct answer: {selectedCourse.questions[selectedQuestion].answer}</p>
						</div>
					{/if}

					<div class="mt-4 flex gap-4 justify-center">
						<button on:click={previousQuestion} disabled={selectedQuestion === 0} class="w-fit p-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-500 border-0 disabled:cursor-not-allowed disabled:bg-blue-100">Previous</button>
						<button on:click={nextQuestion} disabled={selectedQuestion === selectedCourse.questions.length - 1} class="w-fit p-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-500 border-0">Next</button>
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
</style>