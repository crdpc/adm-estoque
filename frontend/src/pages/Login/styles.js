import styled from 'styled-components';

export const MainContainer = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: #ffb400;
    text-transform: uppercase;
    letter-spacing: 0.4rem;     
`;

export const DrivePainel = styled.h2 `
    margin: 3rem 0 2rem 0;
`;

export const FormDrive = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20%;
    width: 100%;
`;

export const InputDrive = styled.input`
    background: rgba(255,255,255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31,38, 135, 0.37);
    border-radius: 2rem;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: #3c3542e;
    font-size: 1rem;
    font-weight: bold;
    &:focus {
        display: inline-block;
        box-shadow: 0 0 0 0.2rem #b9abe0;
        backdrop-filter: blur(12rem);
        border-radius: 2rem;
    }
    &::placeholder {
        color: #b9abe099;
        font-weight: 100;
        font-size: 1rem;
    }
`;

export const ButtonDrive = styled.button `
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    margin: 2rem 0 2rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 50%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
`;