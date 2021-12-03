import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {generatePokemonTeam} from "../services/fetch";

const PokemonTeamContext = createContext()

export function PokemonTeamProvider (props) {
    const [pokemonTeam, setPokemonTeam] = useState(JSON.parse(localStorage.getItem('pokemonTeam')) || [])
    const [tries, setTries] = useState(localStorage.getItem('tries') || 3)
    const [activePokemon, setActivePokemon] = useState(JSON.parse(localStorage.getItem('activePokemon')) || pokemonTeam[0] || {})

    const generateTeam = useCallback(async ()=>{
        const team = await generatePokemonTeam()
        console.log(team)
        localStorage.setItem('pokemonTeam', JSON.stringify(team))
        setTries(tries-1)
        localStorage.setItem('tries', tries)
        localStorage.setItem('activePokemon', JSON.stringify(team[0]))
        setPokemonTeam(team)
        setActivePokemon(team[0])
    }, [setPokemonTeam, tries, setTries, setActivePokemon])

    const updateTeam = useCallback((newTeam)=>{
        setPokemonTeam(newTeam)
        localStorage.setItem('pokemonTeam', JSON.stringify(newTeam))
    }, [setPokemonTeam])

    const api = useMemo(()=>({
        pokemonTeam,
        generateTeam,
        tries,
        updateTeam,
        activePokemon,
        setActivePokemon
    }),[pokemonTeam,
        generateTeam,
        tries,
        updateTeam,
        activePokemon,
        setActivePokemon
    ])

    return <PokemonTeamContext.Provider value={api}>
        {props.children}
    </PokemonTeamContext.Provider>
}

export const usePokemonTeamContext = () =>useContext(PokemonTeamContext)