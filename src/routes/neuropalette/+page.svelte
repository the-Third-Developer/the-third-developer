<script>
	import neuropallete from '$lib/images/neuropallete.webp';
</script>

<div class="bg-sky-500 p-16">
	<h1 class="m-0 mb-4 p-0 text-center text-8xl text-white">
		Neuro <img
			src={neuropallete}
			alt="A brain inside a Hexagon with a hex pattern color wheel"
			class="size-52 mx-auto inline"
		/> Pallete
	</h1>
	<div class="bg-neutral-100 py-8 pl-12 pr-8 rounded-lg">
		<h2 class="m-0 mb-4 p-0 text-center text-4xl">
			Traits of Personality Legend
		</h2>
		<div>Preference for direct, literal communication</div>
		<div>Social anxiety</div>
		<div>Stimming (repetitive movements like hand-flapping)</div>
		<div>High intelligence or giftedness in specific areas</div>
		<div>Issues with motor coordination or clumsiness</div>
		<div>Difficulty filtering out background noise</div>
		<div>Struggles with small talk</div>
		<div>Preference for predictable environments</div>
		<div>High sensitivity to criticism</div>
		<div>Intense interest in specific subjects</div>
		<div>Meltdowns or shutdowns under stress</div>
		<div>Hyper- or hypo-sensitivity to temperature</div>
		<div>Difficulty understanding unspoken social rules</div>
		<div>Difficulty adjusting to new situations</div>
		<div>Rigidity in thinking or problem-solving</div>
		<div>Hyperfocus on specific topics or interests</div>
		<div>Difficulty empathizing in typical ways</div>
		<div>Emotional sensitivity</div>
		<div>Difficulty processing verbal instructions</div>
		<div>Difficulty with changes in plans</div>
		<div>Fascination with patterns or numbers</div>
		<div>Obsessive interests that may shift over time</div>
		<div>Tendency to mimic others' behaviors as a coping strategy</div>
		<div>Difficulty recognizing or expressing emotions</div>
		<div>Delayed response in conversations</div>
		<div>Preference for routines and consistency</div>
		<div>High attention to detail</div>
		<div>Obsessive interests that may dominate daily life</div>
		<div>Difficulty making eye contact</div>
		<div>High sensitivity to feedback or criticism</div>
		<div>Difficulty understanding metaphors</div>
		<div>Inflexibility in opinions or routines</div>
		<div>Highly analytical thinking style</div>
		<div>Difficulty with multitasking</div>
		<div>Strong sense of justice or fairness</div>
		<div>Difficulty understanding the perspectives of others</div>
		<div>Difficulty reading facial expressions</div>
		<div>Preference for factual information over abstract concepts</div>
		<div>Tendency to overthink or ruminate</div>
		<div>Difficulty with executive functioning (planning, organizing)</div>
		<div>Aversion to being touched or hugged unexpectedly</div>
		<div>Aversion to loud noises</div>
		<div>Difficulty understanding sarcasm or jokes</div>
		<div>Fixation on specific routines or rituals</div>
		<div>Fascination with specific objects or textures</div>
		<div>Difficulty with time management</div>
		<div>Strong dislike of uncertainty</div>
		<div>Literal interpretation of language</div>
		<div>Strong dislike of lying or dishonesty</div>
		<div>Difficulty understanding social cues</div>
		<div>Repetitive behaviors or speech</div>
		<div>Difficulty forming and maintaining friendships</div>
		<div>Poor understanding of personal space</div>
		<div>Aversion to strong smells</div>
		<div>Tendency to monologue on interests</div>
		<div>Preference for solo activities</div>
		<div>Tendency to zone out or daydream</div>
		<div>Difficulty initiating or maintaining conversations</div>
		<div>Sensory overload in crowded spaces</div>
		<div>Sensory sensitivities (e.g., light, sound, textures)</div>
	</div>

	<div class="text-center">
		<h2>Pallete</h2>
		<div class="hex-grid">
			<div>01</div>
			<div>02</div>
			<div>03</div>
			<div>04</div>
			<div>05</div>
			<div>06</div>
			<div>07</div>
			<div>08</div>
			<div>09</div>
			<div>10</div>
			<div>11</div>
			<div>12</div>
			<div>13</div>
			<div>14</div>
			<div>15</div>
			<div>16</div>
			<div>17</div>
			<div>18</div>
			<div>19</div>
			<div>20</div>
			<div>21</div>
			<div>22</div>
			<div>23</div>
			<div>24</div>
			<div>25</div>
			<div>26</div>
			<div>27</div>
			<div>28</div>
			<div>29</div>
			<div>30</div>
			<div>31</div>
			<div>32</div>
			<div>33</div>
			<div>34</div>
			<div>35</div>
			<div>36</div>
			<div>37</div>
			<div>38</div>
			<div>39</div>
			<div>40</div>
			<div>41</div>
			<div>42</div>
			<div>43</div>
			<div>44</div>
			<div>45</div>
			<div>46</div>
			<div>47</div>
			<div>48</div>
			<div>49</div>
			<div>50</div>
			<div>51</div>
			<div>52</div>
			<div>53</div>
			<div>54</div>
			<div>55</div>
			<div>56</div>
			<div>57</div>
			<div>58</div>
			<div>59</div>
			<div>60</div>
		</div>
	</div>
