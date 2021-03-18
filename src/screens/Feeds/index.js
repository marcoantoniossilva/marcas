import React from 'react';

import { View, FlatList } from 'react-native';

import feedsEstaticos from "../../assets/dicionarios/feeds.json";
import FeedCard from "../../components/FeedCard";


const FEEDS_POR_PAGINA = 4;

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proximaPagina: 0,
            feeds: [],
            carregando: false,
            atualizando: false
        };
    }

    carregarFeeds = () => {
        const { proximaPagina, feeds } = this.state;

        // avisa que está carregando
        this.setState({
            carregando: true
        });

        // Carregar o total de feeds por página da página atual 
        const idInicial = proximaPagina * FEEDS_POR_PAGINA + 1;
        const idFinal = idInicial + FEEDS_POR_PAGINA - 1;
        const maisFeeds = feedsEstaticos.feeds.filter((feed) => feed._id >= idInicial && feed._id <= idFinal);
        console.log(idFinal);
        if (maisFeeds.length) {
            console.log("adicionando" + maisFeeds.length + " feeds");

            //incrementar página e guardar os feeds
            this.setState({
                proximaPagina: proximaPagina + 1,
                feeds: [...feeds, ...maisFeeds],
                carregando: false,
                atualizando: false
            });
        } else {
            this.setState({
                carregando: false,
                atualizando: false
            });
        }
    }

    componentDidMount = () => {
        this.carregarMaisFeeds();
    }

    carregarMaisFeeds = () => {
        const { carregando } = this.state;
        if (carregando) {
            return;
        }

        this.carregarFeeds();
    }

    atualizar = () => {
        this.setState({ atualizando: true, feeds: [], proximaPagina: 0 },
            () => {
                this.carregarFeeds(); //injeçção de função, só carrega os feeds após atualizar os estados
            });
    }

    mostrarFeed = (feed) => {
        return (
            <FeedCard feed={feed} navigator={this.props.navigation}/>
        );
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state;

        return (
            <FlatList
                data={feeds}

                numColumns={2}

                onEndReached={() => this.carregarMaisFeeds()}
                onEndReachedThreshold={0.1}

                onRefresh={() => this.atualizar()}
                refreshing={atualizando}

                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: '50%' }}>
                            {this.mostrarFeed(item)}
                        </View>
                    )
                }}
            >
            </FlatList>
        );
    }

    render = () => {
        const { feeds } = this.state;

        if (feeds.length) {
            console.log("exibindo " + feeds.length + " feeds");

            return (
                this.mostrarFeeds(feeds)
            );
        } else {
            return (null);
        }
    }
}