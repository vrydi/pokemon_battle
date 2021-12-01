import {Button, Card, Col, Container, ProgressBar, Row} from "react-bootstrap";
import {usePokemonTeamContext} from "../contexts/PokemonTeamContext";
import {useState} from "react";
import {GetGender} from "./generalComponents/Cards";
import {MDBIcon} from "mdbreact";
import {useEnemyPokemonTeamContext} from "../contexts/EnemyPokemonTeam";

export function BattleSection(){
    const {pokemonTeam} = usePokemonTeamContext()
    const {enemyPokemonTeam} = useEnemyPokemonTeamContext()
    const [activePokemon, setActivePokemon] = useState(pokemonTeam[0])
    const [activeEnemyPokemon, setActiveEnemyPokemon] = useState(enemyPokemonTeam[0])


    return <section>
        <Container id={'battle'} className={'p-0'}>
            <div className={'mt-3 d-flex battle-screen'}>
                <Col lg={6} className={'left-field'}>
                    <Row className={'mt-3'} >
                        <NameSection pokemon={activeEnemyPokemon}/>
                        <div className={'position-relative w-75 mx-auto card-arrow'}/>
                    </Row>
                    <Row >
                        <img className={'w-75 mt-5 poke-image'} src={activePokemon.image} alt=""/>
                    </Row>
                    <Row style={{height: '0'}}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/battle_podia.png?alt=media&token=21348cd1-ea50-4ea2-ab4c-c9d4ba6d6042"
                            alt=""
                            className={'w-75 position-relative poke-stadia'}
                        />
                    </Row>
                </Col>
                <Col lg={6} className={'right-field'}>
                    <Row >
                        <img className={'w-75 mt-5 ms-auto mirror poke-image'} src={activeEnemyPokemon.image} alt=""/>
                    </Row>
                    <Row style={{height: '25px'}}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/battle_podia.png?alt=media&token=21348cd1-ea50-4ea2-ab4c-c9d4ba6d6042"
                            alt=""
                            className={'w-75 position-relative ms-auto poke-stadia mirror'}
                        />
                    </Row>
                    <Row>
                        <NameSection pokemon={activePokemon} className={'ms-auto'} friend={true}/>
                        <div className={'position-relative w-75 mx-auto card-arrow mirror'}/>
                    </Row>
                </Col>
            </div>
            <PokeOptions activePokemon={activePokemon} setActivePokemon={setActivePokemon}/>
        </Container>
    </section>
}

function PokeOptions (props) {
    const {activePokemon} = props
    const [buttons, setButtons] = useState(['fight', 'pokemon', 'bag', 'flee'])
    const [message, setMessage] = useState(`What will ${activePokemon.name} do?`)

    return <div className={'p-2 bg-green battle-option-screen m-0 d-flex'}>
        <PokeMessage message={message}/>
        <Col lg={6} className={'m-0 bg-beige row rounded-3'}>
            {buttons.map((b, i) => <PokeButton button={b} key={i}
                                               setButtons={setButtons}
                                               setMessage={setMessage}
                                               activePokemon={activePokemon}/>)}
        </Col>
    </div>
}

function RoundedDiv(props) {
    const {color, children} = props
    return <div className={`rounded-3 p-1 ${color}`}>
        {children}
    </div>
}

function PokeMessage(props){
    const {message} = props
    return <Col lg={6} className={'m-0'}>
        <RoundedDiv color={'bg-green'}>
            <RoundedDiv color={'bg-yellow'}>
                <RoundedDiv color={'bg-green'}>
                    <div className={'bg-beige battle-option-text p-2'}>
                        {message}
                    </div>
                </RoundedDiv>
            </RoundedDiv>
        </RoundedDiv>
    </Col>
}

function PokeButton(props) {
    const {button, setButtons, setMessage, activePokemon} = props

    const click = () => {
        switch (button) {
            case 'fight' :
                const moves = activePokemon.moves.map(m=>m.name)
                setButtons(moves)
                break
            case 'pokemon':
                break
            case 'bag':
                break
            case 'flee':
                setButtons(['fight', 'pokemon', 'bag', 'flee'])
                setMessage('you have fled')
                break
        }
    }
    return <Col lg={6}>
        <button onClick={()=>click()} className={`poke-option-button w-100 btn ${button}`}>{button}</button>
    </Col>
}

function NameSection(props) {
    const {pokemon, friend, className} = props
    const gender = GetGender(pokemon.gender)
    return <div>
        <Card className={className + ' px-3 py-1 pokemon-card bg-beige'}>
            <Card.Title><span className={'text-capitalize h4'}>{pokemon.name} <span className={'ms-2 text-primary'}><MDBIcon icon={gender}/></span></span></Card.Title>
            <div className={'d-flex justify-content-between'}>
                <img src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/Poke-Ball-32.png?alt=media&token=9513774d-f6e3-474b-988f-490c7f58ff08"
                     alt=""/>
                <div className={'w-75 my-auto d-flex rounded text-light ps-2 bg-green'}>
                    <span className={'text-yellow'}>HP</span>
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