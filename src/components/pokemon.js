import {Button, Col, Container, Row, Spinner, Toast, ToastContainer} from "react-bootstrap";
import {PokemonCard} from "./generalComponents/Cards";
import {usePokemonTeamContext} from "../contexts/PokemonTeamContext";
import {useState} from "react";
import {useEnemyPokemonTeamContext} from "../contexts/EnemyPokemonTeam";

export function PokemonSection() {
    return <Container fluid className={'px-5 mt-3'}>
        <fieldset className={'border border-3 px-4 py-2'} style={{borderRadius: '25px'}}>
            <div className={'d-flex justify-content-around'}>
                <h1>My Team</h1>
                <PokemonButton/>
            </div>
            <PokemonCards/>
        </fieldset>
    </Container>
}

function PokemonButton () {
    const {generateTeam, tries} = usePokemonTeamContext()
    const {generateEnemyTeam} = useEnemyPokemonTeamContext()
    const [message, setMessage] = useState('Generate your team')
    const [showToast, setShowToast] = useState(false)

    const clickButton = () => {
        setMessage('Generating...')
        generateEnemyTeam()
        generateTeam().then(()=>{
            setMessage('Generate your team')
            setShowToast(true)
        })
    }

    return <div className={'text-center'}>
        {tries >= 0 && <Button className={'m-2'} onClick={()=>clickButton()}>{message === 'Generating...' ? <Spinner animation="border" size={'sm'}/> : ''}{message}</Button>}
        {showToast &&
            <ToastContainer position={'top-center'} className={'mt-5'} style={{zIndex: '10000'}}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide animation={true}>
                    <Toast.Header>
                        <strong className="me-auto">Successfully generated a new team</strong>
                    </Toast.Header>
                    <Toast.Body>{`${tries +1} generation attempt(s) remaining`}</Toast.Body>
                </Toast>
            </ToastContainer>
        }
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