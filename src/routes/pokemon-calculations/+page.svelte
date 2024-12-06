<script>
    import pokemonStats from './pokemonStats.json';
    import pokemonMoves from './pokemonMoves.json';
    
    let selectedPokemon = null;
    let selectedNature = "Adamant";

    let iv = 31;
    let ev = 0;
    let level = 1;

    const MAX_BASE_POWER = 250;
    const MAX_EV = 252;
    const MAX_IV = 31;
    const MAX_LEVEL = 100;
    const MAX_STAT_STAGE = 6;
    const MIN_STAT_STAGE = -6;

    let basePower = 0;
    let typeEffectiveness = 1;
    let stab = 1;
    let statModifier = 1;

    let selectedMove = null;

    let singleSelectMode = false;

    let searchQuery = '';

    $: sTierPokemon = Object.entries(pokemonStats.S_TIER).map(([name]) => ({ name, tier: "S" }));
    $: aTierPokemon = Object.entries(pokemonStats.A_TIER).map(([name]) => ({ name, tier: "A" }));
    $: bTierPokemon = Object.entries(pokemonStats.B_TIER).map(([name]) => ({ name, tier: "B" }));
    $: cTierPokemon = Object.entries(pokemonStats.C_TIER).map(([name]) => ({ name, tier: "C" }));
    $: dTierPokemon = Object.entries(pokemonStats.D_TIER).map(([name]) => ({ name, tier: "D" }));
    $: eTierPokemon = Object.entries(pokemonStats.E_TIER).map(([name]) => ({ name, tier: "E" }));
    $: fTierPokemon = Object.entries(pokemonStats.F_TIER).map(([name]) => ({ name, tier: "F" }));
    
    $: allPokemon = [
        ...Object.entries(pokemonStats.S_TIER),
        ...Object.entries(pokemonStats.A_TIER),
        ...Object.entries(pokemonStats.B_TIER),
        ...Object.entries(pokemonStats.C_TIER),
        ...Object.entries(pokemonStats.D_TIER),
        ...Object.entries(pokemonStats.E_TIER),
        ...Object.entries(pokemonStats.F_TIER)
    ];

    function getPokemonTier(pokemonName) {
        if (pokemonStats.S_TIER[pokemonName]) return "S";
        if (pokemonStats.A_TIER[pokemonName]) return "A";
        if (pokemonStats.B_TIER[pokemonName]) return "B";
        if (pokemonStats.C_TIER[pokemonName]) return "C";
        if (pokemonStats.D_TIER[pokemonName]) return "D";
        if (pokemonStats.E_TIER[pokemonName]) return "E";
        if (pokemonStats.F_TIER[pokemonName]) return "F";
        return "";
    }

    function getStatStageMultiplier(stage) {
        if (stage >= 0) {
            return (2 + stage) / 2;
        } else {
            return 2 / (2 - stage);
        }
    }

    function calculateStats(pokemon, level, iv, ev, nature, stages = {}) {
        if (!pokemon) return null;

        // Ensure minimum values can't go below 1
        const MIN_STAT = 1;

        const natureMultiplier = (stat) => {
            if (!nature) return 1;
            return stat === nature.increase ? 1.1 : 
                   stat === nature.decrease ? 0.9 : 1;
        };

        const stageMultiplier = (stat) => {
            const stage = stages[stat] || 0;
            return getStatStageMultiplier(
                Math.min(Math.max(stage, MIN_STAT_STAGE), MAX_STAT_STAGE)
            );
        };

        level = Math.min(Math.max(level, 1), MAX_LEVEL);
        iv = Math.min(Math.max(iv, 0), MAX_IV);
        ev = Math.min(Math.max(ev, 0), MAX_EV);

        const hp = Math.max(
            Math.floor(((2 * pokemon.hp + iv + Math.floor(ev / 4)) * level) / 100) + level + 10,
            MIN_STAT
        );

        const calculateStat = (baseStat, statName) => {
            const base = Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5;
            const natureModified = Math.floor(base * natureMultiplier(statName));
            const stageModified = Math.floor(natureModified * stageMultiplier(statName));
            return Math.max(stageModified, MIN_STAT);  // Ensure no stat goes below 1
        };

        return {
            hp,
            attack: calculateStat(pokemon.attack, "attack"),
            defense: calculateStat(pokemon.defense, "defense"),
            specialAttack: calculateStat(pokemon.specialAttack, "specialAttack"),
            specialDefense: calculateStat(pokemon.specialDefense, "specialDefense"),
            speed: calculateStat(pokemon.speed, "speed")
        };
    }

    function handlePokemonSelect(event) {
        const selectedPokemonName = event.target.value;
        selectedPokemon = allPokemon.find(([name]) => name === selectedPokemonName)?.[1];
        if (selectedPokemon) {
            selectedPokemon.name = selectedPokemonName;
        }
    }

    function handlePokemonFocus(event) {
        event.target.value = '';
    }

    $: stats = selectedPokemon ? calculateStats(selectedPokemon, level, iv, ev, pokemonStats.NATURES[selectedNature]) : null;

    $: movePower = basePower * typeEffectiveness * stab * statModifier;

    function getMovesForPokemon(pokemonName) {
        return pokemonMoves[pokemonName] || [];
    }

    function getMoveDetails(moveName) {
        for (const [type, moves] of Object.entries(pokemonStats.MOVES)) {
            if (moves[moveName]) {
                return { ...moves[moveName], name: moveName };
            }
        }
        return null;
    }

    function getGroupedMoves(pokemonName) {
        const moves = getMovesForPokemon(pokemonName);
        const grouped = {};
        
        moves.forEach(moveName => {
            const moveDetails = getMoveDetails(moveName);
            if (moveDetails) {
                if (!grouped[moveDetails.type]) {
                    grouped[moveDetails.type] = [];
                }
                grouped[moveDetails.type].push(moveDetails);
            }
        });


        Object.values(grouped).forEach(moveList => {
            moveList.sort((a, b) => b.power - a.power);
        });


        return Object.fromEntries(
            Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
        );
    }

    function handleMoveSelect(move) {
        selectedMove = move;
        basePower = move.power;
    }

    $: groupedMoves = selectedPokemon ? getGroupedMoves(selectedPokemon.name) : {};

    function adjustMovePower(amount) {
        const newValue = basePower + amount;
        if (newValue >= 0 && newValue <= MAX_BASE_POWER) {
            basePower = newValue;
        }
    }

    function getLabel(stat) {
        const labels = {
            attack: "Atk",
            defense: "Def",
            specialAttack: "SpA",
            specialDefense: "SpD",
            speed: "Spe"
        };
        return labels[stat];
    }

    function getNatureName(increasedStat, decreasedStat) {
        if (increasedStat === decreasedStat) {
            return "Hardy"
        }
        for (const [natureName, nature] of Object.entries(pokemonStats.NATURES)) {
            if (nature.increase === increasedStat && nature.decrease === decreasedStat) {
                return natureName;
            }
        }
        return "Hardy"
    }

    const natureGrid = {
        increased: ["attack", "defense", "specialAttack", "specialDefense", "speed"],
        decreased: ["attack", "defense", "specialAttack", "specialDefense", "speed"]
    };

    const typeEffectivenessOptions = [
        { value: 0, label: "0x" },
        { value: 0.25, label: "¼x" },
        { value: 0.5, label: "½x" },
        { value: 1, label: "1x" },
        { value: 2, label: "2x" },
        { value: 4, label: "4x" }
    ];

    function adjustValue(currentValue, amount, min, max) {
        const newValue = currentValue + amount;
        return Math.min(Math.max(newValue, min), max);
    }

    function adjustLevel(amount) {
        level = adjustValue(level, amount, 1, MAX_LEVEL);
    }

    function adjustIV(amount) {
        iv = adjustValue(iv, amount, 0, MAX_IV);
    }

    function adjustEV(amount) {
        ev = adjustValue(ev, amount, 0, MAX_EV);
    }

    let selectedTiers = {
        S: false,
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
        F: false
    };

    function handleTierSelect(tier) {
        if (singleSelectMode) {
            selectedTiers = {
                S: false,
                A: false,
                B: false,
                C: false,
                D: false,
                E: false,
                F: false
            };
            selectedTiers[tier] = true;
        } else {
            selectedTiers[tier] = !selectedTiers[tier];
        }
    }

    $: filteredPokemon = allPokemon.filter(([name]) => {
        const tier = getPokemonTier(name);
        const matchesTier = !Object.values(selectedTiers).some(value => value) || selectedTiers[tier];
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTier && matchesSearch;
    });
