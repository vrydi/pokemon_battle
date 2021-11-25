import {Card, Col, Container, ProgressBar, Row} from "react-bootstrap";
import {usePokemonTeamContext} from "../contexts/PokemonTeamContext";
import {useState} from "react";
import {GetGender} from "./generalComponents/Cards";
import {MDBIcon} from "mdbreact";

export function BattleSection(){
    const {pokemonTeam} = usePokemonTeamContext()
    const [activePokemon, setActivePokemon] = useState(pokemonTeam[0])

    return <section>
        <Container className={'my-3 bg-success d-flex'} style={{height: '50rem'}}>
                <Col lg={6}>
                    <Row className={'mt-3'} >
                        <NameSection pokemon={activePokemon}/>
                        <div className={'position-relative w-75 mx-auto'}
                            style={{background: 'linear-gradient(to bottom left, rgba(255,255,255,0) 48%, #526759 48%)', borderRadius: '25px 0 0 25px', height: '3rem', top: '-2rem'}}/>
                    </Row>
                    <Row>
                        <img className={'w-75 mt-5'} src={activePokemon.image} alt=""/>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                        <img className={'w-75 mt-5 ms-auto'} src={activePokemon.image} style={{transform: 'scaleX(-1)'}} alt=""/>
                    </Row>
                    <Row>
                        <NameSection pokemon={activePokemon} className={'ms-auto'} friend={true}/>
                        <div className={'position-relative w-75 mx-auto'}
                             style={{background: 'linear-gradient(to bottom right, rgba(255,255,255,0) 48%, #526759 48%)', borderRadius: '0 25px 25px 0', height: '3rem', top: '-2rem'}}/>
                    </Row>
                </Col>
        </Container>
    </section>
}

function NameSection(props) {
    const {pokemon, friend, className} = props
    const gender = GetGender(pokemon.gender)
    return <div style={{zIndex: '10'}}>
        <Card style={{maxWidth : '20rem', backgroundColor: '#ececcb', borderRadius: '25px 10px 25px 10px', border: '#2d4416 solid 4px'}} className={className + ' px-3 py-1'}>
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
            {friend && <div className={'text-right me-3'}>
                {`${pokemon.stats.currentHeath.base_stat} / ${pokemon.stats.health.base_stat}`}
            </div>}
        </Card>
    </div>
}