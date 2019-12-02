import React from 'react';
import IElementsPanelProps from "../../../Models/Components/ElementsPanel/IElementsPanelProps";
import IElementsPanelState from "../../../Models/Components/ElementsPanel/IElementsPanelState";
import '../../../Css/ElementsPanel.css'
import stillageBigHor from "../../../Assets/compStillage.png";
import ElementItem from "../../../Models/ArrayItems/ElementItem";
import AppState from "../../../Data/AppState";

export default class ElementsPanel extends React.Component<IElementsPanelProps, IElementsPanelState> {

    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            selectedCategory: -1,
            isToggled: true,
        };

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
        // console.log(el.stillageType!);
        AppState.State.selectedEl = el;
    }

    render() {
        const { source, selectedCategory, isToggled } = this.state;
        let content;
        let categories: Array<JSX.Element> = [];
        let elements: Array<JSX.Element> = [];

        if (!isToggled) {
            categories.push(
                <div onClick={() => this.categoryTitleClickHandler(-1)}
                     className={'category-tab-title' + (selectedCategory === -1 ? ' selected-text' : '')}>
                    Все
                </div>
            );

            source.forEach((el, i) => {
                categories.push(
                    <div onClick={() => this.categoryTitleClickHandler(i)}
                         className={'category-tab-title' + (selectedCategory === i ? ' selected-text' : '')}>
                        {el.title}
                    </div>
                );
            });

            if (selectedCategory !== -1) {
                source[selectedCategory].elements.forEach(el => {
                    elements.push(
                        <img
                            onMouseDown={() => {
                                this.elementMouseDownHandler(el)
                            }}
                            title={el.title!}
                            alt={el.title!}
                            draggable={true}
                            style={{width: 'auto', height: '40px', cursor: 'pointer', padding: 2}}
                            src={el.photo}
                        />
                    );
                });
            } else {
                for (let i = 0; i < source.length; i++) {
                    source[i].elements.forEach(el => {
                        elements.push(
                            <img
                                onMouseDown={() => {
                                    this.elementMouseDownHandler(el)
                                }}
                                title={el.title!}
                                alt={el.title!}
                                draggable={true}
                                style={{width: 'auto', height: '40px', cursor: 'pointer', padding: 2}}
                                src={el.photo}
                            />
                        );
                    });
                }
            }

            content = (
                <div className={'elements-panel-wrapper'}>
                    <div className={'inner-wrapper'}>
                        <div className={'category-tabs-wrapper'}>
                            {categories}
                        </div>
                        <div className={'category-elements-wrapper'}>
                            {elements}
                        </div>
                        <div className={'category-elements-footer'}>
                            <span style={{ cursor: 'pointer' }} onClick={() => {
                                this.setState({...this.state, ...{isToggled: true}})
                            }} className={'selected-text'}>свернуть</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            content = (
                <div className={'elements-panel-wrapper-toggled'}>
                    <div className={'inner-wrapper-toggled'}>
                         <span onClick={() => {
                             this.setState({...this.state, ...{isToggled: false}})
                         }} style={{ height: '40%', cursor: 'pointer' }} className={'selected-text'}>открыть панель элементов</span>
                    </div>
                </div>
            );
        }
        return content;
    }
}