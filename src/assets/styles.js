import styled from "styled-components/native";

export const Avatar = styled.Image`
    padding: 4px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
`;

export const NomeEmpresa = styled.Text`
    padding: 8px;
    font-size: 16px;
    color: #59594a;
`;

export const NomeProduto = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #59594a;
`;

export const DescricaoProduto = styled.Text`
    font-size: 16px;
    color: #59594a;
`;

export const PrecoProduto = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #59594a;
`;

export const Likes = styled.Text`
    font-size: 16px;
    color: #59594a;
`;

export const EntradaNomeProduto = styled.TextInput`
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-color: #c7c7c7;
    border-width: 1px;
    border-radius: 8px;
`;

export const CentralizadoNaMesmaLinha = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const EsquerdaDaMesmaLinha = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ContenedorMenu = styled.View`
    flex: 1px;
    font-size: 18px;
    background-color: #fff;
`;

export const Espacador = styled.View`
    flex-direction: row;
    padding: 15px;
`;

export const DivisorMenu = styled.View`
    margin: 5px;

    border-bottom-width:1px;
    border-color: #050505;
`;