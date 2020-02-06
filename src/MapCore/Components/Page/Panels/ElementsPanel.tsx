import React from 'react';
import IElementsPanelProps from "../../../Models/Components/ElementsPanel/IElementsPanelProps";
import IElementsPanelState from "../../../Models/Components/ElementsPanel/IElementsPanelState";
import '../../../Css/ElementsPanel.css'
import ElementItem from "../../../Models/ArrayItems/ElementItem";
import AppState from "../../../Data/AppState";
import Emit from "../../../Data/Emit";
import LayerType from "../../../Models/Enums/LayerType";


export default class ElementsPanel extends React.Component<IElementsPanelProps, IElementsPanelState> {

    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            selectedCategory: -1,
            isToggled: true,
            selectedElementIndex: '',
        };

        Emit.Emitter.addListener('borderCleanAction', () => { this.setState({selectedElementIndex: ''}) });
        this.categoryTitleClickHandler = this.categoryTitleClickHandler.bind(this);

    }

    // обработчик события нажатия на вкладку категории
    public categoryTitleClickHandler(num) {
        this.setState(
            { ...this.state, ...{ selectedCategory: num } }
        );
    }

    // обработчик события mouseDown по элементу в панеле
    public elementMouseDownHandler(el: ElementItem) {
        AppState.State.selectedEl = el;
    }

    public elementMouseClickHandler(index: string, el: ElementItem) {
        AppState.State.selectedEl = el;
        if (el.type === LayerType.WALLS) {
            Emit.Emitter.emit('checkWallLayer');
        }
        if (el.type !== LayerType.WALLS) {
            Emit.Emitter.emit('setAddCirclesVisibility');
        }
        // let check = index === this.state.selectedElementIndex;
        this.setState({selectedElementIndex: index});
        // if (check) {
            Emit.Emitter.emit('cncFlagChange');
        // }
    }

    render() {
        const { source, selectedCategory, isToggled } = this.state;
        let content;
        let categories: Array<JSX.Element> = [];
        let elements: Array<JSX.Element> = [];

        if (!isToggled) {
            categories.push(
                <div
                    key={'category_title_all'}
                    onClick={() => this.categoryTitleClickHandler(-1)}
                     className={'category-tab-title' + (selectedCategory === -1 ? ' selected-text' : '')}>
                    все
                </div>
            );

            source.forEach((el, i) => {
                categories.push(
                    <div
                        key={'category_title_' + el.title + '_' + i}
                        onClick={() => this.categoryTitleClickHandler(i)}
                         className={'category-tab-title' + (selectedCategory === i ? ' selected-text' : '')}>
                        {el.title}
                    </div>
                );
            });

            if (selectedCategory !== -1) {
                source[selectedCategory].elements.forEach((el, i) => {
                    elements.push(
                        <img
                            key={"el_img_" + selectedCategory + "_" + i}
                            onClick={() => {
                                this.elementMouseClickHandler(("el_img_" + selectedCategory + "_" + i), el);
                            }}
                            onMouseDown={() => {
                                this.elementMouseDownHandler(el)
                            }}
                            title={el.title!}
                            alt={el.title!}
                            draggable={true}
                            style={{
                                width: 'auto',
                                height: '40px',
                                cursor: 'pointer',
                                padding: 2,
                                border: this.state.selectedElementIndex === ("el_img_" + selectedCategory + "_" + i) ? '2px solid #ffa500' : '',
                                borderRadius: 5
                            }}
                            src={el.photo}
                        />
                    );
                });
            } else {
                // let _elements: Array<ElementItem> = [];
                // for (let sourceEl of source) {
                //     for (let el of sourceEl.elements) {
                //         _elements.push(el);
                //     }
                // }

                for (let i = 0; i < source.length; i++) {
                    source[i].elements.forEach((el, j) => {
                        elements.push(
                            <img
                                key={"el_img_" + i + "_" + j}
                                onClick={() => {
                                    this.elementMouseClickHandler(("el_img_" + i + "_" + j), el);
                                }}
                                onMouseDown={() => {
                                    this.elementMouseDownHandler(el)
                                }}
                                title={el.title!}
                                alt={el.title!}
                                draggable={true}
                                style={{
                                    width: 'auto',
                                    height: '40px',
                                    cursor: 'pointer',
                                    padding: 2,
                                    border: this.state.selectedElementIndex === ("el_img_" + i + "_" + j) ? '2px solid #ffa500' : '',
                                    borderRadius: 5
                                }}
                                src={el.photo}
                            />
                        );
                    });
                }
            }

            content = (
                <div id={'elements-panel'} className={'elements-panel-wrapper'}>
                    <div className={'inner-wrapper'}>
                        <div className={'category-tabs-wrapper'}>
                            {categories}
                        </div>
                        <div className={'category-elements-wrapper'}>
                            {elements}
                        </div>
                        <div onClick={() => {
                            this.setState({...this.state, ...{isToggled: true}})
                        }} className={'category-elements-footer'}>
                            <span style={{ cursor: 'pointer' }} className={'selected-text'}>свернуть</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            content = (
                <div id={'elements-panel'} onClick={() => {
                    this.setState({...this.state, ...{isToggled: false}})
                }} className={'elements-panel-wrapper-toggled'}>
                    <div className={'inner-wrapper-toggled'}>
                         <span style={{ height: '40%', }} className={'selected-text'}>открыть панель элементов</span>
                    </div>
                </div>
            );
        }
        return content;
    }
}