</div>

<style>
	.hex-grid {
		display: grid;
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
	}

	.hex-grid div {
		aspect-ratio: 1 / 1;
		clip-path: polygon(
			50% 0%,
			100% 25%,
			100% 75%,
			50% 100%,
			0% 75%,
			0% 25%
		);
		background: lightgrey;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		width: 5rem;
		overflow: hidden;
	}

	.hex-grid div:nth-of-type(1) {
		grid-column: 3;
		grid-row: 1;
		transform: translateX(-50%);
	}
	.hex-grid div:nth-of-type(2) {
		grid-column: 2;
		grid-row: 1;
		transform: translateY(75%);
	}
	.hex-grid div:nth-of-type(3) {
		grid-column: 3;
		grid-row: 1;
		transform: translateY(75%);
	}
	.hex-grid div:nth-of-type(4) {
		grid-column: 4;
		grid-row: 2;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(5) {
		grid-column: 2;
		grid-row: 2;
		transform: translate(-50%, 50%);
	}
	.hex-grid div:nth-of-type(6) {
		grid-column: 3;
		grid-row: 2;
		transform: translate(-50%, 50%);
	}
	.hex-grid div:nth-of-type(7) {
		grid-column: 4;
		grid-row: 2;
		transform: translate(-50%, 50%);
	}
	.hex-grid div:nth-of-type(8) {
		grid-column: 4;
		grid-row: 2;
		transform: translate(50%, 50%);
	}
	.hex-grid div:nth-of-type(9) {
		grid-column: 4;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(10) {
		grid-column: 5;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(11) {
		grid-column: 7;
		grid-row: 1;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(12) {
		grid-column: 8;
		grid-row: 1;
		transform: translateY(75%);
	}
	.hex-grid div:nth-of-type(13) {
		grid-column: 7;
		grid-row: 1;
		transform: translateY(75%);
	}
	.hex-grid div:nth-of-type(14) {
		grid-column: 6;
		grid-row: 2;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(15) {
		grid-column: 8;
		grid-row: 2;
		transform: translate(50%, 50%);
	}
	.hex-grid div:nth-of-type(16) {
		grid-column: 7;
		grid-row: 2;
		transform: translate(50%, 50%);
	}
	.hex-grid div:nth-of-type(17) {
		grid-column: 6;
		grid-row: 2;
		transform: translate(50%, 50%);
	}
	.hex-grid div:nth-of-type(18) {
		grid-column: 5;
		grid-row: 2;
		transform: translate(50%, 50%);
	}
	.hex-grid div:nth-of-type(19) {
		grid-column: 6;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(20) {
		grid-column: 6;
		grid-row: 4;
		transform: translateX(-50%);
	}
	.hex-grid div:nth-of-type(21) {
		grid-column: 9;
		grid-row: 4;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(22) {
		grid-column: 9;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(23) {
		grid-column: 9;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(24) {
		grid-column: 8;
		grid-row: 4;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(25) {
		grid-column: 8;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(26) {
		grid-column: 8;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(27) {
		grid-column: 7;
		grid-row: 4;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(28) {
		grid-column: 7;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(29) {
		grid-column: 7;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(30) {
		grid-column: 6;
		grid-row: 4;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(31) {
		grid-column: 7;
		grid-row: 7;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(32) {
		grid-column: 8;
		grid-row: 7;
		transform: translateY(-75%);
	}
	.hex-grid div:nth-of-type(33) {
		grid-column: 7;
		grid-row: 7;
		transform: translateY(-75%);
	}
	.hex-grid div:nth-of-type(34) {
		grid-column: 6;
		grid-row: 6;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(35) {
		grid-column: 8;
		grid-row: 6;
		transform: translate(50%, -50%);
	}
	.hex-grid div:nth-of-type(36) {
		grid-column: 7;
		grid-row: 6;
		transform: translate(50%, -50%);
	}
	.hex-grid div:nth-of-type(37) {
		grid-column: 6;
		grid-row: 6;
		transform: translate(50%, -50%);
	}
	.hex-grid div:nth-of-type(38) {
		grid-column: 6;
		grid-row: 6;
		transform: translate(-50%, -50%);
	}
	.hex-grid div:nth-of-type(39) {
		grid-column: 6;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(40) {
		grid-column: 5;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(41) {
		grid-column: 3;
		grid-row: 7;
		transform: translateX(-50%);
	}
	.hex-grid div:nth-of-type(42) {
		grid-column: 2;
		grid-row: 7;
		transform: translateY(-75%);
	}
	.hex-grid div:nth-of-type(43) {
		grid-column: 3;
		grid-row: 7;
		transform: translateY(-75%);
	}
	.hex-grid div:nth-of-type(44) {
		grid-column: 4;
		grid-row: 6;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(45) {
		grid-column: 2;
		grid-row: 6;
		transform: translate(-50%, -50%);
	}
	.hex-grid div:nth-of-type(46) {
		grid-column: 3;
		grid-row: 6;
		transform: translate(-50%, -50%);
	}
	.hex-grid div:nth-of-type(47) {
		grid-column: 4;
		grid-row: 6;
		transform: translate(-50%, -50%);
	}
	.hex-grid div:nth-of-type(48) {
		grid-column: 5;
		grid-row: 6;
		transform: translate(-50%, -50%);
	}
	.hex-grid div:nth-of-type(49) {
		grid-column: 4;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(50) {
		grid-column: 4;
		grid-row: 4;
		transform: translateX(50%);
	}
	.hex-grid div:nth-of-type(51) {
		grid-column: 1;
		grid-row: 4;
		transform: translateX(-50%);
	}
	.hex-grid div:nth-of-type(52) {
		grid-column: 1;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(53) {
		grid-column: 1;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(54) {
		grid-column: 2;
		grid-row: 4;
		transform: translateX(-50%);
	}
	.hex-grid div:nth-of-type(55) {
		grid-column: 2;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(56) {
		grid-column: 2;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(57) {
		grid-column: 3;
		grid-row: 4;
		transform: translateX(-50%);
	}
	.hex-grid div:nth-of-type(58) {
		grid-column: 3;
		grid-row: 5;
		transform: translateY(-25%);
	}
	.hex-grid div:nth-of-type(59) {
		grid-column: 3;
		grid-row: 3;
		transform: translateY(25%);
	}
	.hex-grid div:nth-of-type(60) {
		grid-column: 4;
		grid-row: 4;
		transform: translateX(-50%);
	}

	/* Group 1: Shades of Red/Orange/Pink (Hexagons 1-10) */
	.hex-grid div:nth-of-type(1) {
		background: hwb(0 0% 0%);
	}
	.hex-grid div:nth-of-type(2) {
		background: hwb(5 0% 0%);
	}
	.hex-grid div:nth-of-type(3) {
		background: hwb(10 0% 0%);
	}
	.hex-grid div:nth-of-type(4) {
		background: hwb(15 0% 0%);
	}
	.hex-grid div:nth-of-type(5) {
		background: hwb(330 0% 0%);
	}
	.hex-grid div:nth-of-type(6) {
		background: hwb(335 0% 0%);
	}
	.hex-grid div:nth-of-type(7) {
		background: hwb(340 0% 0%);
	}
	.hex-grid div:nth-of-type(8) {
		background: hwb(20 0% 0%);
	}
	.hex-grid div:nth-of-type(9) {
		background: hwb(345 0% 0%);
	}
	.hex-grid div:nth-of-type(10) {
		background: hwb(25 0% 0%);
	}

	/* Group 2: Shades of Yellow/Green (Hexagons 11-20) */
	.hex-grid div:nth-of-type(11) {
		background: hwb(55 0% 0%);
	}
	.hex-grid div:nth-of-type(12) {
		background: hwb(60 0% 0%);
	}
	.hex-grid div:nth-of-type(13) {
		background: hwb(50 0% 0%);
	}
	.hex-grid div:nth-of-type(14) {
		background: hwb(40 0% 0%);
	}
	.hex-grid div:nth-of-type(15) {
		background: hwb(80 0% 0%);
	}
	.hex-grid div:nth-of-type(16) {
		background: hwb(75 0% 0%);
	}
	.hex-grid div:nth-of-type(17) {
		background: hwb(45 0% 0%);
	}
	.hex-grid div:nth-of-type(18) {
		background: hwb(35 0% 0%);
	}
	.hex-grid div:nth-of-type(19) {
		background: hwb(95 0% 0%);
	}
	.hex-grid div:nth-of-type(20) {
		background: hwb(97 0% 0%);
	}

	/* Group 3: Shades of Green/Blue-Green (Hexagons 21-30) */
	.hex-grid div:nth-of-type(21) {
		background: hwb(120 0% 0%);
	}
	.hex-grid div:nth-of-type(22) {
		background: hwb(125 0% 0%);
	}
	.hex-grid div:nth-of-type(23) {
		background: hwb(130 0% 0%);
	}
	.hex-grid div:nth-of-type(24) {
		background: hwb(135 0% 0%);
	}
	.hex-grid div:nth-of-type(25) {
		background: hwb(105 0% 0%);
	}
	.hex-grid div:nth-of-type(26) {
		background: hwb(145 0% 0%);
	}
	.hex-grid div:nth-of-type(27) {
		background: hwb(115 0% 0%);
	}
	.hex-grid div:nth-of-type(28) {
		background: hwb(85 0% 0%);
	}
	.hex-grid div:nth-of-type(29) {
		background: hwb(140 0% 0%);
	}
	.hex-grid div:nth-of-type(30) {
		background: hwb(110 0% 0%);
	}

	/* Group 4: Shades of Blue (Hexagons 31-40) */
	.hex-grid div:nth-of-type(31) {
		background: hwb(180 0% 0%);
	}
	.hex-grid div:nth-of-type(32) {
		background: hwb(185 0% 0%);
	}
	.hex-grid div:nth-of-type(33) {
		background: hwb(190 0% 0%);
	}
	.hex-grid div:nth-of-type(34) {
		background: hwb(195 0% 0%);
	}
	.hex-grid div:nth-of-type(35) {
		background: hwb(165 0% 0%);
	}
	.hex-grid div:nth-of-type(36) {
		background: hwb(170 0% 0%);
	}
	.hex-grid div:nth-of-type(37) {
		background: hwb(175 0% 0%);
	}
	.hex-grid div:nth-of-type(38) {
		background: hwb(200 0% 0%);
	}
	.hex-grid div:nth-of-type(39) {
		background: hwb(150 0% 0%);
	}
	.hex-grid div:nth-of-type(40) {
		background: hwb(300 0% 0%);
	}

	/* Group 5: Shades of Blue-Purple (Hexagons 41-50) */
	.hex-grid div:nth-of-type(41) {
		background: hwb(240 0% 0%);
	}
	.hex-grid div:nth-of-type(42) {
		background: hwb(245 0% 0%);
	}
	.hex-grid div:nth-of-type(43) {
		background: hwb(235 0% 0%);
	}
	.hex-grid div:nth-of-type(44) {
		background: hwb(230 0% 0%);
	}
	.hex-grid div:nth-of-type(45) {
		background: hwb(250 0% 0%);
	}
	.hex-grid div:nth-of-type(46) {
		background: hwb(225 0% 0%);
	}
	.hex-grid div:nth-of-type(47) {
		background: hwb(220 0% 0%);
	}
	.hex-grid div:nth-of-type(48) {
		background: hwb(215 0% 0%);
	}
	.hex-grid div:nth-of-type(49) {
		background: hwb(295 0% 0%);
	}
	.hex-grid div:nth-of-type(50) {
		background: hwb(315 0% 0%);
	}

	/* Group 6: Shades of Purple-Pink (Hexagons 51-60) */
	.hex-grid div:nth-of-type(51) {
		background: hwb(264 0% 0%);
	}
	.hex-grid div:nth-of-type(52) {
		background: hwb(260 0% 0%);
	}
	.hex-grid div:nth-of-type(53) {
		background: hwb(275 0% 0%);
	}
	.hex-grid div:nth-of-type(54) {
		background: hwb(270 0% 0%);
	}
	.hex-grid div:nth-of-type(55) {
		background: hwb(320 0% 0%);
	}
	.hex-grid div:nth-of-type(56) {
		background: hwb(265 0% 0%);
	}
	.hex-grid div:nth-of-type(57) {
		background: hwb(288 0% 0%);
	}
	.hex-grid div:nth-of-type(58) {
		background: hwb(290 0% 0%);
	}
	.hex-grid div:nth-of-type(59) {
		background: hwb(335 0% 0%);
	}
	.hex-grid div:nth-of-type(60) {
		background: hwb(305 0% 0%);
	}
</style>
