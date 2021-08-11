import React from 'react'
import { Switch, Route } from "react-router-dom";
import NavBarGeneral from '../components/NavBarGeneral';
import { BrowserRouter } from 'react-router-dom';

import Agregar from '../views/Agregar';
import Borrar from '../views/Borrar';
import Detalle from '../views/Detalle';
import Editar from '../views/Editar';
import Home from '../views/Home';
import Movies from '../views/Movies';

export const AppRouter = () => {

    return (
        <div>
            <BrowserRouter>
            <NavBarGeneral />
            <div className="ml-5 mr-5 mt-5">
                <Switch>
                    <Route exact path="/movies/" component={Movies} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/agregar" component={Agregar} />
                    <Route exact path="/movies/detail/:id" component={Detalle} />
                    <Route exact path="/movies/delete/:id" component={Borrar} />
                    <Route exact path="/movies/edit/:id" component={Editar} />
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    )
}
