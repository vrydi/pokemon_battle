import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Navigation() {
    return <>
        <Navbar bg={'dark'} variant={'dark'} expand={'lg'}>
            <Container className={'d-flex justify-content-center'}>
                <Navbar.Brand>
                    <img className="d-inline-block align-top"
                         src='https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/pokemon_logo.png?alt=media&token=911b4fce-0aac-4ee4-8e8e-308472d9997a'
                         height="40"
                         alt=""/>
                    <span className={'text-light ms-5 h2'}>Pokemon battle</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className={'nav-link'}>Home</Link>
                        <Link to={'/battle'} className={'nav-link'}>Battle</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>

}