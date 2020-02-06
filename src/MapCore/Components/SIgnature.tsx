import React, {Component} from 'react';
import {Rect, Text} from 'react-konva';
import ISignatureProps from './../Models/Components/Signature/ISignatureProps';
import ISignatureState from './../Models/Components/Signature/ISignatureState';
import Orientation from './../Models/Enums/Orientation';
import SignaturePosition from './../Models/Enums/SignaturePosition';
import Emit from "../Data/Emit";
import SignatureItem from "../Models/ArrayItems/SignatureItem";

const DEFAULT_SIGNATURE_FONT_SIZE = 11;
const DEFAULT_SMALL_SIDE_SIZE = 40;
const STILLAGE_SIZE_K = 30;
export default class Signature extends Component<ISignatureProps, ISignatureState> {

    constructor(props) {
        super(props);

        this.state = {
            isBlockScaling: this.props.isBlockScaling,
            parentScale: this.props.parentScale,
            pmCount: this.props.pmCount,
            parentKey: this.props.parentKey,
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            parentSize: this.props.parentSize,
            source: this.props.source,
        };

        this.thisForceUpdate = this.thisForceUpdate.bind(this);
        this.signatureForceUpdate = this.signatureForceUpdate.bind(this);

        Emit.Emitter.addListener('stillageSignatureForceUpdate', this.thisForceUpdate);
        Emit.Emitter.addListener('signatureForceUpdate', this.signatureForceUpdate);
    }

    public signatureForceUpdate(parentKey: string, newSource: SignatureItem) {
        if (parentKey === this.state.parentKey) {
            this.setState({ source: newSource });
        }
    }

    public get scaleK(): number {
        const { parentScale, isBlockScaling, parentOrientation } = this.state;
        if (parentScale === 1 && isBlockScaling) {

        } else if (parentScale > 1) {

        } else if (!isBlockScaling) {

        }
        return 0;
    }

    public get masterSideK(): number {
        const { pmCount, parentScale, isBlockScaling } = this.state;
        if (parentScale === 1 && isBlockScaling) {
            return 2 * parentScale;
        } else if (parentScale > 1) {
            return 2
        } else if (!isBlockScaling) {
            return 1;
        }
        return 0;
    }

    getSignatureSize = (): { width: number, height: number } => {
        const { pmCount, parentScale, isBlockScaling, parentOrientation, source } = this.state;
        if (parentScale === 1 && isBlockScaling) {
            if (parentOrientation === Orientation.HORIZONTAL) {
                if (source.position === SignaturePosition.BOTTOM) {
                    return {
                        width: STILLAGE_SIZE_K * pmCount * 2 + 1,
                        height: DEFAULT_SMALL_SIDE_SIZE * 2
                    }
                } else if (source.position === SignaturePosition.TOP) {
                    return {
                        width: STILLAGE_SIZE_K * pmCount * 2 + 1,
                        height: DEFAULT_SMALL_SIDE_SIZE * 2 - parentScale * 10
                    }
                }
            } else if (parentOrientation === Orientation.VERTICAL) {
                if (source.position === SignaturePosition.LEFT) {
                    return {
                        width: DEFAULT_SMALL_SIDE_SIZE,
                        height: STILLAGE_SIZE_K * pmCount * 2 + 1
                    }
                } else if (source.position === SignaturePosition.RIGHT) {
                    return {
                        width: DEFAULT_SMALL_SIDE_SIZE * parentScale * 2 - 5,
                        height: STILLAGE_SIZE_K * pmCount * 2
                    }
                }
            }
        } else if (parentScale > 1) {
            if (parentOrientation === Orientation.HORIZONTAL) {
                if (source.position === SignaturePosition.BOTTOM) {
                    return {
                        width: pmCount * 30 * 2 + 1,
                        height: DEFAULT_SMALL_SIDE_SIZE * parentScale * 2 - 10
                    }
                } else if (source.position === SignaturePosition.TOP) {
                    return {
                        width: pmCount * 30 * 2 + 1,
                        height: STILLAGE_SIZE_K * parentScale * 2
                    }
                }
            } else {
                if (source.position === SignaturePosition.LEFT) {
                    return {
                        width: STILLAGE_SIZE_K * parentScale * 2,
                        height: pmCount * 30 * 2 + 1
                    }
                } else if (source.position === SignaturePosition.RIGHT) {
                    return {
                        width: DEFAULT_SMALL_SIDE_SIZE * parentScale * 2 - 10,
                        height: pmCount * 30 * 2 + 1
                    }
                }
            }
        } else if (!isBlockScaling) {
            if (parentOrientation === Orientation.HORIZONTAL) {
                return {
                    width: pmCount * 30 + 1,
                    height: 40
                }
            } else {
                return {
                    width: 40,
                    height: pmCount * 30 + 1
                }
            }
        }
        return { width: 0, height: 0 };
    };

    public get signatureFont(): number {
        const { parentScale, isBlockScaling } = this.state;

        if (isBlockScaling) {
            if (parentScale > 1) {
                return DEFAULT_SIGNATURE_FONT_SIZE * parentScale;
            } else if (parentScale === 1) {
                return DEFAULT_SIGNATURE_FONT_SIZE * parentScale;
            }
        }

        return DEFAULT_SIGNATURE_FONT_SIZE;
    }

    // public get secondarySideK(): number {
    //     const { parent }
    // }

    public thisForceUpdate(parentKey: string, newParentX: number, newParentY: number) {
        if (parentKey === this.state.parentKey) {
            this.setState({ parentX: newParentX, parentY: newParentY })
        }
    };

