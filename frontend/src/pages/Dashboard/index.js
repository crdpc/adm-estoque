import React from 'react';
import { Menu } from '../../components/Menu';
import { Container, ContudoTitulo, Titulo } from '../../styles/custom_adm';

export const Dashboard = () => {

    return(

        <Container>       
        
        <Menu />
        <ContudoTitulo>
        <Titulo>Willcome - Dashboard</Titulo>
        </ContudoTitulo>
        </Container>

    );
}