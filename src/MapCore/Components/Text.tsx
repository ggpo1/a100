import React from 'react';
import ITextProps from "../Models/Components/Text/ITextProps";
import ITextState from "../Models/Components/Text/ITextState";
import * as Konva from 'react-konva';

export default class Text extends React.Component<ITextProps, ITextState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source
        }
    }

    render() {
        const { source } = this.state;
        return (
            <Konva.Text
                x={source.x}
                y={source.y}
                text={source.text}
                fontFamily={'Calibri'}
                fontSize={source.fontSize}
            />
        );
    }
}