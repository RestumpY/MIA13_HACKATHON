import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Menu.css";

function Menu() {
    return (
        <>
            <Navbar bg="white" data-bs-theme="light">
                <Container>
                    <Nav className="m-auto p-2">
                        <Nav.Link href="#home">DATA</Nav.Link>
                        <Nav.Link href="#features">VISUALISATION</Nav.Link>
                        <Nav.Link href="#pricing">ANALYSES</Nav.Link>
                        <Nav.Link href="#pricing">PREDICTIONS</Nav.Link>
                        <img width={100} src="https://i.pinimg.com/originals/c0/11/a5/c011a51ad84937936e9af692d95b2e2a.png" />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Menu;