import React from 'react';

import { SliderBox } from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';

import Icon from 'react-native-vector-icons/AntDesign';

import {
    NomeProduto,
    DescricaoProduto,
    PrecoProduto,
    Likes
} from "../../assets/styles";

import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import slide1 from '../../assets/imgs/slide1.jpeg';
import slide2 from '../../assets/imgs/slide2.jpeg';
import slide3 from '../../assets/imgs/slide3.jpeg';


export default class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feedId: this.props.navigation.state.params.feedId,
            feed: null
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

    render = () => {
        const { feed } = this.state;

        if (feed) {
            return (
                <CardView
                    cardElevation={2}
                    cornerRadius={0}>
                    {this.mostrarSlides()}
                    <NomeProduto>{feed.product.name}</NomeProduto>
                    <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    <PrecoProduto>{"R$" + feed.product.price}</PrecoProduto>
                    <Icon name="heart" size={18}>
                        <Likes>{feed.likes}</Likes>
                    </Icon>
                </CardView>
            );
        } else {
            return (null);
        }
    }
}