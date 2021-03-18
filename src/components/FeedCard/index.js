import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardContent, CardImage } from 'react-native-cards';
import Icon from 'react-native-vector-icons/AntDesign';

import {
    Avatar,
    NomeEmpresa,
    NomeProduto,
    DescricaoProduto,
    PrecoProduto,
    Likes
} from "../../assets/styles";

import avatar from "../../assets/imgs/avatar.jpeg";
import produto from "../../assets/imgs/produto.jpeg"


export default class FeedCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feed: this.props.feed,
            navigator: this.props.navigator
        }
    }

    render = () => {
        const { feed, navigator } = this.state;

        return (
            <TouchableOpacity onPress={
                () => {
                    navigator.navigate("Detalhes", { feedId: feed._id })
                }
            }>
                <Card>
                    <CardImage source={produto} />
                    <CardContent>
                        <Avatar source={avatar} />
                        <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                    </CardContent>
                    <CardContent>
                        <NomeProduto>{feed.product.name}</NomeProduto>
                    </CardContent>
                    <CardContent>
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    </CardContent>
                    <CardContent>
                        <PrecoProduto>{"R$" + feed.product.price}</PrecoProduto>
                        <Icon name="heart" size={18}>
                            <Likes>{feed.likes}</Likes>
                        </Icon>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }
}