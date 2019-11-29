import React from 'react';
import IElementsPanelProps from "../../../Models/Components/ElementsPanel/IElementsPanelProps";
import IElementsPanelState from "../../../Models/Components/ElementsPanel/IElementsPanelState";
import '../../../Css/ElementsPanel.css'
import stillageBigHor from "../../../Assets/compStillage.png";

export default class ElementsPanel extends React.Component<IElementsPanelProps, IElementsPanelState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            selectedCategory: -1,
        }
    }

    public categoryTitleClickHandler(num) {
        this.setState(
            { ...this.state, ...{ selectedCategory: num } }
        );
    }

    render() {
        const { source, selectedCategory } = this.state;
        let content;
        let categories: Array<JSX.Element> = [];
        let elements: Array<JSX.Element> = [];

        categories.push(
            <div onClick={() => this.categoryTitleClickHandler(-1)} className={'category-tab-title' + (selectedCategory === -1 ? ' selected-text' : '')}>
                Все
            </div>
        );

        source.forEach((el, i) => {
            categories.push(
                <div onClick={() => this.categoryTitleClickHandler(i)} className={'category-tab-title' + (selectedCategory === i ? ' selected-text' : '')}>
                    { el.title }
                </div>
            );
        });

        if (selectedCategory !== -1) {
            source[selectedCategory].elements.forEach(el => {
                elements.push(
                    <img
                        title={el.title}
                        alt={el.title!}
                        draggable={true}
                        style={{ width: 'auto', height: '40px', cursor: 'pointer' }}
                        src={el.photo}
                    />
                );
            });
        } else {
            for (let i = 0; i < source.length; i++) {
                source[i].elements.forEach(el => {
                    elements.push(
                        <img
                            title={el.title}
                            alt={el.title!}
                            draggable={true}
                            style={{ width: 'auto', height: '40px', cursor: 'pointer' }}
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
                        { categories }
                    </div>
                    <div className={'category-elements-wrapper'}>
                        { elements }
                    </div>
                    <div className={'category-elements-footer'}>
                        <span className={'selected-text'}>свернуть</span>
                    </div>
                </div>
            </div>
        );

        return content;
    }
}