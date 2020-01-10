import React from 'react';
import {Image, Rect} from 'react-konva';
import IObjectProps from "../Models/Components/Object/IObjectProps";
import IObjectState from "../Models/Components/Object/IObjectState";
import light from '../Assets/lightbulb.png';
import Emit from "../Data/Emit";
import LayerType from "../Models/Enums/LayerType";

export default class MapObject extends React.Component<IObjectProps, IObjectState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            image: null
        };
        this.setShapeMoveNow = this.setShapeMoveNow.bind(this);
    }

    public setShapeMoveNow(e, value: boolean) {
        if (e.evt.which === 1) {
            Emit.Emitter.emit('setIsShapeMovingNow', value, {
                type: LayerType.LIGHTING,
                shape: this.state.source
            });
        }
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = this.state.source.photo;
        image.onload = () => {
            this.setState({ image: image } );
        }
    }

    render() {
        const { source } = this.state;
        let mapObject;
        console.log('\n\n---------------------------------------------');
        console.log('\tOBJECT ' + source.id);
        console.log('---------------------------------------------');
        console.log('\tobjectKey: ' + source.key);
        mapObject = (
            <Image
                key={source.key + '_image'}
                x={ this.state.source.x }
                y={ this.state.source.y }
                onMouseDown={(e) => this.setShapeMoveNow(e, true)}
                onTouchStart={(e) => this.setShapeMoveNow(e, true)}
                onMouseUp={(e) => this.setShapeMoveNow(e, false)}
                onTouchEnd={(e) => this.setShapeMoveNow(e, false)}
                width={ this.state.source.width ? this.state.source.width : 35 }
                height={ this.state.source.height ? this.state.source.height : 35 }
                image={ this.state.image }
            />
        );
        console.log('\t' + mapObject.key);
        console.log('---------------------------------------------');
        return mapObject;
    }

}