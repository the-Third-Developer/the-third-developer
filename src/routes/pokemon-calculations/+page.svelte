<script>
    // Reactive variables to hold the input values
    let baseStat = 0;
    let iv = 31;
    let ev = 0;
    let level = 1;
    let natureModifierBlue = 0.9;
    let natureModifierRed = 1.1;

    // Reactive variables for stats
    $: hp = ((2 * baseStat + iv + (ev / 4)) * level / 100) + level + 10;
    $: statBlue = (((2 * baseStat + iv + (ev / 4)) * level / 100) + 5) * natureModifierBlue;
    $: statRed = (((2 * baseStat + iv + (ev / 4)) * level / 100) + 5) * natureModifierRed;
    $: statNormal = (((2 * baseStat + iv + (ev / 4)) * level / 100) + 5);
</script>

<div class="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center py-10">
    <h1 class="text-3xl font-bold text-yellow-500 mb-6">Pokémon Stat Calculator</h1>

    <form class="w-96 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
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
