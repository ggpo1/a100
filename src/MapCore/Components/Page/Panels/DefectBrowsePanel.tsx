import React from 'react';
import {IDefectBrowsePanelProps} from "../../../Models/Components/DefectBrowsePanel/IDefectBrowsePanelProps";
import IDefectBrowsePanelState from "../../../Models/Components/DefectBrowsePanel/IDefectBrowsePanelState";
import '../../../Css/DefectBrowsePanel.css';
import Emit from "../../../Data/Emit";
import DefectColors from "../../../Models/Enums/Colors/DefectColors";

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
                            <div>
                                <div className={'info-text info-title'}>Ряд</div>
                                <div className={'info-text info-value'}>1</div>
                            </div>
                            <div>
                                <div className={'info-text info-title'}>Место</div>
                                <div className={'info-text info-value'}>6</div>
                            </div>
                            <div>
                                <div className={'info-text info-title'}>Уровень</div>
                                <div className={'info-text info-value'}>6</div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Элемент</div>
                                <div className={'info-text info-value'}>Стойка</div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Размер</div>
                                <div className={'info-text info-value'}>100x70x5000</div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Уровень риска</div>
                                <div style={{ background: DefectColors.GREEN }} className={'circle circle-text'}>зеленый</div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Тип дефекта</div>
                                <div className={'info-text info-value'}>Повреждение</div>
                            </div>
                            <div></div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Производитель</div>
                                <div className={'info-text info-value'}>МетОриентир</div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Дата обнаружения</div>
                                <div className={'info-text info-value'}>10.12.2019</div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Элемент заменен</div>
                                <div className={'info-text info-value'}>
                                    <input type="checkbox" checked />
                                </div>
                            </div>
                            <div className={'columned'}>
                                <div className={'info-text info-title'}>Дата замены</div>
                                <div className={'info-text info-value'}>10.12.2019</div>
                            </div>
                    </div>
                    <div className={'content-second'}>
                        <div className={'comment-block'}>
                            <div><div className={'info-text info-title'}>Комментарий</div></div>
                            <div><div className={'info-text info-value'}>
                                Ryan Adams, whose new album Prisoner is out this Friday, was the latest guest on Marc Maron’s podcast “WTF.” Adams discussed encountering the Rolling Stones early in his career (and talking penny
                            </div></div>
                        </div>
                        <div className={'gallery-block'}>

                        </div>
                    </div>
                    <div className={'footer'}>
                        <div className={'footer-left label'}>
                            <div>Добавить повреждение</div>
                        </div>
                        <div className={'footer-right'}>
                            <div className={'button button-label'}>
                                <button className={'button-label'}>Заменить поврежденный элемент</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => { this.closePanel() }} className={'close-block'}>

                </div>
            </div>
        );
    }
}