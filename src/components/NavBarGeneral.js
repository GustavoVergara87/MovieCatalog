import React, { useEffect, useState } from 'react'
import { Form, FormControl, Nav, Navbar, NavLink } from 'react-bootstrap';
import { useHistory } from 'react-router';
import queryString from 'query-string';


const NavBarGeneral = () => {

    const [query, setquery] = useState({})
    const [mostrarBusqueda, setmostrarBusqueda] = useState({})
    let history = useHistory()

    useEffect(() => {
        history.push(`?${queryString.stringify(query)}`)
        console.log(history.location.pathname)
    // eslint-disable-next-line
    }, [query]);


    useEffect(() => {
        setmostrarBusqueda((history.location.pathname==="/movies"||history.location.pathname==="/movies/")?"visible":"invisible")
    }, [history.location.pathname]);
    

    return (
        <Navbar variant="dark" bg="dark" sticky="top">
            <Navbar.Brand href="/"><h1>Digital Movies</h1></Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink href="/movies"><h5> Peliculas </h5></NavLink>
                <NavLink href="/Agregar"><h5> Agregar </h5></NavLink>
            </Nav>
            <div className={mostrarBusqueda} >
                <Form inline className="ml-auto" onSubmit={e =>{e.preventDefault();e.target[0].value=""}}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 "
                        onChange={(e) => setquery({ porPalabraclave: e.currentTarget.value })} 
                        />
                </Form>
            </div>
        </Navbar>
    )
}

export default NavBarGeneral;