import React from 'react';

import '../../../Css/AddLayerSubModal.css';
import IAddLayerSubModalProps from "../../../Models/Components/AddLayerSubModal/IAddLayerSubModalProps";
import IAddLayerSubModalState from "../../../Models/Components/AddLayerSubModal/IAddLayerSubModalState";

export default class AddLayerSubModal extends React.Component<IAddLayerSubModalProps, IAddLayerSubModalState> {
    constructor(props) {
        super(props);

    }

    render() {
        return (<div className={'wrapper'}>
            <div className={'sub-modal'}>
                <div>

                </div>
                <div>

                </div>
                <div>
                    <div>
                        <div style={{
                            height: 'auto'
                        }}>добавить</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}