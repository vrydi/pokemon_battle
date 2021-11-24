import {Button} from "react-bootstrap";
import {useState} from "react";
import {fetchOnePokemon, getTotalPokemonCount} from "../services/fetch";
import {PokemonCard} from "./generalComponents/Cards";

export function PokemonButton () {
    const [pokemonTeam, setPokemonTeam] = useState([])

    const createTeam = async () => {
        const team = []
        const totalPokemon = await getTotalPokemonCount()

        for (let i = 0; i < 6; i++) {
            const fetchedPokemon = await fetchOnePokemon(Math.round(Math.random() * totalPokemon))
            team.push(fetchedPokemon)
        }
        console.log(team)

        setPokemonTeam(team)
    }

    return <>
        <Button onClick={()=>createTeam()}>getTeam</Button>
        {pokemonTeam.length > 0 && pokemonTeam.map((p, i)=><PokemonCard pokemon={p} key={i}/>)}
    </>
}