    // public setStillageMoveEnabled(e) {
    //     Emit.Emitter.emit('setIsShapeMoving', !this.state.isMoveEnabled);
    //     this.setState({isMoveEnabled: !this.state.isMoveEnabled})
    // }

    render() {
        const { parentX, parentY, parentOrientation, parentSize, source, pmCount, isBlockScaling, parentScale } = this.state;
        let _x, _y, _width, _height = 0;
        // if (parentSize === StillageSize.NORMAL) {
        if (parentOrientation === Orientation.VERTICAL) {

            _width = this.getSignatureSize().width;
            _height = this.getSignatureSize().height;
            if (source.position === SignaturePosition.RIGHT) {
                _width += !isBlockScaling ? 5 : 0;
                _x = parentX + (isBlockScaling ? 5 * parentScale : 0);
                _y = parentY - 0.5;
            } else if (source.position === SignaturePosition.LEFT) {
                _x = parentX - (!isBlockScaling ? 15.5 : 20 * parentScale);
                _y = parentY - 0.5;
            }
        } else {

            _width = this.getSignatureSize().width;
            _height = this.getSignatureSize().height;
            if (source.position === SignaturePosition.TOP) {
                _x = parentX - 0.5;
                _y = parentY - (!isBlockScaling ? 15.5 : 20 * parentScale);
            } else if (source.position === SignaturePosition.BOTTOM) {
                _height += !isBlockScaling ? 5 : 0;
                _x = parentX - 0.5;
                _y = parentY;
            }
        }

        let block = (
            <Rect
                key={this.state.parentKey + '_signature_rect'}
                cornerRadius={4}
                x={_x}
                y={_y}
                width={_width}
                height={_height}
                fill={'#dcdcdc'}
            // onDblTap={}
            />
        );

        let _fontSize = this.signatureFont;
        if (!isBlockScaling) {
            if (parentOrientation === Orientation.HORIZONTAL) {
                if (source.position === SignaturePosition.TOP) {
                    _x = parentX + ((pmCount * 32 / 2) - (source.title.length * _fontSize / 2)) + source.title.length;
                    _y = parentY - 13;
                } else if (source.position === SignaturePosition.BOTTOM) {
                    _x = parentX + ((pmCount * 32 / 2) - (source.title.length * _fontSize / 2)) + source.title.length;
                    _y = parentY + 33;
                }
            } else if (parentOrientation === Orientation.VERTICAL) {
                if (source.position === SignaturePosition.LEFT) {
                    _x = parentX - 15;
                    _y = parentY + ((pmCount * 32 / 2) - (source.title.length * _fontSize / 2)) + source.title.length;
                    if (source.title.length === 1) {
                        _x = parentX - 11;
                    } else if (source.title.length === 2) {
                        // _y += 2;
                    } else if (source.title.length > 2) {
                        _y = parentY + 34;
                        _fontSize = 8;
                    }
                } else if (source.position === SignaturePosition.RIGHT) {
                    _y = parentY + ((pmCount * 32 / 2) - (source.title.length * _fontSize / 2)) + source.title.length;
                    if (source.title.length === 1) {
                        _x = parentX + 34;
                    } else if (source.title.length === 2) {
                        _x = parentX + 31.5;
                    } else if (source.title.length > 2) {
                        _x = parentX + 31;
                        _y = parentY + 34;
                        _fontSize = 8;
                    }
                }
            }
        } else {
            const mk = 7;
            const MAX_M = 3;
            let deltaM = MAX_M - source.title.length;
            let m1 = mk * deltaM;

            if (parentScale === 1) {
                if (parentOrientation === Orientation.VERTICAL) {
                    if (source.position === SignaturePosition.RIGHT) {
                        _x = parentX + STILLAGE_SIZE_K * 2 + m1;
                        _y = parentY + STILLAGE_SIZE_K * pmCount;
                    } else if (source.position === SignaturePosition.LEFT) {
                        _x += m1;
                        _y = parentY + STILLAGE_SIZE_K * pmCount;
                    }
                } else {
                    if (source.position === SignaturePosition.BOTTOM) {
                        _x = parentX + STILLAGE_SIZE_K * pmCount - source.title.length * 5;
                        _y = parentY + DEFAULT_SMALL_SIDE_SIZE * 2 - 15;
                    } else if (source.position === SignaturePosition.TOP) {
                        _x = parentX + STILLAGE_SIZE_K * pmCount - source.title.length * 3;
                        _y += 5;
                    }
                }
            } else if (parentScale > 1) {
                if (parentOrientation === Orientation.VERTICAL) {
                    if (source.position === SignaturePosition.RIGHT) {
                        _x = parentX + STILLAGE_SIZE_K * parentScale * 2 + parentScale + m1;
                        _y = parentY + STILLAGE_SIZE_K * pmCount;
                    } else if (source.position === SignaturePosition.LEFT) {
                        // _x = parentX - STILLAGE_SIZE_K * parentScale / 2 - parentScale;
                        _x = _x + m1;
                        _y = parentY + STILLAGE_SIZE_K * pmCount;
                    }
                } else {
                    if (source.position === SignaturePosition.BOTTOM) {
                        _x = parentX + STILLAGE_SIZE_K * pmCount - source.title.length * 5;
                        _y = parentY + DEFAULT_SMALL_SIDE_SIZE * parentScale * 2 - 17 * parentScale;
                    } else if (source.position === SignaturePosition.TOP) {
                        _x = parentX + STILLAGE_SIZE_K * pmCount - source.title.length * 7;
                        _y += parentScale * 2;
                    }
                }
            }
        }

        let title = (
            <Text
                key={this.state.parentKey + '_signature_text'}
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