import React, { useEffect, useMemo, useState } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap';
import getMovies from '../helpers/getMovies';
import queryString from 'query-string';
import { useLocation } from 'react-router';

const Listas = ({ generos }) => {

    const [movies, setMovies] = useState(null)
    const [filtro, setFiltro] = useState({})
    const location = useLocation();


    useEffect(() => {
        setFiltro(queryString.parse(location.search))
    }, [location]);


    useMemo(() => {
        switch (filtro.porCategoria) {
            case "Nuevas":
                getMovies("movies/new")
                    .then(peliculas => { setMovies(peliculas) })
                break;
            case "Recomendadas":
                getMovies("movies/recommended")
                    .then(peliculas => { setMovies(peliculas) })
                break;
            default:
            case "Todas":
                getMovies("movies")
                    .then(peliculas => { setMovies(peliculas) })
                break;
        }
    }, [filtro])


    if (movies === null | generos === undefined) {
        return (<Spinner animation="grow" />)
    }


    const porGenero = generos.find(genero => genero.name === filtro.porGenero)
    let movies_filtradas = (porGenero != null) ? movies.filter(movie => movie.genre_id === porGenero.id) : movies
    movies_filtradas = (filtro.porPalabraclave != null) ? movies_filtradas.filter(movie => movie.title.toLocaleLowerCase().includes(filtro.porPalabraclave)) : movies_filtradas


    return (
        <div >
            <hr />
            <ListGroup>
                {movies_filtradas.map(movie =>
                    <ListGroup.Item key={movie.id} action href={`/movies/detail/${movie.id}`}>
                        {movie.title}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
}

export default Listas;