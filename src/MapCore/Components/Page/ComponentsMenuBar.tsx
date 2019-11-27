import React, { Component } from 'react';
import '../../Css/ComponentsMenuBar.css';
import MenuBarElement from './MenuBarElement';
import LayerType from './../../Models/Enums/LayerType';

export default class ComponentsMenuBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ background: '#E0E0E0' }} className="menubar-wrapper">
                <div style={{ background: '' }} className="comp-header-title">
                    <span style={{ height: '50%' }}>Элементы</span>
                </div>
                <div style={{ background: '' }} className="comp-content">
                    <MenuBarElement source={
                        {
                            title: 'Стеллаж',
                            type: LayerType.STILLAGES,
                        }
                    } />
                    <MenuBarElement source={
                        {
                            title: 'Стена',
                            type: LayerType.WALLS,
                        }
                    } />
                </div>
            </div>
        );
    }
}