</script>

<div class="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center py-4 px-2">
    <h1 class="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">Pokémon Calculator</h1>

    <div class="flex flex-col w-full max-w-xl gap-4 sm:gap-6 justify-center">
        <!-- Stat Calculator Section -->
        <div class="w-full space-y-4 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 class="text-lg sm:text-xl font-semibold text-yellow-500 mb-2 sm:mb-4">Stat Calculator</h2>
            
            <!-- Tier Selector -->
            <div class="space-y-2 mb-4">
                <div class="flex justify-between items-center mb-2">
                    <label class="text-sm font-medium text-blue-400">
                        Tiers (Click to filter)
                    </label>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-400">Single Select</span>
                        <button
                            class="px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500
                                   {singleSelectMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                            on:click={() => {
                                singleSelectMode = !singleSelectMode;
                                if (singleSelectMode) {
                                    // Find the first selected tier
                                    const selectedTierEntries = Object.entries(selectedTiers).filter(([_, isSelected]) => isSelected);
                                    const firstSelectedTier = selectedTierEntries[0]?.[0];
                                    
                                    // If there was a selected tier, keep only that one
                                    if (firstSelectedTier) {
                                        selectedTiers = {
                                            S: false,
                                            A: false,
                                            B: false,
                                            C: false,
                                            D: false,
                                            E: false,
                                            F: false,
                                            [firstSelectedTier]: true
                                        };
                                    }
                                }
                            }}
                        >
                            {singleSelectMode ? 'On' : 'Off'}
                        </button>
                    </div>
                </div>
                <div class="flex gap-2">
                    {#each Object.keys(selectedTiers) as tier}
                        <button
                            class="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500
                                   {selectedTiers[tier] ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                            on:click={() => handleTierSelect(tier)}
                        >
                            {tier}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Pokemon Grid -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-blue-400">Pokémon Selection</label>
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search Pokémon..."
                    class="w-full p-2 rounded bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-48 overflow-y-auto bg-gray-700 p-2 rounded">
                    {#each filteredPokemon as [name]}
                        <button 
                            class="p-2 text-sm text-center transition-colors rounded
                                {selectedPokemon?.name === name 
                                    ? 'bg-yellow-500 text-gray-900' 
                                    : 'bg-gray-800 hover:bg-gray-700'}"
                            on:click={() => {
                                const event = { target: { value: name } };
                                handlePokemonSelect(event);
                            }}
                        >
                            [{getPokemonTier(name)}] {name}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Nature Grid -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-blue-400">Nature</label>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr>
                                <th class="px-2 py-1"></th>
                                {#each natureGrid.decreased as stat}
                                    <th class="px-2 py-1 text-center">{getLabel(stat)} ↓</th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            {#each natureGrid.increased as increasedStat}
                                <tr>
                                    <th class="px-2 py-1 text-left">{getLabel(increasedStat)} ↑</th>
                                    {#each natureGrid.decreased as decreasedStat}
                                        <td class="p-2 text-center border border-gray-700">
                                            {#if increasedStat === decreasedStat}
                                                <button 
                                                    class="w-8 h-8 rounded-full transition-colors
                                                        {selectedNature === 'Hardy' 
                                                            ? 'bg-yellow-500' 
                                                            : 'bg-gray-700 hover:bg-gray-600'}"
                                                    on:click={() => selectedNature = 'Hardy'}
                                                >
                                                </button>
                                            {:else}
                                                <button 
                                                    class="w-full p-2 text-center transition-colors
                                                        {selectedNature === getNatureName(increasedStat, decreasedStat) 
                                                            ? 'bg-yellow-500 text-gray-900' 
                                                            : 'bg-gray-700 hover:bg-gray-600'}"
                                                    on:click={() => selectedNature = getNatureName(increasedStat, decreasedStat)}
                                                >
                                                    {getNatureName(increasedStat, decreasedStat)}
                                                </button>
                                            {/if}
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Level Input -->
            <div class="space-y-2">
                <label for="level" class="block text-sm font-medium text-red-400 text-center">Level: {level}</label>
                <div class="flex flex-wrap items-center gap-2">
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustLevel(-1)}
                    >-1</button>
                    
                    <input
                        type="range"
                        bind:value={level}
                        min="1"
                        max={MAX_LEVEL}
                        step="1"
                        class="flex-grow"
                    />
                    
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustLevel(1)}
                    >+1</button>
                </div>
            </div>

            <!-- IV Input -->
            <div class="space-y-2">
                <label for="iv" class="block text-sm font-medium text-red-400 text-center">IV: {iv}</label>
                <div class="flex flex-wrap items-center gap-2">
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustIV(-1)}
                    >-1</button>
                    
                    <input
                        type="range"
                        bind:value={iv}
                        min="0"
                        max={MAX_IV}
                        step="1"
                        class="flex-grow"
                    />
                    
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustIV(1)}
                    >+1</button>
                </div>
            </div>

            <!-- EV Input -->
            <div class="space-y-2">
                <label for="ev" class="block text-sm font-medium text-blue-400 text-center">EV: {ev}</label>
                <div class="flex flex-wrap items-center gap-2">
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustEV(-1)}
                    >-1</button>
                    
                    <input
                        type="range"
                        bind:value={ev}
                        min="0"
                        max={MAX_EV}
                        step="1"
                        class="flex-grow"
                    />
                    
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustEV(1)}
                    >+1</button>
                </div>
            </div>

            <!-- Compact Stats Display -->
            <div class="mt-2 p-3 bg-gray-700 rounded-lg text-sm">
                <div class="grid grid-cols-3 gap-2">
                    <div><span class="text-blue-400">HP:</span> {stats ? stats?.hp : ''}</div>
                    <div><span class="text-red-400">Atk:</span> {stats ? stats?.attack : ''}</div>
                    <div><span class="text-yellow-400">Def:</span> {stats ? stats?.defense : ''}</div>
                    <div><span class="text-purple-400">SpA:</span> {stats ? stats?.specialAttack : ''}</div>
                    <div><span class="text-green-400">SpD:</span> {stats ? stats?.specialDefense : ''}</div>
                    <div><span class="text-pink-400">Spe:</span> {stats ? stats?.speed : ''}</div>
                </div>
            </div>
        </div>

        <!-- Move Power Calculator Section -->
        <div class="w-full space-y-4 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 class="text-lg sm:text-xl font-semibold text-yellow-500 mb-2 sm:mb-4">Move Power Calculator</h2>

            <!-- Available Moves Section -->
            {#if selectedPokemon}
                <div>
                    <label class="block text-sm font-medium text-blue-400 mb-1">Available Moves</label>
                    <div class="flex flex-wrap gap-1">
                        {#each Object.entries(groupedMoves) as [type, moves]}
                            {#each moves as move}
                                <button
                                    class="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 focus:ring-1 focus:ring-yellow-500
                                           {selectedMove?.name === move.name ? 'ring-1 ring-yellow-500' : ''}"
                                    on:click={() => handleMoveSelect(move)}
                                    title="{type} - Power: {move.power}"
                                >
                                    {move.name} ({move.power})
                                </button>
                            {/each}
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Move Power with Range and Buttons -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-blue-400">
                    Base Power: {basePower}
                </label>
                <div class="flex flex-wrap items-center gap-2">
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustMovePower(-25)}
                    >25</button>
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustMovePower(-10)}
                    >10</button>
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustMovePower(-5)}
                    >5</button>
                    
                    <input
                        type="number"
                        bind:value={basePower}
                        min="0"
                        max={MAX_BASE_POWER}
                        step="5"
                        class="flex-grow text-black text-center"
                    />
                    
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustMovePower(5)}
                    >5</button>
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustMovePower(10)}
                    >10</button>
                    <button
                        class="w-10 px-1 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500 text-sm"
                        on:click={() => adjustMovePower(25)}
                    >25</button>
                </div>
            </div>

            <!-- Stat Modifier Toggle -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-blue-400">Stat Modifier</label>
                <button
                    class="px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500
                           {statModifier === 2 ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                    on:click={() => statModifier = statModifier === 1 ? 2 : 1}
                >
                    {statModifier}x
                </button>
            </div>

            <!-- Type Effectiveness Buttons -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-blue-400">Type Effectiveness</label>
                <div class="flex flex-wrap gap-1">
                    {#each typeEffectivenessOptions as option}
                        <button
                            class="flex-1 min-w-[60px] px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm
                                   {typeEffectiveness === option.value ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                            on:click={() => typeEffectiveness = option.value}
                        >
                            {option.label}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- STAB Toggle -->
            <div class="flex items-center space-x-3">
                <label class="block text-sm font-medium text-blue-400">STAB</label>
                <button
                    class="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500
                           {stab === 1.5 ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                    on:click={() => stab = stab === 1 ? 1.5 : 1}
                >
                    {stab === 1.5 ? 'Active' : 'Inactive'}
                </button>
            </div>
        </div>
    </div>
</div>
