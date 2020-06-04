import React from 'react';
import '../../css/WMS/AddressSettingsView.css';


interface IAddressSettingsViewProps {
    resoultID: number,

}

export default class AddressSettingsView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={'address-settings-view-wrapper'}>
                <div className={'view-header'}>
                    <b>Настройки адресации</b>
                </div>
                <div className={'view-content'}>
                    
                </div>
            </div>
        );
    }
}