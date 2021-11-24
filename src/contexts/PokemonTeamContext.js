import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {fetchOnePokemon, getTotalPokemonCount} from "../services/fetch";

const PokemonTeamContext = createContext()

export function PokemonTeamProvider (props) {
    const [pokemonTeam, setPokemonTeam] = useState(JSON.parse(localStorage.getItem('pokemonTeam')) || [])
    const generateTeam = useCallback(async ()=>{
        const team = []
        const totalPokemon = await getTotalPokemonCount()

        for (let i = 0; i < 6; i++) {
            const fetchedPokemon = await fetchOnePokemon(Math.round(Math.random() * totalPokemon))
            team.push(fetchedPokemon)
        }
        console.log(team)
        localStorage.setItem('pokemonTeam', JSON.stringify(team))
        setPokemonTeam(team)
    }, [setPokemonTeam])

    const api = useMemo(()=>({
        pokemonTeam,
        generateTeam
    }),[pokemonTeam, generateTeam])

    return <PokemonTeamContext.Provider value={api}>
        {props.children}
    </PokemonTeamContext.Provider>
}

export const usePokemonTeamContext = () =>useContext(PokemonTeamContext)