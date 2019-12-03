import React from 'react';
import {IDefectBrowsePanelProps} from "../../../Models/Components/DefectBrowsePanel/IDefectBrowsePanelProps";
import IDefectBrowsePanelState from "../../../Models/Components/DefectBrowsePanel/IDefectBrowsePanelState";
import '../../../Css/DefectBrowsePanel.css';
import Emit from "../../../Data/Emit";

export default class DefectBrowsePanel extends React.Component<IDefectBrowsePanelProps, IDefectBrowsePanelState> {
    constructor(props) {
        super(props);
        let width = window.innerWidth;
        this.state = {
            panelWidthPer: '0',
            fullWidthPx: width,
            isResize: false,
        };

    }

    public closePanel() {
        Emit.Emitter.emit('defectBrowsePanelWorkerHandle', false);
    }

    render() {
        return (
            <div className={'wrapper'}>
                <div style={{ marginLeft: "-" + this.state.panelWidthPer + "px" }} className={'panel'}>
                    <div className={'header'}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={'content'}>

                    </div>
                    <div className={'footer'}></div>
                </div>
                <div onClick={() => { this.closePanel() }} className={'close-block'}>

                </div>
            </div>
        );
    }
}