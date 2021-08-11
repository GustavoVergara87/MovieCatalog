import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import postMovies from '../helpers/postMovies';
import Formulario from './Formulario';

const Agregar = () => {

    //--------------Hooks----------------------
    const [formulario, setFormulario] = useState(null)
    let history = useHistory()

    //--------------Logica----------------------

    const handleClick = () => {
        // history.goBack()
        history.go(-2)
    }

    const handleSubmit = async () => {
        postMovies(`create/`, JSON.stringify(formulario))
        handleClick()
    }

    //--------------Returns----------------------

    return (
        <div>
            <legend className="fw-bold">Agregar Pelicula</legend>
            <form>

                <Formulario formulario={formulario} setFormulario={setFormulario} />

                <Button className="ml-1" variant="secondary" type="button" onClick={handleClick}>Volver</Button>
                <Button className="ml-1" variant="primary" type="button" onClick={handleSubmit}>Guardar</Button>
            </form >
        </div>

    )
}
export default Agregar;