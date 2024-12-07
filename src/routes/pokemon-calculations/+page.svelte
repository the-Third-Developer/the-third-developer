<script>
    import pokemonStats from './pokemonStats.json';
    import pokemonMoves from './pokemonMoves.json';
    
    let selectedPokemon = null;
    let selectedNature = getNatureName("attack", "defense");

    let ivs = {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 31,
        specialDefense: 31,
        speed: 31
    };

    let evs = {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    };

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

    let opposingDefense = 100; // Default value

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

    function calculateStats(pokemon, level, ivs, evs, nature, stages = {}) {
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
        ivs.hp = Math.min(Math.max(ivs.hp, 0), MAX_IV);
        evs.hp = Math.min(Math.max(evs.hp, 0), MAX_EV);

        const hp = Math.max(
            Math.floor(((2 * pokemon.hp + ivs.hp + Math.floor(evs.hp / 4)) * level) / 100) + level + 10,
            MIN_STAT
        );

        const calculateStat = (baseStat, statName) => {
            const base = Math.floor(((2 * baseStat + ivs[statName] + Math.floor(evs[statName] / 4)) * level) / 100) + 5;
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
        const pokemonData = allPokemon.find(([name]) => name === selectedPokemonName)?.[1];
        if (pokemonData) {
            selectedPokemon = {
                ...pokemonData,
                name: selectedPokemonName
            };
        }
    }

    function handlePokemonFocus(event) {
        event.target.value = '';
    }

    $: stats = selectedPokemon ? calculateStats(selectedPokemon, level, ivs, evs, pokemonStats.NATURES[selectedNature]) : null;

    $: movePower = selectedMove ? calculateDamage(selectedMove, stats, opposingDefense) : 0;

    function getMovesForPokemon(pokemonName) {
        return pokemonMoves[pokemonName] || [];
    }

    function getMoveDetails(moveName) {
        const moves = pokemonStats.S_TIER.Arceus.moves;
        for (const type in moves) {
            if (moves[type] && moves[type][moveName]) {
                return {
                    name: moveName,
                    type: type,
                    power: moves[type][moveName].power,
                    category: moves[type][moveName].category
                };
            }
        }
        return null;
    }

    function getGroupedMoves(pokemonName) {
        const moves = pokemonMoves[pokemonName] || [];
        const grouped = {};

        moves.forEach(moveName => {
            const moveDetails = getMoveDetails(moveName);
            if (moveDetails) {
                const type = moveDetails.type;
                if (!grouped[type]) {
                    grouped[type] = {};
                }
                grouped[type][moveName] = moveDetails;
            }
        });

        return grouped;
    }

    function handleMoveSelect(move) {
        if (!move) return;
        selectedMove = {
            name: move.name,
            power: move.power || 0,
            type: move.type || 'Normal',
            category: move.category || 'Physical'
        };
        calculateMovePower();
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
            hp: "HP",
            attack: "Atk",
            defense: "Def",
            specialAttack: "SpA",
            specialDefense: "SpD",
            speed: "Spe"
        };
        return labels[stat];
    }

    function getNatureName(increasedStat, decreasedStat) {
        // Return neutral natures based on stat
        if (increasedStat === decreasedStat) {
            switch(increasedStat) {
                case 'attack': return 'Hardy';
                case 'defense': return 'Docile';
                case 'specialAttack': return 'Bashful';
                case 'specialDefense': return 'Quirky';
                case 'speed': return 'Serious';
            }
        }

        // Nature name mapping
        const natureNames = {
            'attack_defense': { plus: 'Lonely', minus: 'Bold' },
            'attack_specialAttack': { plus: 'Naughty', minus: 'Modest' },
            'attack_specialDefense': { plus: 'Rash', minus: 'Calm' },
            'attack_speed': { plus: 'Hasty', minus: 'Relaxed' },
            'defense_specialAttack': { plus: 'Mild', minus: 'Adamant' },
            'defense_specialDefense': { plus: 'Gentle', minus: 'Impish' },
            'defense_speed': { plus: 'Lax', minus: 'Timid' },
            'specialAttack_specialDefense': { plus: 'Quiet', minus: 'Sassy' },
            'specialAttack_speed': { plus: 'Naive', minus: 'Brave' },
            'specialDefense_speed': { plus: 'Jolly', minus: 'Careful' }
        };

        const key = [increasedStat, decreasedStat].sort().join('_');
        if (natureNames[key]) {
            return increasedStat < decreasedStat ? natureNames[key].minus : natureNames[key].plus;
        }

        return 'Hardy'; // Fallback, should never happen
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

    function adjustStatValue(stat, type, amount) {
        const maxValue = type === 'iv' ? MAX_IV : MAX_EV;
        const values = type === 'iv' ? ivs : evs;
        values[stat] = Math.min(Math.max(values[stat] + amount, 0), maxValue);
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

    $: filteredPokemon = allPokemon.filter(([name, data]) => {
        const tier = getPokemonTier(name);
        const matchesTier = !Object.values(selectedTiers).some(value => value) || selectedTiers[tier];
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTier && matchesSearch;
    });

    // Update this function to calculate the actual damage
    function calculateDamage(move, attackerStats, opposingDefense) {
        if (!move || !attackerStats) return 0;

        // Skip calculation for status moves
        if (move.category === 'Status') return 0;
        
        // Determine if move is physical or special
        const isPhysical = move.category === 'Physical';
        
        // Use the appropriate attack stat
        const attackStat = isPhysical ? attackerStats.attack : attackerStats.specialAttack;
        
        // Full damage formula with opposing defense
        const baseDamage = Math.floor(
            Math.floor(
                Math.floor((2 * level / 5 + 2) * move.power * attackStat) 
                / Math.max(1, opposingDefense)
            ) / 50
        ) + 2;

        // Apply STAB and type effectiveness
        return Math.floor(baseDamage * stab * typeEffectiveness);
    }

    $: {
        if (selectedPokemon) {
            console.log('Selected Pokemon:', selectedPokemon.name);
            console.log('Pokemon Moves:', pokemonMoves[selectedPokemon.name]);
            console.log('Move Details Example:', getMoveDetails(pokemonMoves[selectedPokemon.name]?.[0]));
            console.log('Available Moves:', availableMoves);
        }
    }

    // Add this helper function
    function getMovesByType(pokemonName) {
        if (!pokemonName || !pokemonMoves[pokemonName]) return {};
        
        const movesList = pokemonMoves[pokemonName];
        const groupedMoves = {};
        
        movesList.forEach(moveName => {
            const moveDetails = getMoveDetails(moveName);
            if (moveDetails) {
                if (!groupedMoves[moveDetails.type]) {
                    groupedMoves[moveDetails.type] = [];
                }
                groupedMoves[moveDetails.type].push({
                    name: moveName,
                    ...moveDetails
                });
            }
        });
        
        return groupedMoves;
    }

    // Simplified available moves function
    function getAvailableMoves(pokemonName) {
        const moves = pokemonMoves[pokemonName] || [];
        const grouped = {};

        moves.forEach(moveName => {
            const details = getMoveDetails(moveName);
            if (details) {
                if (!grouped[details.type]) {
                    grouped[details.type] = [];
                }
                grouped[details.type].push({
                    name: moveName,
                    power: details.power || 0,
                    type: details.type,
                    category: details.category || 'Status'
                });
            } else {
                // For debugging
                console.warn(`Move details not found for: ${moveName}`);
            }
        });

        // Sort moves by power within each type
        for (const type in grouped) {
            grouped[type].sort((a, b) => (b.power || 0) - (a.power || 0));
        }

        return grouped;
    }

    // Reactive statement
    $: availableMoves = selectedPokemon ? getAvailableMoves(selectedPokemon.name) : {};

    function getTypeColor(type) {
        const typeColors = {
            'Normal': 'text-gray-300',
            'Fire': 'text-red-400',
            'Water': 'text-blue-400',
            'Electric': 'text-yellow-400',
            'Grass': 'text-green-400',
            'Ice': 'text-cyan-300',
            'Fighting': 'text-red-600',
            'Poison': 'text-purple-400',
            'Ground': 'text-yellow-600',
            'Flying': 'text-indigo-300',
            'Psychic': 'text-pink-400',
            'Bug': 'text-lime-400',
            'Rock': 'text-yellow-700',
            'Ghost': 'text-purple-600',
            'Dragon': 'text-indigo-500',
            'Dark': 'text-gray-500',
            'Steel': 'text-gray-400',
            'Fairy': 'text-pink-300',
            'Status': 'text-gray-400'
        };
        return typeColors[type] || 'text-gray-300';
    }

    function getPokemonTypeColors(types) {
        const typeBackgrounds = {
            'Normal': 'from-gray-400 to-gray-300',
            'Fire': 'from-red-500 to-orange-400',
            'Water': 'from-blue-500 to-blue-400',
            'Electric': 'from-yellow-400 to-yellow-300',
            'Grass': 'from-green-500 to-green-400',
            'Ice': 'from-cyan-400 to-cyan-300',
            'Fighting': 'from-red-700 to-red-600',
            'Poison': 'from-purple-500 to-purple-400',
            'Ground': 'from-yellow-700 to-yellow-600',
            'Flying': 'from-indigo-400 to-indigo-300',
            'Psychic': 'from-pink-500 to-pink-400',
            'Bug': 'from-lime-500 to-lime-400',
            'Rock': 'from-yellow-800 to-yellow-700',
            'Ghost': 'from-purple-700 to-purple-600',
            'Dragon': 'from-indigo-600 to-indigo-500',
            'Dark': 'from-gray-700 to-gray-600',
            'Steel': 'from-gray-500 to-gray-400',
            'Fairy': 'from-pink-400 to-pink-300'
        };

        if (types.length === 1) {
            return `bg-gradient-to-r ${typeBackgrounds[types[0]]}`;
        } else {
            return `bg-gradient-to-r ${typeBackgrounds[types[0]]} via-gray-600 ${typeBackgrounds[types[1]].replace('from-', 'to-')}`;
        }
    }

</script>

<div class="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center py-4 px-2">
    <h1 class="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">Pokémon Calculator</h1>

    <div class="w-full max-w-7xl">
        <!-- Pokemon Selection Section - Always at top on mobile -->
        <div class="mb-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold text-yellow-500 mb-4">Pokémon Selection</h2>
            
            <!-- Tier Selector -->
            <div class="space-y-2 mb-4">
                <div class="flex justify-between items-center mb-2">
                    <label class="text-sm font-medium text-blue-400">Tiers</label>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-400">Single Select</span>
                        <button
                            class="px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500
                                   {singleSelectMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                            on:click={() => {
                                singleSelectMode = !singleSelectMode;
                                if (singleSelectMode) {
                                    const selectedTierEntries = Object.entries(selectedTiers).filter(([_, isSelected]) => isSelected);
                                    const firstSelectedTier = selectedTierEntries[0]?.[0];
                                    if (firstSelectedTier) {
                                        selectedTiers = {
                                            S: false, A: false, B: false, C: false,
                                            D: false, E: false, F: false,
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
                <div class="flex gap-2 overflow-x-auto pb-2">
                    {#each Object.keys(selectedTiers) as tier}
                        <button
                            class="flex-none px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500
                                   {selectedTiers[tier] ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                            on:click={() => handleTierSelect(tier)}
                        >
                            {tier}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Pokemon Search and List -->
            <div class="space-y-2">
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search Pokémon..."
                    class="w-full p-2 rounded bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 max-h-48 overflow-y-auto bg-gray-700 p-2 rounded">
                    {#each filteredPokemon as [name, data]}
                        <button 
                            class="p-2 text-sm text-center transition-colors rounded whitespace-nowrap overflow-hidden text-ellipsis
                                transition-all duration-300 hover:scale-105 relative
                                {selectedPokemon?.name === name 
                                    ? 'ring-2 ring-yellow-500 ring-opacity-100 scale-105' 
                                    : 'hover:ring-2 hover:ring-gray-400'}
                                {getPokemonTypeColors(data.types)}"
                            on:click={() => {
                                selectedPokemon = {
                                    ...data,
                                    name: name
                                };
                            }}
                        >
                            <span class="font-medium relative z-10">[{getPokemonTier(name)}] {name}</span>
                            <div class="absolute inset-0 bg-black opacity-40"></div>
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Main Grid with Sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-6">
            <!-- Sidebar -->
            <div class="space-y-4 bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 class="text-lg font-semibold text-yellow-500 mb-4">Stat Controls</h2>
                
                <!-- Level Control -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-red-400 text-center">Level: {level}</label>
                    <input
                        type="range"
                        bind:value={level}
                        min="1"
                        max={MAX_LEVEL}
                        class="w-full"
                    />
                </div>

                <!-- IV/EV Controls -->
                <div class="space-y-4">
                    <div class="space-y-2">
                        <h3 class="text-sm font-medium text-center text-red-400">Individual Values (IVs)</h3>
                        <div class="grid grid-cols-2 gap-2">
                            {#each Object.entries(ivs) as [stat, value]}
                                <div class="bg-gray-700 p-2 rounded">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="text-sm font-medium">{getLabel(stat)}</span>
                                        <input 
                                            type="number"
                                            bind:value={ivs[stat]}
                                            min="0"
                                            max={MAX_IV}
                                            class="w-14 px-1 py-0.5 text-sm bg-gray-600 rounded text-right"
                                            on:change={() => {
                                                ivs[stat] = Math.min(Math.max(ivs[stat], 0), MAX_IV);
                                                ivs = {...ivs}; // Trigger reactivity
                                            }}
                                        />
                                    </div>
                                    <div class="flex gap-1">
                                        <button
                                            class="flex-1 px-2 py-1 text-xs bg-red-900 hover:bg-red-800 rounded text-white transition-colors"
                                            on:click={() => {
                                                ivs[stat] = Math.max(0, ivs[stat] - 1);
                                                ivs = {...ivs}; // Trigger reactivity
                                            }}
                                        >-</button>
                                        <button
                                            class="flex-1 px-2 py-1 text-xs bg-blue-900 hover:bg-blue-800 rounded text-white transition-colors"
                                            on:click={() => {
                                                ivs[stat] = Math.min(MAX_IV, ivs[stat] + 1);
                                                ivs = {...ivs}; // Trigger reactivity
                                            }}
                                        >+</button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h3 class="text-sm font-medium text-center text-blue-400">Effort Values (EVs)</h3>
                        <div class="grid grid-cols-2 gap-2">
                            {#each Object.entries(evs) as [stat, value]}
                                <div class="bg-gray-700 p-2 rounded">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="text-sm font-medium">{getLabel(stat)}</span>
                                        <input 
                                            type="number"
                                            bind:value={evs[stat]}
                                            min="0"
                                            max={MAX_EV}
                                            step="4"
                                            class="w-14 px-1 py-0.5 text-sm bg-gray-600 rounded text-right"
                                            on:change={() => {
                                                evs[stat] = Math.min(Math.max(evs[stat], 0), MAX_EV);
                                                // Round to nearest 4
                                                evs[stat] = Math.round(evs[stat] / 4) * 4;
                                                evs = {...evs}; // Trigger reactivity
                                            }}
                                        />
                                    </div>
                                    <div class="flex gap-1">
                                        <button
                                            class="flex-1 px-2 py-1 text-xs bg-red-900 hover:bg-red-800 rounded text-white transition-colors"
                                            on:click={() => {
                                                evs[stat] = Math.max(0, evs[stat] - 4);
                                                evs = {...evs}; // Trigger reactivity
                                            }}
                                        >-</button>
                                        <button
                                            class="flex-1 px-2 py-1 text-xs bg-blue-900 hover:bg-blue-800 rounded text-white transition-colors"
                                            on:click={() => {
                                                evs[stat] = Math.min(MAX_EV, evs[stat] + 4);
                                                evs = {...evs}; // Trigger reactivity
                                            }}
                                        >+</button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="space-y-4">
                <!-- Nature Grid -->
                <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold text-yellow-500 mb-4">Nature Selection</h2>
                    <div class="w-full overflow-x-auto">
                        <div class="min-w-[600px]"> <!-- Minimum width to prevent squishing -->
                            <table class="w-full text-xs">
                                <thead>
                                    <tr>
                                        <th class="w-[80px]"></th>
                                        {#each natureGrid.decreased as stat}
                                            <th class="text-center whitespace-nowrap px-1">
                                                <span class="inline-flex items-center justify-center w-full gap-2">
                                                    {#if stat === 'attack'}
                                                        <span class="text-red-400">Attack</span>
                                                    {:else if stat === 'defense'}
                                                        <span class="text-yellow-400">Defense</span>
                                                    {:else if stat === 'specialAttack'}
                                                        <span class="text-purple-400">Sp. Attack</span>
                                                    {:else if stat === 'specialDefense'}
                                                        <span class="text-green-400">Sp. Defense</span>
                                                    {:else}
                                                        <span class="text-pink-400">Speed</span>
                                                    {/if}
                                                    <span class="text-red-400">↓</span>
                                                </span>
                                            </th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each natureGrid.increased as increasedStat, rowIndex}
                                        <tr>
                                            <th class="text-left whitespace-nowrap px-1">
                                                <span class="inline-flex items-center justify-between w-full gap-2">
                                                    {#if increasedStat === 'attack'}
                                                        <span class="text-red-400">Attack</span>
                                                    {:else if increasedStat === 'defense'}
                                                        <span class="text-yellow-400">Defense</span>
                                                    {:else if increasedStat === 'specialAttack'}
                                                        <span class="text-purple-400">Sp. Attack</span>
                                                    {:else if increasedStat === 'specialDefense'}
                                                        <span class="text-green-400">Sp. Defense</span>
                                                    {:else}
                                                        <span class="text-pink-400">Speed</span>
                                                    {/if}
                                                    <span class="text-green-400">↑</span>
                                                </span>
                                            </th>
                                            {#each natureGrid.decreased as decreasedStat, colIndex}
                                                {@const colors = {
                                                    'attack': 'bg-red-200',
                                                    'defense': 'bg-yellow-200',
                                                    'specialAttack': 'bg-blue-200',
                                                    'specialDefense': 'bg-green-200',
                                                    'speed': 'bg-pink-200'
                                                }}
                                                {@const blendedColors = {
                                                    'attack_defense': 'bg-orange-200',
                                                    'attack_specialAttack': 'bg-purple-200',
                                                    'attack_specialDefense': 'bg-rose-200',
                                                    'attack_speed': 'bg-red-100',
                                                    'defense_specialAttack': 'bg-emerald-200',
                                                    'defense_specialDefense': 'bg-lime-200',
                                                    'defense_speed': 'bg-amber-200',
                                                    'specialAttack_specialDefense': 'bg-teal-200',
                                                    'specialAttack_speed': 'bg-sky-200',
                                                    'specialDefense_speed': 'bg-cyan-200'
                                                }}
                                                {@const colorKey = [increasedStat, decreasedStat].sort().join('_')}
                                                <td class="p-0.5 text-center border border-gray-700">
                                                    <button 
                                                        class="w-full p-1 text-center text-xs transition-colors rounded
                                                            {selectedNature === getNatureName(increasedStat, decreasedStat)
                                                                ? `${increasedStat === decreasedStat 
                                                                    ? 'bg-gray-600 text-gray-200' 
                                                                    : `${blendedColors[colorKey] || colors[increasedStat]} text-gray-900`}`
                                                                : increasedStat === decreasedStat
                                                                    ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                                                    : `${blendedColors[colorKey] || colors[increasedStat]} text-gray-900 opacity-25 hover:opacity-40`}"
                                                        on:click={() => selectedNature = getNatureName(increasedStat, decreasedStat)}
                                                    >
                                                        {getNatureName(increasedStat, decreasedStat)}
                                                    </button>
                                                </td>
                                            {/each}
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Stats and Move Calculator Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Stats Display -->
                    <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h2 class="text-lg font-semibold text-yellow-500 mb-4">Calculated Stats</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-800 p-3 rounded-lg">
                                <span class="text-blue-400 font-medium">HP</span>
                                <div class="text-2xl font-bold">{stats ? stats.hp : '-'}</div>
                            </div>
                            <div class="bg-gray-800 p-3 rounded-lg">
                                <span class="text-red-400 font-medium">Attack</span>
                                <div class="text-2xl font-bold">{stats ? stats.attack : '-'}</div>
                            </div>
                            <div class="bg-gray-800 p-3 rounded-lg">
                                <span class="text-yellow-400 font-medium">Defense</span>
                                <div class="text-2xl font-bold">{stats ? stats.defense : '-'}</div>
                            </div>
                            <div class="bg-gray-800 p-3 rounded-lg">
                                <span class="text-purple-400 font-medium">Sp. Attack</span>
                                <div class="text-2xl font-bold">{stats ? stats.specialAttack : '-'}</div>
                            </div>
                            <div class="bg-gray-800 p-3 rounded-lg">
                                <span class="text-green-400 font-medium">Sp. Defense</span>
                                <div class="text-2xl font-bold">{stats ? stats.specialDefense : '-'}</div>
                            </div>
                            <div class="bg-gray-800 p-3 rounded-lg">
                                <span class="text-pink-400 font-medium">Speed</span>
                                <div class="text-2xl font-bold">{stats ? stats.speed : '-'}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Move Calculator -->
                    <div class="space-y-4 bg-gray-800 p-4 rounded-lg shadow-md">
                        <h2 class="text-lg font-semibold text-yellow-500 mb-2">Move Calculator</h2>
                        
                        <!-- Available Moves -->
                        {#if selectedPokemon}
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-blue-400">Available Moves</label>
                                <div class="max-h-48 overflow-y-auto bg-gray-700 p-2 rounded">
                                    {#if Object.keys(availableMoves).length > 0}
                                        {#each Object.entries(availableMoves) as [type, moves]}
                                            <div class="mb-2">
                                                <h3 class="text-sm font-medium mb-1 {getTypeColor(type)}">{type} Moves</h3>
                                                <div class="flex flex-wrap gap-1">
                                                    {#each moves as move}
                                                        <button 
                                                            class="p-2 text-sm text-center transition-colors rounded flex flex-col items-center
                                                                {selectedMove?.name === move.name 
                                                                    ? 'bg-yellow-500 text-gray-900' 
                                                                    : 'bg-gray-800 hover:bg-gray-700'}"
                                                            on:click={() => handleMoveSelect(move)}
                                                        >
                                                            <span>{move.name}</span>
                                                            {#if move.power}
                                                                <span class="text-xs opacity-75">Power: {move.power}</span>
                                                            {:else}
                                                                <span class="text-xs opacity-75">Status</span>
                                                            {/if}
                                                        </button>
                                                    {/each}
                                                </div>
                                            </div>
                                        {/each}
                                    {:else}
                                        <div class="text-gray-400 text-sm">No moves available</div>
                                    {/if}
                                </div>
                            </div>
                        {/if}

                        <!-- Type Effectiveness and STAB Controls -->
                        <div class="grid md:grid-cols-2 gap-4">
                            <!-- Type Effectiveness Circle -->
                            <div class="space-y-2 flex flex-col items-center">
                                <label class="block text-sm font-medium text-blue-400">Type Effectiveness</label>
                                <div class="relative w-48 h-48">
                                    {#each typeEffectivenessOptions as option, i}
                                        {@const angle = (i * 360) / typeEffectivenessOptions.length}
                                        {@const radius = 60}
                                        {@const x = Math.cos((angle - 90) * Math.PI / 180) * radius + 96}
                                        {@const y = Math.sin((angle - 90) * Math.PI / 180) * radius + 96}
                                        
                                        <button
                                            class="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                                                   focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all
                                                   {typeEffectiveness === option.value 
                                                       ? 'bg-yellow-500 text-gray-900 scale-110' 
                                                       : 'bg-gray-700 hover:bg-gray-600 scale-100'}"
                                            style="left: {x}px; top: {y}px;"
                                            on:click={() => typeEffectiveness = option.value}
                                        >
                                            {option.label}
                                        </button>
                                    {/each}
                                    
                                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                                w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center
                                                text-xl font-bold text-yellow-500">
                                        {typeEffectiveness}x
                                    </div>
                                </div>
                            </div>

                            <!-- STAB and Defense Controls -->
                            <div class="flex flex-col items-center justify-center gap-4">
                                <!-- STAB Toggle -->
                                <div class="w-full">
                                    <label class="text-sm font-medium text-blue-400 mb-2 block text-center">STAB</label>
                                    <button
                                        class="w-full px-6 py-3 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500
                                               {stab === 1.5 ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}"
                                        on:click={() => stab = stab === 1 ? 1.5 : 1}
                                    >
                                        {stab === 1.5 ? '1.5×' : '1.0×'}
                                    </button>
                                </div>

                                <!-- Opposing Defense Control -->
                                <div class="w-full">
                                    <label class="text-sm font-medium text-blue-400 mb-2 block text-center">
                                        Opposing {selectedMove?.category === 'Physical' ? 'Defense' : 'Sp. Defense'}
                                    </label>
                                    <div class="flex items-center justify-center gap-2">
                                        <button
                                            class="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500"
                                            on:click={() => opposingDefense = Math.max(1, opposingDefense - 5)}
                                        >-</button>
                                        <input
                                            type="number"
                                            bind:value={opposingDefense}
                                            min="1"
                                            class="w-20 px-2 py-1 text-lg text-center bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            on:change={() => {
                                                opposingDefense = Math.max(1, opposingDefense);
                                                opposingDefense = opposingDefense; // Trigger reactivity
                                            }}
                                        />
                                        <button
                                            class="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500"
                                            on:click={() => opposingDefense = opposingDefense + 5}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Final Move Power Display -->
                        {#if selectedMove}
                            <div class="mt-4 p-4 bg-gray-700 rounded-lg text-center">
                                <div class="text-lg font-bold text-yellow-500">Final Move Power</div>
                                <div class="text-2xl">{movePower}</div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
