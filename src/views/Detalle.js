import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import getMovies from '../helpers/getMovies';
import Button from 'react-bootstrap/Button';
import Borrar from './Borrar';
import Table from 'react-bootstrap/Table';
import { Spinner } from 'react-bootstrap';
import getGeneros from '../helpers/getGeneros';

const Detalle = () => {

    const { id } = useParams();
    const [detalle, setdetalle] = useState(null)
    const [mostrarBorrar, setmostrarBorrar] = useState(false)
    const [generoPelicula, setGeneroPelicula] = useState(null)
    let history = useHistory()

    useEffect(() => {
        getMovies(`movies/detail/${id}`)
            .then(res => setdetalle(res[0]))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log("para")
        console.log(detalle)

        if (detalle) {
            getGeneros()
                .then((elementos => elementos.find(genero => genero.id === detalle.genre_id)))
                .then((genero => setGeneroPelicula(genero)))
        }

    }, [detalle])



    function volver() {
        history.go(-2)
    }

    function borrar() {
        setmostrarBorrar(true)
    }

    function editar() {
        history.push(`/movies/edit/${id}`)
    }



    if (detalle === null || generoPelicula === null) {
        return (<Spinner animation="grow" />)
    }


    return (
        <div>
            <Table responsive striped bordered hover size="sm" >
                <tbody>
                    <tr>
                        <td>Id</td>
                        <td>{detalle.id}</td>
                    </tr>
                    <tr>
                        <td>Titulo</td>
                        <td>{detalle.title}</td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td>{detalle.rating}</td>
                    </tr>
                    <tr>
                        <td>Awards</td>
                        <td>{detalle.awards}</td>
                    </tr>
                    <tr>
                        <td>Fecha de estreno</td>
                        <td>{detalle.release_date === null ? null : detalle.release_date.slice(0, 10)}</td>
                    </tr>
                    <tr>
                        <td>Duracion</td>
                        <td>{detalle.length}</td>
                    </tr>
                    <tr>
                        <td>Genero</td>
                        <td>{generoPelicula.name}</td>
                    </tr>
                </tbody>
            </Table>

            <Button className="float-left ml-1" variant="secondary" onClick={volver}>
                Volver
            </Button>
            <Button className="float-left ml-1" variant="danger" onClick={borrar}>
                Borrar
            </Button>
            <Button className="float-left ml-1" variant="primary" onClick={editar}>
                Editar
            </Button>
            <Borrar mostrar={mostrarBorrar} externalmostrarsetter={setmostrarBorrar} formulario={detalle}></Borrar>
        </div>
    )
}
export default Detalle;
