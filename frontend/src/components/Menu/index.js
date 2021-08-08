import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => {

    return(
        <div>
             <Link to="/">Dashboard</Link> <br />
             <Link to="/listar">Listar</Link> <br />
        </div>
    )

}