import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavList } from './styles';

export const Menu = () => {

    return(
       
         <NavList>
             <NavLink to="/app"><li>Aplicativo</li></NavLink> <br />
             <NavLink to="/rh"><li>RH</li></NavLink> <br />
             <NavLink to="/financeiro"><li>Financeiro</li></NavLink> <br />
             <NavLink to="/comboio"><li>Comboio</li></NavLink> <br />
             <NavLink to="/rank"><li>Rank</li></NavLink> <br />
             <NavLink to="/estoque"><li>Estoque</li></NavLink> <br />     
             <Link to="/">
                        <button type="button">Sair</button>
                    </Link>{" "}           
        </NavList>           
       
    )
}
