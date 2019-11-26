import React, { Component } from 'react';
import '../../Css/ComponentsMenuBar.css';
import stillage from "../../Assets/compStillage.png";

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
                    <div draggable style={{  }} className="comp-title">
                       <img draggable width={'100%'} height={'auto'} src={stillage} alt=""/>
                    </div>
                    
                </div>
            </div>
        );
    }
}