import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import empresasEstatica from "../../assets/dicionarios/empresas.json";

import {
    Avatar,
    NomeEmpresa,
    ContenedorMenu,
    DivisorMenu,
    Espacador,
    EsquerdaDaMesmaLinha
} from "../../assets/styles";

import avatar from "../../assets/imgs/avatar.jpeg";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filtrar: props.filtragem
        }
    }



    mostrarEmpresa = (empresa) => {
        const { filtrar } = this.state;

        return (
            <TouchableOpacity key={empresa._id} onPress={() => {
                filtrar(empresa)
            }}>
                <EsquerdaDaMesmaLinha>
                    <Avatar source={avatar} />
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
                <DivisorMenu />
            </TouchableOpacity>
        );
    }

    render = () => {
        const empresas = empresasEstatica.empresas;


        return (
            <ScrollView>
                <Espacador />
                <ContenedorMenu>
                    {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                </ContenedorMenu>
            </ScrollView>
        );
    }
}