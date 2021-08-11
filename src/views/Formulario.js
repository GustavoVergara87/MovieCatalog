import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import getGeneros from '../helpers/getGeneros';

const Formulario = ({ valorInicial, setFormulario }) => {

    const [generos, setGeneros] = useState([])
    const [formValues, setFormValues] = useState(valorInicial)

    useEffect(() => {
        getGeneros().then((elementos) => setGeneros(elementos))
    }, []);

    useEffect(() => {
        setFormulario(formValues)
        // eslint-disable-next-line
    }, [formValues]);



    const handleInputChange = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: (target.type === "number") ? target.valueAsNumber : target.value });
    }

    const {
        title,
        rating,
        awards,
        release_date,
        length,
        genre_id } = formValues !== undefined ? formValues : { title: '', rating: '', awards: '', release_date: '', length: '', genre_id: '' };


        
    if (generos === null) {
        return (<Spinner animation="grow" />)
    }

    return (
        <div>
            <label>Title</label>
            <input
                className="form-control form-control-sm"
                type="text"
                name="title"
                autoComplete="off"
                value={title}
                onChange={handleInputChange}
            />
            <label>Rating</label>
            <input
                className="form-control form-control-sm"
                type="number"
                name="rating"
                autoComplete="off"
                value={rating}
                onChange={handleInputChange}
            />
            <label>Awards</label>
            <input
                className="form-control form-control-sm"
                type="number"
                name="awards"
                autoComplete="off"
                value={awards}
                onChange={handleInputChange}
            />
            <label>Release Date</label>
            <input
                className="form-control form-control-sm"
                type="date"
                name="release_date"
                autoComplete="off"
                value={(release_date === null | release_date === undefined) ? null : release_date.slice(0, 10)}
                onChange={handleInputChange} />
            <label>Length</label>
            <input
                className="form-control form-control-sm"
                type="number"
                name="length"
                autoComplete="off"
                value={length}
                onChange={handleInputChange}
            />

            <label>Genre</label><br />
            <select
                className="custom-select"
                name="genre_id"
                autoComplete="off"
                value={genre_id}
                onChange={handleInputChange}
            >
                <option defaultValue>-select genre-</option>
                {
                    generos.map((genero, i) =>
                        <option
                            key={i}
                            value={genero.id}
                        >
                            {genero.name}
                        </option>
                    )}
            </select>
            <br />
            <br />

        </div>

    )
}
export default Formulario;