<script>
    // Stat variables
    let baseStat = 0;
    let iv = 31;
    let ev = 0;
    let level = 1;
    let natureModifierBlue = 0.9;
    let natureModifierRed = 1.1;

    // Move power variables
    let basePower = 0;
    let typeEffectiveness = 1; // Neutral effectiveness
    let stab = 1; // No STAB by default
    let statModifier = 1; // Default modifier (neutral)

    // Calculated stats
    $: hp = ((2 * baseStat + iv + (ev / 4)) * level / 100) + level + 10;
    $: statBlue = (((2 * baseStat + iv + (ev / 4)) * level / 100) + 5) * natureModifierBlue;
    $: statRed = (((2 * baseStat + iv + (ev / 4)) * level / 100) + 5) * natureModifierRed;
    $: statNormal = (((2 * baseStat + iv + (ev / 4)) * level / 100) + 5);

    // Move power calculation
    $: movePower = basePower * typeEffectiveness * stab * statModifier;
</script>

<div class="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center py-10">
    <h1 class="text-3xl font-bold text-yellow-500 mb-6">Pokémon Stat & Move Power Calculator</h1>

    <div class="flex flex-row flex-wrap gap-6">
        <div>
        <!-- Stat Calculator -->
        <form class="w-96 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-yellow-500 mb-4">Stat Calculator</h2>
        
        <div>
            <label for="baseStat" class="block text-sm font-medium text-blue-400">Base Stat</label>
            <input id="baseStat" type="number" bind:value={baseStat} min="0"
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500" />
        </div>
        
        <div>
            <label for="iv" class="block text-sm font-medium text-red-400">IV (0-31)</label>
            <input id="iv" type="number" bind:value={iv} min="0" max="31"
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500" />
        </div>
        
        <div>
            <label for="ev" class="block text-sm font-medium text-blue-400">EV (0-255)</label>
            <input id="ev" type="number" bind:value={ev} min="0" max="255"
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500" />
        </div>
        
        <div>
            <label for="level" class="block text-sm font-medium text-red-400">Level</label>
            <input id="level" type="number" bind:value={level} min="1" max="100"
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500" />
        </div>
    </form>
    
    <!-- Calculated Stats -->
    <div class="w-96 mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-yellow-500 mb-4">Calculated Stats</h2>
        <div class="text-lg space-y-2">
            <p><span class="text-blue-400">HP:</span> {Math.floor(hp)}</p>
            <p><span class="text-red-400">Stat (Nature Blue):</span> {Math.floor(statBlue)}</p>
            <p><span class="text-yellow-400">Stat (Nature Red):</span> {Math.floor(statRed)}</p>
            <p><span class="text-gray-300">Stat (Normal Nature):</span> {Math.floor(statNormal)}</p>
        </div>
    </div>
    </div>
    <div>
    <!-- Move Power Calculator -->
    <form class="w-96 mt-6 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-yellow-500 mb-4">Move Power Calculator</h2>
        
        <div>
            <label for="basePower" class="block text-sm font-medium text-blue-400">Base Power</label>
            <input id="basePower" type="number" bind:value={basePower} min="0"
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500" />
        </div>
        
        <div>
            <label for="typeEffectiveness" class="block text-sm font-medium text-red-400">Type Effectiveness</label>
            <select id="typeEffectiveness" bind:value={typeEffectiveness}
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500">
                <option value="0">0x (No Effect)</option>
                <option value="0.5">0.5x (Not Very Effective)</option>
                <option value="1" selected>1x (Neutral)</option>
                <option value="2">2x (Super Effective)</option>
                <option value="4">4x (4x Effective)</option>
            </select>
        </div>
        
        <div>
            <label for="stab" class="block text-sm font-medium text-yellow-400">STAB</label>
            <select id="stab" bind:value={stab}
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500">
                <option value="1">No STAB</option>
                <option value="1.5">STAB</option>
            </select>
        </div>
        
        <div>
            <label for="statModifier" class="block text-sm font-medium text-gray-300">Stat Modifier</label>
            <input id="statModifier" type="number" bind:value={statModifier} min="0.25" max="4" step="0.25"
                class="mt-1 block w-full bg-gray-700 text-gray-200 border-none rounded p-2 focus:ring focus:ring-yellow-500" />
        </div>
    </form>

    <!-- Calculated Move Power -->
    <div class="w-96 mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-yellow-500 mb-4">Move Power</h2>
        <div class="text-lg">
            <p><span class="text-blue-400">Calculated Move Power:</span> {Math.floor(movePower)}</p>
        </div>
    </div>
    </div>
    </div>
</div>
