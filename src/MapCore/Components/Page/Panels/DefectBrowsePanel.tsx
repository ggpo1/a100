import React from 'react';
import {IDefectBrowsePanelProps} from "../../../Models/Components/DefectBrowsePanel/IDefectBrowsePanelProps";
import IDefectBrowsePanelState from "../../../Models/Components/DefectBrowsePanel/IDefectBrowsePanelState";
import '../../../Css/DefectBrowsePanel.css';
import Emit from "../../../Data/Emit";
import DefectColors from "../../../Models/Enums/Colors/DefectColors";
import Images from "../../../Data/Images";

export default class DefectBrowsePanel extends React.Component<IDefectBrowsePanelProps, IDefectBrowsePanelState> {
    constructor(props) {
        super(props);
        let width = window.innerWidth;

        let selected: number = 0;
        this.props.parentSource.viks.forEach((el, i) => {
            if (JSON.stringify(el) === JSON.stringify(this.props.source)) selected = i;
        });

        this.state = {
            selectedPage: selected,
            parentSource: this.props.parentSource,
            source: this.props.source,
            panelWidthPer: '0',
            fullWidthPx: width,
            isResize: false,
            isPhotoWatcher: false,
            selectedPhoto: this.props.source!.defectPhotos[0]
        };



    }

    public getCurrentDate(date: Date): string {
        return date.getDate() + '.' + date.getMonth()+1 + '.' + date.getFullYear();
    }

    public get colorTitle(): { title: string, color: string } {
        const { source } = this.state;
        if (source!.color === DefectColors.GREEN) return { title: 'зелёный', color: 'black' };
        if (source!.color === DefectColors.YELLOW) return { title: 'жёлтый', color: 'white' };
        if (source!.color === DefectColors.RED) return { title: 'красный', color: 'white' };
        return { title: '', color: '' };
    }

    public closePanel() {
        Emit.Emitter.emit('defectBrowsePanelWorkerHandle', false);
    }

    render() {
        const { source, parentSource } = this.state;

        let pagerPages: Array<JSX.Element> = [];
        let pageNum = 1;
        parentSource.viks.forEach((el, i) => {
            if (source!.place === el.place) {
                pagerPages.push(
                    <div
                        style={{
                            color: this.state.selectedPage === i ? '#5933ff' : '#6B737C',
                            cursor: 'pointer'
                        }}
                        onClick={() => this.setState({ source: this.state.parentSource.viks[i], selectedPage: i })}
                        key={'pageNumTitle_' + pageNum}>
                        {pageNum}
                    </div>
                );
                pageNum++;
            }
        });

        let pager;
        if (pagerPages.length !== 1) {
            pager = (
                <div className={'pager'}>
                    {pagerPages}
                </div>
            );
        }

        let wrapper = (
            <div className={'wrapper'}>
                <div style={{ marginLeft: "-" + this.state.panelWidthPer + "px" }} className={'panel'}>
                    <div className={'header'}>
                        <div>
                            <div><img onClick={() => { this.closePanel() }} src={Images.closeShape} alt=""/></div>
                            <div>Повреждение</div>
                        </div>
                        <div>
                            Всего: {pageNum-1}
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className={'content'}>
                        <div>
                            <div className={'info-text info-title'}>Ряд</div>
                            <div className={'info-text info-value'}>{source!.row}</div>
                        </div>
                        <div>
                            <div className={'info-text info-title'}>Место</div>
                            <div className={'info-text info-value'}>{source!.place}</div>
                        </div>
                        <div>
                            <div className={'info-text info-title'}>Уровень</div>
                            <div className={'info-text info-value'}>{source!.level}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Элемент</div>
                            <div className={'info-text info-value'}>{source!.elementName}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Размер</div>
                            <div className={'info-text info-value'}>{source!.elementSize}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Уровень риска</div>
                            <div style={{ background: source!.color, color: this.colorTitle.color }} className={'circle circle-text'}>{this.colorTitle.title}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Тип дефекта</div>
                            <div className={'info-text info-value'}>{source!.defectType}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Производитель</div>
                            <div className={'info-text info-value'}>{source!.elementManufacturer}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Дата обнаружения</div>
                            <div className={'info-text info-value'}>{source!.defectDate.split(' ')[0]}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Элемент заменен</div>
                            <div className={'info-text info-value'}>
                                {source!.isRepaired ? 'Да' : 'Нет'}
                            </div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Дата замены</div>
                            <div className={'info-text info-value'}>{source!.repairDate.split(' ')[0]}</div>
                        </div>
                        <div className={'columned'}>
                            <div className={'info-text info-title'}>Остаток комплектующих для замены</div>
                            <div className={'info-text info-value'}>{source!.detailsCount}</div>
                        </div>
                        <div className={'columned comment-block'}>
                            <div style={{ width: '95%' }} className={'info-text info-title'}>Комментарий</div>
                            <div style={{ width: '95%' }} className={'info-text info-value'}>{source!.comment}</div>
                        </div>
                    </div>
                    <div className={'content-second'}>
                        <div>
                            <div>
                                <div className={'info-text info-title'}>Повреждение до ремонта</div>
                                <div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 0})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.defectPhotos[0] !== undefined ? "data:image/png;base64," + this.state.source!.defectPhotos[0] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 1})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.defectPhotos[1] !== undefined ? "data:image/png;base64," + this.state.source!.defectPhotos[1] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 2})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.defectPhotos[2] !== undefined ? "data:image/png;base64," + this.state.source!.defectPhotos[2] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 3})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.defectPhotos[3] !== undefined ? "data:image/png;base64," + this.state.source!.defectPhotos[3] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 4})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.defectPhotos[4] !== undefined ? "data:image/png;base64," + this.state.source!.defectPhotos[4] : '') +')' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className={'info-text info-title'}>Повреждение после ремонта</div>
                                <div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 0})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.repairsPhotos[0] !== undefined ? "data:image/png;base64," + this.state.source!.repairsPhotos[0] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 1})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.repairsPhotos[1] !== undefined ? "data:image/png;base64," + this.state.source!.repairsPhotos[1] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 2})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.repairsPhotos[2] !== undefined ? "data:image/png;base64," + this.state.source!.repairsPhotos[2] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 3})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.repairsPhotos[3] !== undefined ? "data:image/png;base64," + this.state.source!.repairsPhotos[3] : '') +')' }}></div>
                                    <div
                                        onClick={() => this.setState({isPhotoWatcher: true, selectedPhoto: 4})}
                                        style={{ backgroundImage: 'url('+ (this.state.source!.repairsPhotos[4] !== undefined ? "data:image/png;base64," + this.state.source!.repairsPhotos[4] : '') +')' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {pager}
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
                <div onClick={() => { this.closePanel() }} className={'close-block'}></div>
            </div>
        );

        let photoWatcher;
        if (this.state.isPhotoWatcher) {
            photoWatcher = [
                <div className={'photo-watcher'} onClick={() => this.setState({isPhotoWatcher: false})}>

                </div>,
                <div
                    style={{ opacity: 1,  }}
                    onClick={() => this.setState({isPhotoWatcher: false})}
                    className={'photo-watcher-photo'}>
                    <img src={(this.state.source!.defectPhotos[0] !== undefined ? "data:image/png;base64," + this.state.source!.defectPhotos[this.state.selectedPhoto] : '')} />
                </div>
            ];
        }

        return [wrapper, photoWatcher];
    }
}