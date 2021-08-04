import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {
    return (
        <Navbar bg="light">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    GD Drive
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/user">
                        Profile
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
