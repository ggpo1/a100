import React from 'react';
import { Image } from 'react-konva';
import IObjectProps from "../Models/Components/Object/IObjectProps";
import IObjectState from "../Models/Components/Object/IObjectState";
import light from '../Assets/lightbulb.png';

export default class MapObject extends React.Component<IObjectProps, IObjectState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            image: null
        };
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = this.state.source.photo;
        image.onload = () => {
            this.setState({ ...this.state, ...{ image: image } })
        }
    }

    render() {
        const { source } = this.state;

        return <Image
            x={ this.state.source.x }
            y={ this.state.source.y }
            width={ this.state.source.width ? this.state.source.width : 35 }
            height={ this.state.source.height ? this.state.source.height : 35 }
            image={ this.state.image }
        />;
    }

}