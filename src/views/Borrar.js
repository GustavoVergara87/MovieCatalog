import React from 'react'
import { useHistory, useParams } from 'react-router';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import postMovies from '../helpers/postMovies';

const Borrar = ({ externalmostrarsetter, mostrar, formulario }) => {

    const { id } = useParams()
    const handleClose = () => externalmostrarsetter(false);
    let history = useHistory()

    const handleSubmit = async () => {
        const nuevoTitulo = formulario.title.slice(0, 8) === "BORRADO " ? formulario.title : ("BORRADO " + formulario.title)
        postMovies(`update/${id}`, JSON.stringify({ ...formulario, "title": nuevoTitulo }))
        history.push("/movies/")
    }

    if (formulario === null) {
        return (<Spinner animation="grow" />)
    }

    return (
        <>
            <Modal show={mostrar} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrado Logico</Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro de querer borrar esta película? <br /> <b>{`${formulario.title}`}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Borrar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default Borrar;