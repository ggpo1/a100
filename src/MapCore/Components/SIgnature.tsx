import React, { Component } from 'react';
import { Rect, Text } from 'react-konva';
import ISignatureProps from './../Models/Components/Signature/ISignatureProps';
import ISignatureState from './../Models/Components/Signature/ISignatureState';
import Orientation from './../Models/Enums/Orientation';
import SignaturePosition from './../Models/Enums/SignaturePosition';
import StillageSize from './../Models/Enums/StillageSize/StillageSize';
import Emit from "../Data/Emit";

export default class Signature extends Component<ISignatureProps, ISignatureState> {

    constructor(props) {
        super(props);

        this.state = {
            parentKey: this.props.parentKey,
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            parentSize: this.props.parentSize,
            source: this.props.source,
        };

        this.thisForceUpdate = this.thisForceUpdate.bind(this);

        Emit.Emitter.addListener('stillageSignatureForceUpdate', this.thisForceUpdate);
    }

    public thisForceUpdate(parentKey: string, newParentX: number, newParentY: number) {
        if (parentKey === this.state.parentKey) {
            this.setState({parentX: newParentX, parentY: newParentY})
        }
    };

    // public setStillageMoveEnabled(e) {
    //     Emit.Emitter.emit('setIsShapeMoving', !this.state.isMoveEnabled);
    //     this.setState({isMoveEnabled: !this.state.isMoveEnabled})
    // }

    render() {
        const { parentX, parentY, parentOrientation, parentSize, source } = this.state;

        let _x, _y, _width, _height = 0;
        if (parentSize === StillageSize.NORMAL) {
            if (parentOrientation === Orientation.VERTICAL) {
                _width = 40;
                _height = 76;
                if (source.position === SignaturePosition.RIGHT) {
                    _x = parentX;
                    _y = parentY - 0.5;
                } else if (source.position === SignaturePosition.LEFT) {
                    _x = parentX - 15.5;
                    _y = parentY - 0.5;
                }
            } else {
                _width = 76;
                _height = 40;
                if (source.position === SignaturePosition.TOP) {
                    _x = parentX - 0.5;
                    _y = parentY - 15.5;
                } else if (source.position === SignaturePosition.BOTTOM) {
                    _x = parentX - 0.5;
                    _y = parentY;
                }
            }
        } else if (parentSize === StillageSize.SMALL) {
            if (parentOrientation === Orientation.VERTICAL) {
                _width = 40;
                _height = 50;
                if (source.position === SignaturePosition.RIGHT) {
                    _x = parentX;
                    _y = parentY - 0.5;
                } else if (source.position === SignaturePosition.LEFT) {
                    _x = parentX - 15.5;
                    _y = parentY - 0.5;
                }
            } else {
                _width = 50;
                _height = 40;
                if (source.position === SignaturePosition.TOP) {
                    _x = parentX - 0.5;
                    _y = parentY - 15.5;
                } else if (source.position === SignaturePosition.BOTTOM) {
                    _x = parentX - 0.5;
                    _y = parentY;
                }
            }
        }

        let block = (
            <Rect
                key={'signature_rect' + '_' + parentX + '_' + parentY + '_' + parentSize + '_' + parentOrientation + '_' + source.position + '_' + source.title}
                cornerRadius={4}
                x={_x}
                y={_y}
                width={_width}
                height={_height}
                fill={'#dcdcdc'}
                // onDblTap={}
            />
        );

        _x = 0; _y = 0;
        let _fontSize = 11;
        if (parentSize === StillageSize.NORMAL) {
            if (parentOrientation === Orientation.HORIZONTAL) {
                if (source.position === SignaturePosition.TOP) {
                    if (source.title.length === 1) {
                        _x = parentX + 34.5;
                        _y = parentY - 13;
                    } else if (source.title.length === 2) {
                        _x = parentX + 31;
                        _y = parentY - 13;
                    } else if (source.title.length > 2) {
                        _x = parentX + 28;
                        _y = parentY - 13;
                    }
                } else if (source.position === SignaturePosition.BOTTOM) {
                    if (source.title.length === 1) {
                        _x = parentX + 34.5;
                        _y = parentY + 28;
                    } else if (source.title.length === 2) {
                        _x = parentX + 31;
                        _y = parentY + 28;
                    } else if (source.title.length > 2) {
                        _x = parentX + 28;
                        _y = parentY + 28;
                    }
                }
            } else if (parentOrientation === Orientation.VERTICAL) {
                if (source.position === SignaturePosition.LEFT) {
                    if (source.title.length === 1) {
                        _x = parentX - 11;
                        _y = parentY + 33;
                    } else if (source.title.length === 2) {
                        _x = parentX - 15;
                        _y = parentY + 33;
                    } else if (source.title.length > 2) {
                        _x = parentX - 15;
                        _y = parentY + 34;
                        _fontSize = 8;
                    }
                } else if (source.position === SignaturePosition.RIGHT) {
                    if (source.title.length === 1) {
                        _x = parentX + 29;
                        _y = parentY + 33;
                    } else if (source.title.length === 2) {
                        _x = parentX + 26.5;
                        _y = parentY + 33;
                    } else if (source.title.length > 2) {
                        _x = parentX + 26;
                        _y = parentY + 34;
                        _fontSize = 8;
                    }
                }
            }
        } else if (parentSize === StillageSize.SMALL) {
            if (parentOrientation === Orientation.HORIZONTAL) {
                if (source.position === SignaturePosition.TOP) {
                    if (source.title.length === 1) {
                        _x = parentX + 22;
                        _y = parentY - 13;
                    } else if (source.title.length === 2) {
                        _x = parentX + 20;
                        _y = parentY - 13;
                    } else if (source.title.length > 2) {
                        _x = parentX + 16;
                        _y = parentY - 13;
                    }
                } else if (source.position === SignaturePosition.BOTTOM) {
                    if (source.title.length === 1) {
                        _x = parentX + 22;
                        _y = parentY + 28;
                    } else if (source.title.length === 2) {
                        _x = parentX + 20;
                        _y = parentY + 28;
                    } else if (source.title.length > 2) {
                        _x = parentX + 16;
                        _y = parentY + 28;
                    }
                }
            } else if (parentOrientation === Orientation.VERTICAL) {
                if (source.position === SignaturePosition.LEFT) {
                    if (source.title.length === 1) {
                        _x = parentX - 11;
                        _y = parentY + 20;
                    } else if (source.title.length === 2) {
                        _x = parentX - 14;
                        _y = parentY + 20;
                    } else if (source.title.length > 2) {
                        _x = parentX - 14.5;
                        _y = parentY + 23;
                        _fontSize = 8;
                    }
                } else if (source.position === SignaturePosition.RIGHT) {
                    if (source.title.length === 1) {
                        _x = parentX + 29;
                        _y = parentY + 20;
                    } else if (source.title.length === 2) {
                        _x = parentX + 26.5;
                        _y = parentY + 20;
                    } else if (source.title.length > 2) {
                        _x = parentX + 26;
                        _y = parentY + 20;
                        _fontSize = 8;
                    }
                }
            }
        }


        let title = (
            <Text
                key={'signature_text' + '_' + parentX + '_' + parentY + '_' + parentSize + '_' + parentOrientation + '_' + source.position + '_' + source.title}
                x={_x}
                y={_y}
                text={source.title}
                fill={'#333333'}
                fontSize={_fontSize}
            />
        );

        let results = [block, title]

        return results;
    }
}