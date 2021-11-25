import {Card, ProgressBar} from "react-bootstrap";
import {usePokemonTeamContext} from "../contexts/PokemonTeamContext";
import {useState} from "react";
import {GetGender} from "./generalComponents/Cards";
import {MDBIcon} from "mdbreact";

export function BattleSection(){
    const {pokemonTeam} = usePokemonTeamContext()
    const [activePokemon, setActivePokemon] = useState(pokemonTeam[0])

    return <section>
        <NameSection pokemon={activePokemon}/>
    </section>
}

function NameSection(props) {
    const {pokemon} = props
    const gender = GetGender(pokemon.gender)
    return <Card style={{maxWidth : '20rem', backgroundColor: '#ececcb', borderRadius: '25px 10px 25px 10px', border: '#2d4416 solid 4px'}} className={'px-3 py-1'}>
        <Card.Title><span className={'text-capitalize h2'}>{pokemon.name} <span className={'ms-2 text-primary'}><MDBIcon icon={gender}/></span></span></Card.Title>
        <div className={'d-flex justify-content-between'}>
            <img src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/Poke-Ball-32.png?alt=media&token=9513774d-f6e3-474b-988f-490c7f58ff08"
                alt=""/>
            <div className={'w-75 my-auto d-flex rounded text-light ps-2'} style={{backgroundColor: '#526759'}}>
                <span style={{color: '#f8af41'}}>HP</span>
                <div className={'w-100 my-auto mx-2'}>
                    <ProgressBar now={pokemon.stats.currentHeath.base_stat} min={0} max={pokemon.stats.health.base_stat} variant={'success'}/>
                </div>
            </div>
        </div>
    </Card>
}