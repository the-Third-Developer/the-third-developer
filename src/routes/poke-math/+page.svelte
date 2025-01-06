<script>
	// Import Chart.js for the line graph
	import { onMount } from 'svelte';
	let Chart;

	onMount(async () => {
		const chartModule = await import('chart.js/auto');
		Chart = chartModule.default;
	});

	// Updated damage formula variables
	let level = 50;
	let power = 80;
	let attack = 100;
	let defense = 100;
	let guts = false;
	let physical = true;
	let burn = physical && !guts ? 0.5 : 1;
	let doublesBattle = false;
	let screen = doublesBattle ? 0.66 : 1;
	let multiTarget = false;
	let targets = doublesBattle && multiTarget ? 0.75 : 1;
	let weather = true;
	let weatherFavor = true;
	let weatherValue = weather && weatherFavor ? 1.5 : 0.5;
	let ff = 1.5;
	let sniper = false;
	let critical = false;
	$: criticalValue = critical ? (sniper ? 3 : 2) : 1;
	let itemLifeOrb = false;
	let itemMetronome = false;
	let metronomeNumber = 1;
	let meFirst = true;
	let first = 1.5;
	let stab = true;
	let adaptability = false;
	let stabDamage = stab ? (adaptability ? 2 : 1.5) : 1;
	let type1 = 1;
	let type2 = 1;
	let mouldBreaker = false;
	let srf = false;
	$: srfDamage = srf && !mouldBreaker ? 0.75 : 1;
	let eb = false;
	let tl = false;
	$: ebValue = eb ? 1.2 : 1;
	$: tlValue = tl ? 1.2 : 1;
	let suppressionBerry = false;
	$: berryValue = suppressionBerry ? 0.5 : 1;

	// Random modifier range (0.85 to 1.00)
	const randomModifiers = Array.from(
		{ length: 16 },
		(_, i) => 0.85 + i * 0.01,
	);

	$: itemValue =
		itemType === 'lifeOrb'
			? 1.3
			: itemType === 'metronome'
				? 1 + Math.min(metronomeNumber, 10) / 10
				: itemType === 'expertBelt'
					? 1.2
					: itemType === 'suppressionBerry'
						? 0.5
						: 1;

	$: damageRange = randomModifiers.map(random => {
		return Math.floor(
			(((((2 * level) / 5 + 2) * power * attack) / defense / 50) *
				burn *
				screen *
				targets *
				weatherValue *
				ff +
				2) *
				criticalValue *
				itemValue *
				first *
				random *
				stabDamage *
				type1 *
				type2 *
				srfDamage *
				ebValue *
				tlValue *
				berryValue,
		);
	});

	$: minDamage = Math.min(...damageRange);
	$: maxDamage = Math.max(...damageRange);
	$: avgDamage = Math.round(
		damageRange.reduce((a, b) => a + b) / damageRange.length,
	);

	let chart;

	function updateChart() {
		if (chart) {
			chart.destroy();
		}

		const ctx = document.getElementById('damageChart');
		if (!ctx) return;

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: randomModifiers.map(r => r.toFixed(2)),
				datasets: [
					{
						label: 'Damage',
						data: damageRange,
						borderColor: '#EAB308',
						backgroundColor: 'rgba(234, 179, 8, 0.2)',
						tension: 0.1,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Damage Range',
						color: '#E5E7EB',
					},
					legend: {
						labels: {
							color: '#E5E7EB',
						},
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: 'rgba(255, 255, 255, 0.1)',
						},
						ticks: {
							color: '#E5E7EB',
						},
					},
					x: {
						grid: {
							color: 'rgba(255, 255, 255, 0.1)',
						},
						ticks: {
							color: '#E5E7EB',
						},
					},
				},
			},
		});
	}

	$: if (Chart && damageRange) {
		setTimeout(updateChart, 0);
	}

	// Add this new variable for radio group
	let itemType = 'none';

	// Update the reactive declarations
	$: itemLifeOrb = itemType === 'lifeOrb';
	$: itemMetronome = itemType === 'metronome';
</script>

<div
	class="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center py-4 px-2"
