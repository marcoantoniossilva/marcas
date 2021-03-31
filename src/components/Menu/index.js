import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import empresasEstatica from '../../assets/dicionarios/empresas.json';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { LoginOptionsMenu } from '../../components/Login';
import Toast from 'react-native-simple-toast';
import SyncStorage from "sync-storage";

import {
    Avatar,
    NomeEmpresa,
    ContenedorMenu,
    DivisorMenu,
    EsquerdaDaMesmaLinha,
    Espacador
} from "../../assets/styles";

import avatar from "../../assets/imgs/avatar.jpeg";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            atualizar: true,
            filtrar: props.filtragem
        }

        this.usuario;
    }



    mostrarEmpresa = (empresa) => {
        const { filtrar } = this.state;

        return (
            <TouchableOpacity key={empresa._id} onPress={() => {
                filtrar(empresa)
            }}>
                <DivisorMenu />
                <EsquerdaDaMesmaLinha>
                    <Avatar source={avatar} />
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
            </TouchableOpacity>
        );
    }

    onLogin = (servico) => {
        this.usuario = SyncStorage.get("user");
        this.setState({
            atualizar: true
        }, () => {
            Toast.show("Bem vindo " + this.usuario.name + ", você logou com sucesso com sua conta do " + servico.signer, Toast.LONG);
        })
    }

    onLogout = (signer) => {
        this.setState({
            atualizar: true
        }, () => {
            Toast.show("Até mais " + this.usuario.name + ", você deslogou com sucesso com sua conta do " + signer);
        })

    }

    render = () => {
        const empresas = empresasEstatica.empresas;

        return (
            <SafeAreaInsetsContext.Consumer>
                {insets =>
                    <ScrollView style={{ paddingTop: insets.top }}>
                        <LoginOptionsMenu onLogin={this.onLogin} onLogout={this.onLogout} />
                        <ContenedorMenu>
                            {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                        </ContenedorMenu>
                    </ScrollView>
                }
            </SafeAreaInsetsContext.Consumer>
        );
    }

}