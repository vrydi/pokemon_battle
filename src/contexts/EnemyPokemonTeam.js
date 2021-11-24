import {createContext, useCallback, useContext, useMemo, useState} from "react";

const EnemyPokemonTeamContext = createContext()

export function EnemyPokemonTeamProvider (props) {
    const [enemyPokemonTeam, setEnemyPokemonTeam] = useState(JSON.parse(localStorage.getItem('enemyPokemonTeam')) || [])
    const generateTeam = useCallback(async ()=>{
        const team = await generateTeam()
        console.log(team)
        localStorage.setItem('enemyPokemonTeam', JSON.stringify(team))
        setEnemyPokemonTeam(team)
    }, [setEnemyPokemonTeam])

    const api = useMemo(()=>({
        enemyPokemonTeam,
        generateTeam
    }),[enemyPokemonTeam, generateTeam])

    return <EnemyPokemonTeamContext.Provider value={api}>
        {props.children}
    </EnemyPokemonTeamContext.Provider>
}

export const useEnemyPokemonTeamContext = () =>useContext(EnemyPokemonTeamContext)