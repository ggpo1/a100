import React, { useState } from 'react';
import queryString from 'query-string';
import DataGrid from '../components/DataGrid/DataGrid';
import LogType from '../model/enums/LogType';
import LogHandler from '../../LogHandler/LogHandler';
import SeparatedDataAPI from '../api/SeparatedDataAPI';
import IDataGridSource from '../components/DataGrid/models/sources/IDataGridSource';
import DefectsGridData from '../data/DefectsGridData';
import Emit from './../../MapCore/Data/Emit';
import HeaderItem from './../components/DataGrid/models/HeaderItem';
import IPageItem from './../components/DataGrid/models/IPageItem';
import ViewType from './../model/enums/ViewType';
import PagerEmitGenerator from './../data/PagerEmitGenerator';

interface IDefectElementItem {
	elementId: number,
	elementName: string,
	format: string
}

interface IDefectType {
	defectId: number,
	defectName: string
}

interface IDefectsViewState {
	resoultID: number,
	datagridSource: IDataGridSource,
	defectElements: Array<IDefectElementItem>,
	defectTypes: Array<IDefectType>
}

interface IDefectsViewProps {
	match: any
    location: any
}

export default class DefectsView extends React.Component<IDefectsViewProps, IDefectsViewState> {

	constructor(props: IDefectsViewProps) {
		super(props);
		let url = this.props.location.search;	
		let urlParams = queryString.parse(url);
		try {
			LogHandler.handle('MapView', LogType.LOG, 'url params parsed successfully!');
			this.state = {
				resoultID: parseInt(urlParams['resoultID']!.toString()),
				datagridSource: {	
					headers: [
						
					],
					pages: [
						
					]
				},
				defectElements: [],
				defectTypes: []
			};
			
		} catch (e) {
			LogHandler.handle('MapView', LogType.ERROR, 'error while parsing parameters or they are empty!');
		}

		Emit.Emitter.addListener('setDefectsViewDatagridHeaders', this.setDatagridHeaders);
		Emit.Emitter.addListener('setDefectsViewDatagridPages', this.setDatagridPages);
		Emit.Emitter.addListener('setDefectsElements', this.setDefectsElements);
		Emit.Emitter.addListener('setDefectTypes', this.setDefectTypes);

		
		Emit.Emitter.addListener(PagerEmitGenerator.generate(ViewType.DEFECTS_VIEW), this.pagerRequester);

	}

	public pagerRequester = (requestedPage: number) => {
		(async () => await SeparatedDataAPI.getSeparatedDefects(this.state.resoultID, requestedPage))(); // смена страниц
	}

	public setDatagridHeaders = (newHeaders: Array<HeaderItem>) => {
		let _gSource = this.state.datagridSource;
		_gSource.headers = newHeaders;
		Emit.Emitter.emit('setDataGridHeaderSource', _gSource.headers);
		this.setState({ datagridSource: _gSource });
	};

	public setDefectsElements = (newDefectsElements: Array<IDefectElementItem>) => {
		this.setState({ defectElements: newDefectsElements });
	}

	public setDefectTypes = (newDefectTypes: Array<IDefectType>) => {
		this.setState({ defectTypes: newDefectTypes });
	}

	public setDatagridPages = (data: Array<any>, page: number) => {
		let newPage: IPageItem = {
			page: page,
			rows: data
		}
		// подстановка значений	вместо айдишников
		for (let i = 0; i < data.length; i++) {
			data[i]['ElementID'] = this.getElementName(data[i]['ElementID']);
			data[i]['DefectID'] = this.getDefectType(data[i]['DefectID']);
			data[i]['RiskLevelID'] = this.getDefectColor(data[i]['RiskLevelID'])
		}

		let _gSource = this.state.datagridSource;
		_gSource.pages.push(newPage);
		this.setState({ datagridSource: _gSource });
	}

	componentDidMount() {
		// запросы на получение первоначальных данных проекта
		(async () => await SeparatedDataAPI.getElements())();
		(async () => await SeparatedDataAPI.getDefectTypes())();
		(async () => await SeparatedDataAPI.getDefectsHeaders())();
		(async () => await SeparatedDataAPI.getSeparatedDefects(this.state.resoultID, 0))();
	}

	public getElementName = (value: number): string => {
		return this.state.defectElements.filter(el => el.elementId === value)[0].elementName;
	}

	public getDefectType = (value: number): string => {
		return this.state.defectTypes.filter(el => el.defectId === value)[0].defectName;
	} 

	public getDefectColor = (value: number): string => {
		if (value === 1) 
			return 'Зелёный';
		else if (value === 2) 
			return 'Жёлтый';
		else if (value === 3) 
			return 'Красный';
		
		return '';
	}

	render() {
		return (
			<div className={'defectsview-wrapper'}>
				<DataGrid viewType={ViewType.DEFECTS_VIEW} source={this.state.datagridSource} />
			</div>
		);
	}
}

