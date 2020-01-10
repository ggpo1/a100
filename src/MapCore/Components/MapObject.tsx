import React from 'react';
import {Image} from 'react-konva';
import IObjectProps from "../Models/Components/Object/IObjectProps";
import IObjectState from "../Models/Components/Object/IObjectState";
import Emit from "../Data/Emit";
import LayerType from "../Models/Enums/LayerType";
import DeleteCircle from "./Stage/DeleteCircle";

export default class MapObject extends React.Component<IObjectProps, IObjectState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            image: null,
            isDelete: false,
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
        let deleteCircle;
        if (this.state.isDelete) {
            deleteCircle = (
                <DeleteCircle
                    key={source.key + '_deleteCircle'}
                    source={source}
                    parentType={LayerType.LIGHTING}
                />
            );
        }
        mapObject = (
            <Image
                key={source.key + '_image'}
                x={ this.state.source.x }
                y={ this.state.source.y }
                onMouseDown={(e) => this.setShapeMoveNow(e, true)}
                onTouchStart={(e) => this.setShapeMoveNow(e, true)}
                onMouseUp={(e) => this.setShapeMoveNow(e, false)}
                onTouchEnd={(e) => this.setShapeMoveNow(e, false)}
                onDblTap={() => this.setState({isDelete: !this.state.isDelete})}
                onDblClick={() => this.setState({isDelete: !this.state.isDelete})}
                width={ this.state.source.width ? this.state.source.width : 35 }
                height={ this.state.source.height ? this.state.source.height : 35 }
                image={ this.state.image }
            />
        );
        return [mapObject, deleteCircle];
    }

}