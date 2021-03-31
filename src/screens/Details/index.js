import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';

import Icon from 'react-native-vector-icons/AntDesign';
import SyncStorage from "sync-storage";
import Toast from "react-native-simple-toast";

import avatar from "../../assets/imgs/avatar.jpeg";

import {
    Avatar,
    NomeProduto,
    NomeEmpresa,
    DescricaoProduto,
    PrecoProduto,
    Likes,
    CentralizadoNaMesmaLinha,
    EsquerdaDaMesmaLinha,
    Espacador
} from "../../assets/styles";

import Compartilhador from "../../components/Compartilhador";

import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import slide1 from '../../assets/imgs/slide1.jpeg';
import slide2 from '../../assets/imgs/slide2.jpeg';
import slide3 from '../../assets/imgs/slide3.jpeg';


export default class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feedId: this.props.navigation.state.params.feedId,
            feed: null,

            gostou: false
        }
    }

    carregarFeed = () => {
        const { feedId } = this.state;
        const feeds = feedsEstaticos.feeds;
        const filteredFeeds = feeds.filter((feed) => feed._id === feedId);

        if (filteredFeeds.length) {
            this.setState({
                feed: filteredFeeds[0]
            });
        }

    }

    componentDidMount = () => {
        this.carregarFeed();
    }

    mostrarSlides = () => {
        const slides = [slide1, slide2, slide3];

        return (
            <SliderBox
                dotColor={"#ffad05"}
                inactiveDotColor={"#5995ed"}
                resizeMethod={"resize"}
                resizeMode={"cover"}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    marginHorizontal: 5
                }}
                images={slides} />
        )
    }

    like = () => {
        const { feed } = this.state;

        feed.likes++;

        this.setState({
            feed: feed,
            gostou: true
        }, () => {
            Toast.show("Obrigado pelo seu feedbak!", Toast.LONG);
        });
    }

    dislike = () => {
        const { feed } = this.state;
        const usuarioo = SyncStorage.get("user");

        console.log("Removendo o like do usuário: " + usuarioo.name);

        feed.likes--;

        this.setState({
            feed: feed,
            gostou: false
        });
    }

    render = () => {
        const { feed, gostou } = this.state;

        if (feed) {
            return (
                <>
                    <Header
                        leftComponent={
                            <Icon size={28} name="left" onPress={() => {
                                this.props.navigation.goBack();
                            }} />
                        }
                        centerComponent={
                            <>
                                <CentralizadoNaMesmaLinha>
                                    <Avatar source={avatar} />
                                    <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                                </CentralizadoNaMesmaLinha>
                            </>
                        }
                        rightComponent={
                            <CentralizadoNaMesmaLinha>
                                <Compartilhador feed={feed} />
                                <Espacador />
                                {gostou && <Icon name="heart" size={28} color={"#f00"} onPress={
                                    () => {
                                        this.dislike();
                                    }
                                } />}
                                {!gostou && <Icon name="hearto" size={28} color={"#f00"} onPress={
                                    () => {
                                        this.like();
                                    }
                                } />}
                            </CentralizadoNaMesmaLinha>
                        }
                    >

                    </Header>
                    <CardView
                        cardElevation={2}
                        cornerRadius={0}>
                        {this.mostrarSlides()}
                        <View style={{ padding: 10 }}>
                            <Espacador />
                            <NomeProduto>{feed.product.name}</NomeProduto>
                            <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                            <Espacador />
                            <EsquerdaDaMesmaLinha>
                                <PrecoProduto>{"R$" + feed.product.price}   </PrecoProduto>
                                <Icon name="heart" size={18} color={'#f00'}>
                                    <Likes> {feed.likes}</Likes>
                                </Icon>
                            </EsquerdaDaMesmaLinha>
                            <Espacador />
                        </View>
                    </CardView>
                </>
            );
        } else {
            return (null);
        }
    }
}