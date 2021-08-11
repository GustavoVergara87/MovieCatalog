import React, { useEffect, useState } from 'react'
import { Spinner, ToggleButton, ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import getGeneros from '../helpers/getGeneros';
import queryString from 'query-string';

import Listas from './Listas';

const Movies = () => {

    const [generos, setGeneros] = useState(null)
    const [query, setquery] = useState({})
    let history = useHistory()

    const categorias = ["Todas", "Nuevas", "Recomendadas"];

    useEffect(() => {
        getGeneros().then((elementos) => setGeneros(elementos))
    }, []);

    useEffect(() => {
        history.push(`?${queryString.stringify(query)}`)
        // eslint-disable-next-line
    }, [query]);


    if (generos === null) {
        return (<Spinner animation="grow" />)
    }

    return (
        <div>
            <ButtonGroup toggle>
                {categorias.map((categoria, idx) => (
                    <ToggleButton key={idx} type="radio" variant="primary"
                        name={categoria}
                        checked={query.porCategoria === categoria}
                        onChange={(e) => setquery({ ...query, porCategoria: e.currentTarget.name })}>
                        {categoria}
                    </ToggleButton>
                ))}
            </ButtonGroup>

            <Dropdown as={ButtonGroup}>
                <Button variant="success">{generos.map(genero => genero.name).includes(query.porGenero) ? query.porGenero : "Generos"}</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    {
                        generos.map((genero, idx) => (
                            <Dropdown.Item key={idx} eventKey={genero.id}
                                name={genero.name}
                                active={query.porGenero === genero.name}
                                onClick={(e) => setquery({ ...query, porGenero: e.currentTarget.name })}
                            >
                                { genero.name}
                            </Dropdown.Item>))
                    }
                    <Dropdown.Divider></Dropdown.Divider>
                    <Dropdown.Item key="0"
                        name="Todos los generos"
                        onClick={(e) => setquery({ ...query, porGenero: e.currentTarget.name })}>
                        Todos los generos
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Listas generos={generos} />
        </div >
    )


}
export default Movies;