>
	<h1 class="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">
		Pokemon Damage Calculator
	</h1>

	<div class="w-full max-w-7xl space-y-4">
		<!-- Main Controls -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<!-- Attacker Stats -->
			<div class="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
				<h2 class="text-lg font-semibold text-yellow-500">
					Attacker Stats
				</h2>
				<div class="space-y-2">
					<label class="block">
						<span class="text-sm text-gray-400">Level</span>
						<input
							type="number"
							bind:value={level}
							min="1"
							max="100"
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						/>
					</label>
					<label class="block">
						<span class="text-sm text-gray-400">Move Power</span>
						<input
							type="number"
							bind:value={power}
							min="0"
							max="250"
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						/>
					</label>
					<label class="block">
						<span class="text-sm text-gray-400"
							>Attack/Sp. Attack</span
						>
						<input
							type="number"
							bind:value={attack}
							min="1"
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						/>
					</label>

					<!-- Type Effectiveness -->
					<label class="block">
						<span class="text-sm text-gray-400"
							>Type 1 Effectiveness</span
						>
						<select
							bind:value={type1}
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						>
							<option value={0}>Immune (0x)</option>
							<option value={0.5}
								>Not Very Effective (0.5x)</option
							>
							<option value={1}>Normal (1x)</option>
							<option value={2}>Super Effective (2x)</option>
						</select>
					</label>

					<label class="block">
						<span class="text-sm text-gray-400"
							>Type 2 Effectiveness</span
						>
						<select
							bind:value={type2}
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						>
							<option value={1}
								>Normal / No Second Type (1x)</option
							>
							<option value={0}>Immune (0x)</option>
							<option value={0.5}
								>Not Very Effective (0.5x)</option
							>
							<option value={2}>Super Effective (2x)</option>
						</select>
					</label>

					<!-- Status Conditions -->
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							on:change={e => (guts = e.target.checked ? 0.5 : 1)}
							class="rounded text-yellow-500 focus:ring-yellow-500"
						/>
						<span>Guts</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							on:change={e =>
								(physical = e.target.checked ? 0.5 : 1)}
							class="rounded text-yellow-500 focus:ring-yellow-500"
						/>
						<span>{physical ? 'Physical' : 'Special'}</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							on:change={e => (burn = e.target.checked ? 0.5 : 1)}
							class="rounded text-yellow-500 focus:ring-yellow-500"
						/>
						<span>Burn (0.5x)</span>
					</label>
				</div>
			</div>

			<!-- Battle Conditions -->
			<div class="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
				<h2 class="text-lg font-semibold text-yellow-500">
					Battle Conditions
				</h2>
				<div class="space-y-2">
					<!-- Field Effects -->
					<label class="block">
						<span class="text-sm text-gray-400">Screen Effect</span>
						<select
							bind:value={screen}
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						>
							<option value={1}>None (1x)</option>
							<option value={0.5}>Single Battle (0.5x)</option>
							<option value={0.66}>Double Battle (0.66x)</option>
						</select>
					</label>

					<!-- Weather -->
					<label class="block">
						<span class="text-sm text-gray-400">Weather</span>
						<select
							bind:value={weather}
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						>
							<option value={1}>Normal (1x)</option>
							<option value={1.5}>Boosted (1.5x)</option>
							<option value={0.5}>Reduced (0.5x)</option>
						</select>
					</label>

					<!-- Critical Hit -->
					<div class="space-y-2">
						<span class="text-sm text-gray-400">Critical Hit</span>
						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								bind:checked={critical}
								class="rounded text-yellow-500 focus:ring-yellow-500"
							/>
							<span>Critical Hit</span>
						</div>
						{#if critical}
							<div class="flex items-center gap-2 ml-4">
								<input
									type="checkbox"
									bind:checked={sniper}
									class="rounded text-yellow-500 focus:ring-yellow-500"
								/>
								<span>Sniper Ability</span>
							</div>
						{/if}
					</div>

					<!-- Items -->
					<div class="space-y-2">
						<span class="text-sm text-gray-400"
							>Item & Ability Effects</span
						>
						<div class="flex flex-col gap-2">
							<!-- Held Items -->
							<div class="space-y-1">
								<span class="text-sm font-medium"
									>Held Items</span
								>
								<label class="flex items-center gap-2">
									<input
										type="radio"
										bind:group={itemType}
										value="none"
										class="text-yellow-500 focus:ring-yellow-500"
									/>
									<span>None</span>
								</label>
								<label class="flex items-center gap-2">
									<input
										type="radio"
										bind:group={itemType}
										value="lifeOrb"
										class="text-yellow-500 focus:ring-yellow-500"
									/>
									<span>Life Orb</span>
								</label>
								<label class="flex items-center gap-2">
									<input
										type="radio"
										bind:group={itemType}
										value="metronome"
										class="text-yellow-500 focus:ring-yellow-500"
									/>
									<span>Metronome</span>
								</label>
								<label class="flex items-center gap-2">
									<input
										type="radio"
										bind:group={itemType}
										value="expertBelt"
										class="text-yellow-500 focus:ring-yellow-500"
									/>
									<span>Expert Belt</span>
								</label>
								<label class="flex items-center gap-2">
									<input
										type="radio"
										bind:group={itemType}
										value="tintedLens"
										class="text-yellow-500 focus:ring-yellow-500"
									/>
									<span>Tinted Lens</span>
								</label>
								<label class="flex items-center gap-2">
									<input
										type="radio"
										bind:group={itemType}
										value="suppressionBerry"
										class="text-yellow-500 focus:ring-yellow-500"
									/>
									<span>Suppression Berry</span>
								</label>
							</div>

							{#if itemType === 'metronome'}
								<label class="block ml-6">
									<span class="text-sm text-gray-400"
										>Times Used</span
									>
									<input
										type="number"
										bind:value={metronomeNumber}
										min="1"
										max="10"
										class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
									/>
								</label>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Defender Stats -->
			<div class="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
				<h2 class="text-lg font-semibold text-yellow-500">
					Defender Stats
				</h2>
				<div class="space-y-2">
					<label class="block">
						<span class="text-sm text-gray-400"
							>Defense/Sp. Defense</span
						>
						<input
							type="number"
							bind:value={defense}
							min="1"
							class="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-500"
						/>
					</label>

					<!-- Abilities -->
					<div class="space-y-2">
						<span class="text-sm text-gray-400"
							>Defensive Ability</span
						>
						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								bind:checked={srf}
								class="rounded text-yellow-500 focus:ring-yellow-500"
							/>
							<span>Solid Rock/Filter</span>
						</div>
						{#if srf}
							<div class="flex items-center gap-2 ml-4">
								<input
									type="checkbox"
									bind:checked={mouldBreaker}
									class="rounded text-yellow-500 focus:ring-yellow-500"
								/>
								<span>Mold Breaker</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<canvas id="damageChart" class="md:col-span-2 lg:col-span-3"></canvas>
	</div>
</div>
