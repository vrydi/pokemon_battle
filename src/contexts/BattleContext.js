import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {usePokemonTeamContext} from "./PokemonTeamContext";
import {useEnemyPokemonTeamContext} from "./EnemyPokemonTeam";
import {isNotEmpty} from "../components/Battle";
import {fetchDataTypeEffectiveness} from "../services/fetchTypes";

const BattleContext = createContext()

export function BattleProvider(props) {
    const {pokemonTeam, updateTeam, activePokemon} = usePokemonTeamContext()
    const {enemyPokemonTeam, updateEnemyTeam, activeEnemyPokemon, setActiveEnemyPokemon} = useEnemyPokemonTeamContext()

    const [fighting, setFighting] = useState(false)
    const [pokeMenu, setPokeMenu] = useState('start')
    const [message, setMessage] = useState(`What will ${activePokemon.name} do?`)


    const firstAttack = useCallback((friendMove, enemyMove) => {
        console.log(enemyMove)
        if (friendMove.name === 'bullet-punch' || friendMove.name === 'ice-shard') return 'friend'
        if (enemyMove.name === 'bullet-punch' || enemyMove.name === 'ice-shard') return 'enemy'
        return activePokemon.stats.speed.base_stat > activeEnemyPokemon.stats.speed.base_stat ? 'friend' :
            activePokemon.stats.speed.base_stat < activeEnemyPokemon.stats.speed.base_stat ? 'enemy' :
                Math.random() >= 0.5 ? 'friend' : 'enemy'
    }, [activeEnemyPokemon, activePokemon])

    const attackDamage = useCallback(async (move, executor, target) => {
        const typeEffectivenessChart = await fetchDataTypeEffectiveness()
        const typeEffectivenessPercentArray = executor.types.map(executorType=>{
            return target.types.map(targetType=>{
                return typeEffectivenessChart[capitalize(executorType.type.name)][capitalize(targetType.type.name)]
            })
        }).flat()
        const typeDamage =  typeEffectivenessPercentArray.reduce((a, b) => (a + b)) / typeEffectivenessPercentArray.length
        const attackPower = move['damage class'].name === 'physical' ? executor.stats.attack.base_stat : executor.stats['special attack'].base_stat
        const defensePower = move['damage class'].name === 'physical' ? target.stats.defense.base_stat : target.stats['special defense'].base_stat
        const randomDamage = (85 + Math.round((Math.random() * ((100 - 85) + 1)))) / 100
        return Math.floor((((25 * (move.power !== null ? move.power : 30) * (attackPower / defensePower)) / 50) + 2) * randomDamage * typeDamage)
    }, [])

    const moveExecution = useCallback(async (executor, target, move) => {
        move.currentPP--
        if (executor.stats.statusEffect.includes('asleep')) {
            setMessage(`${executor.name} is asleep`)
            if (Math.random() * 100 <= 55) {
                executor.stats.statusEffect.forEach(status=>executor.stats.statusEffect = executor.stats.statusEffect.filter(effect=>status!==effect))
                setMessage(`${executor.name} woke up`)
            }
            return null
        }
        if (executor.stats.statusEffect.includes('paralysed')) {
            if (Math.random() * 100 <= 25) {
                setMessage(`${executor.name} is paralysed`)
                return null
            }
        }
        if (move.accuracy !== null && Math.random() * 100 > move.accuracy) setMessage(`${executor.name} used ${move.name} and missed`)
        if (move['damage class'].name === 'status') {
            // eslint-disable-next-line default-case
            switch (move.name) {
                case 'tail-whip':
                    target.stats.defense.base_stat -= 10
                    setMessage(`${executor.name} used ${move.name} and lowered ${target.name}s defense`)
                    break
                case 'roost':
                    executor.stats.currentHealth.base_stat + (executor.stats.health.base_stat / 2) > executor.stats.currentHealth.base_stat ? executor.stats.currentHealth.base_stat = executor.stats.health.base_stat : executor.stats.currentHealth.base_stat += Math.floor(executor.stats.health.base_stat / 2)
                    setMessage(`${executor.name} used ${move.name} and restored som health`)
                    break
                case 'poison-powder':
                    if (target.types.includes('steel') || target.types.includes('poison')) {
                        setMessage(`${executor.name} used ${move.name} but it was not effective`)
                    }
                    if (target.stats.statusEffect.includes('poisoned')) setMessage(`${executor.name} used ${move.name} but ${target.name} was already poisoned`)
                    target.stats.statusEffect.push('poisoned')
                    setMessage(`${executor.name} used ${move.name} and poisoned ${target.name}`)
                    break
                case 'confuse-ray':
                    if (target.stats.statusEffect.includes('confused')) setMessage(`${executor.name} used ${move.name} but ${target.name} was already confused`)
                    target.stats.statusEffect.push('confused')
                    setMessage(`${executor.name} used ${move.name} and confused ${target.name}`)
                    break
                case 'sing':
                    if (target.stats.statusEffect.includes('asleep')) setMessage(`${executor.name} used ${move.name} but ${target.name} was already asleep`)
                    target.stats.statusEffect.push('asleep')
                    setMessage(`${executor.name} used ${move.name} and put ${target.name} asleep`)
                    break
            }
        } else if (move['damage class'].name === 'physical') {
            const damage = await attackDamage(move, executor, target)
            console.log('executor :', executor)
            console.log('target :', target)
            console.log('damage :', damage)
            // eslint-disable-next-line default-case
            switch (move.name) {
                case 'scratch':
                case 'cut':
                case 'bullet-punch':
                case 'ice-shard':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} and hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                    }
                    break
                case 'head-smash':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but got hurt in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        executor.stats.currentHealth.base_stat -= damage / 2
                        setMessage(`${executor.name} used ${move.name} but got hurt by the recoil`)
                    }
                    break
                case 'twineedle':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        target.stats.currentHealth.base_stat -= await attackDamage(move, executor, target)
                        setMessage(`${executor.name} used ${move.name}`)
                        if (Math.random() * 100 > move.effect['effect chance']) {
                            if (!target.stats.statusEffect.includes('poisoned')) {
                                target.stats.statusEffect.push('poisoned')
                                setMessage(`${executor.name} used ${move.name} and poisoned ${target.name}`)
                            }
                        }
                    }
                    break
                case 'spark':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                        if (Math.random() * 100 > move.effect['effect chance']) {
                            if (!target.stats.statusEffect.includes('paralysed')) {
                                target.stats.statusEffect.push('paralysed')
                                setMessage(`${executor.name} used ${move.name} and paralysed ${target.name}`)
                            }
                        }
                    }
                    break
                case 'bite':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                    }
                    break
            }
        } else {
            const damage = await attackDamage(move, executor, target)
            // eslint-disable-next-line default-case
            switch (move.name) {
                case 'focus-blast':
                case 'moonblast':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                        if (Math.random() * 100 > move.effect['effect chance']) {
                            target.stats['special defense'] -= 10
                            setMessage(`${executor.name} used ${move.name} and lowered ${target.name}s special defense`)
                        }
                    }
                    break
                case 'mud-shot':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        target.stats.speed.base_stat -= 10
                        setMessage(`${executor.name} used ${move.name} and lowered ${target.name}s speed`)
                    }
                    break
                case 'ember':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                        if (Math.random() * 100 > move.effect['effect chance']) {
                            if (!target.stats.statusEffect.includes('burned')) {
                                target.stats.statusEffect.push('burned')
                                setMessage(`${executor.name} used ${move.name} and set ${target.name} aflame`)
                            }
                        }
                    }
                    break
                case 'water-pulse':
                case 'confusion':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                        if (Math.random() * 100 > move.effect['effect chance']) {
                            if (!target.stats.statusEffect.includes('confused')) {
                                target.stats.statusEffect.push('confused')
                                setMessage(`${executor.name} used ${move.name} and confused ${target.name}`)
                            }
                        }
                    }
                    break
                case 'absorb':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        executor.stats.currentHealth.base_stat + (damage / 2) > executor.stats.health.base_stat ? executor.stats.currentHealth.base_stat = executor.stats.health.base_stat : executor.stats.currentHealth.base_stat += damage / 2
                        setMessage(`${executor.name} used ${move.name} and healed itself`)
                    }
                    break
                case 'dragon-breath':
                    if (executor.stats.statusEffect.includes('confused')) {
                        if (Math.random() * 100 <= 50) {
                            executor.stats.currentHealth.base_stat -= damage / 2
                            setMessage(`${executor.name} used ${move.name} but hurt itself in confusion`)
                        }
                    } else {
                        target.stats.currentHealth.base_stat -= damage
                        setMessage(`${executor.name} used ${move.name}`)
                        if (Math.random() * 100 > move.effect['effect chance']) {
                            if (!target.stats.statusEffect.includes('paralysed')) {
                                target.stats.statusEffect.push('paralysed')
                                setMessage(`${executor.name} used ${move.name} and paralysed ${target.name}`)
                            }
                        }
                    }
                    break
            }
        }
        if (executor.stats.currentHealth.base_stat <= 0) executor.stats.currentHealth.base_stat = 0
        if (target.stats.currentHealth.base_stat <= 0) target.stats.currentHealth.base_stat = 0
    }, [attackDamage])

    const checkFainted = (pokemon) => {
        if (pokemon.stats.currentHealth.base_stat <= 0) {
            pokemon.stats.currentHealth.base_stat = 0
            if (!pokemon.stats.statusEffect.includes('fainted')){
                pokemon.stats.statusEffect.push('fainted')
            }
            setMessage(`${pokemon.name} fainted`)
        }
    }

    const checkStatusEffect = useCallback((pokemon) => {
        if (isNotEmpty(pokemon.stats.statusEffect)){
            pokemon.stats.statusEffect.forEach(status=>{
                if (status === 'burned' || status === 'poisoned') {
                    pokemon.stats.currentHealth.base_stat -= Math.floor(pokemon.stats.health.base_stat / 16)
                    setMessage(`${pokemon.name} is ${status}`)
                    if (Math.random() * 100 <= 25) {
                        pokemon.stats.statusEffect = pokemon.stats.statusEffect.filter(effect=>status!==effect)
                    }
                    checkFainted(pokemon)
                }
            })
        }
    },[])

    const endBattle = useCallback((friendPokemon, enemyPokemon) => {
        const indexFriend = pokemonTeam.findIndex(pokemon=>{
            console.log('pokemon in end :', pokemon, friendPokemon)
            return pokemon.id===friendPokemon.id})
        const tempFriendTeam = pokemonTeam
        tempFriendTeam[indexFriend] = friendPokemon
        updateTeam(tempFriendTeam)

        const tempEnemyTeam = enemyPokemonTeam
        const indexEnemy = tempEnemyTeam.findIndex(pokemon=>pokemon.id===enemyPokemon.id)
        tempEnemyTeam[indexEnemy] = enemyPokemon
        updateEnemyTeam(tempEnemyTeam)
        setMessage(`What will ${friendPokemon.name} do?`)

        setFighting(false)
        console.log('enemy pokemon at the end of battle:', enemyPokemon)
        if (enemyPokemon.stats.statusEffect.includes('fainted')){
            console.log('fainted stuff')
            const notFainted = tempEnemyTeam.filter(pokemon=>!pokemon.stats.statusEffect.includes('fainted'))
            if (notFainted.length > 0) {
                console.log('switching enemy', notFainted)
                const newEnemy = notFainted[Math.round(Math.random() * (notFainted.length-1))]
                console.log('new enemy', newEnemy)
                setActiveEnemyPokemon(newEnemy)
            } else {
                setMessage('enemy team has been defeated')
                setFighting(true)
            }
        }
    }, [enemyPokemonTeam, pokemonTeam, setActiveEnemyPokemon, updateEnemyTeam, updateTeam])

    const battle = useCallback( (friendMove) => {
        setMessage('calculating results')
        setFighting(true)
        const enemyMove = activeEnemyPokemon.moves[Math.round(Math.random()*3)]
        const friendPokemon = activePokemon
        const enemyPokemon = activeEnemyPokemon
        console.log('friend move :', friendMove)
        console.log('enemy move :', enemyMove)
        if (!isNotEmpty(friendMove)) return null
        const firsAttack = firstAttack(friendMove, enemyMove)
        console.log('firstAttack :', firsAttack)

        if (firsAttack === 'friend') {
            moveExecution(friendPokemon, enemyPokemon, friendMove)
                .then(()=>{
                    setTimeout(function () {
                        checkFainted(friendPokemon)
                        checkFainted(enemyPokemon)
                        moveExecution(enemyPokemon, friendPokemon, enemyMove)
                            .then(()=>{
                                checkStatusEffect(friendPokemon)
                                checkStatusEffect(enemyPokemon)
                                setTimeout(function () {endBattle(friendPokemon, enemyPokemon)}, 500)
                            })
                    }, 1000)
                })
        } else {
            moveExecution(enemyPokemon, friendPokemon, enemyMove)
                .then(()=>{
                    checkFainted(friendPokemon)
                    checkFainted(enemyPokemon)
                    setTimeout(function () {
                        moveExecution(friendPokemon, enemyPokemon, friendMove)
                            .then(()=>{
                                checkStatusEffect(friendPokemon)
                                checkStatusEffect(enemyPokemon)
                                setTimeout(function () {endBattle(friendPokemon, enemyPokemon)}, 500)
                            })
                    }, 1000)
                })
        }
    }, [activeEnemyPokemon, activePokemon, checkStatusEffect, endBattle, firstAttack, moveExecution])

    function capitalize(word) {
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }



    const api = useMemo(()=>({
        battle,
        pokeMenu,
        setPokeMenu,
        message,
        setMessage,
        fighting
    }), [battle, fighting, message, pokeMenu])

    return <BattleContext.Provider value={api}>
        {props.children}
    </BattleContext.Provider>
}

export const useBattleContext = () => useContext(BattleContext)