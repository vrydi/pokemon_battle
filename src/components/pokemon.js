import {Button, Col, Container, Row} from "react-bootstrap";
import {PokemonCard} from "./generalComponents/Cards";
import {usePokemonTeamContext} from "../contexts/PokemonTeamContext";

export function PokemonSection() {
    const {pokemonTeam} = usePokemonTeamContext()
    return <Container fluid className={'px-5 mt-3'}>
        {pokemonTeam.length < 1 && <PokemonButton/>}
        <PokemonCards/>
    </Container>
}

function PokemonButton () {
    const {generateTeam} = usePokemonTeamContext()
    return <div className={'text-center'}>
        <Button className={'m-2'} onClick={()=>generateTeam()}>Generate your team</Button>
    </div>
}

function PokemonCards () {
    const {pokemonTeam} = usePokemonTeamContext()
    return <Row xl={6}>
        {pokemonTeam.map((p, i)=>{
            return <Col key={i}>
                <PokemonCard pokemon={p}/>
            </Col>
        })}
    </Row>
}