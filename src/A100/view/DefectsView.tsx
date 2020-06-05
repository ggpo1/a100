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
	defectTypes: Array<IDefectType>,
	wholeDefects: Array<any>
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
			this.state = {
				resoultID: parseInt(urlParams['resoultID']!.toString()),
				datagridSource: {	
					headers: [],
					pages: []
				},
				defectElements: [],
				defectTypes: [],
				wholeDefects: []
			};
			LogHandler.handle('DefectsView', LogType.LOG, 'url params parsed successfully!');
		} catch (e) {
			LogHandler.handle('DefectsView', LogType.ERROR, 'error while parsing parameters or they are empty!');
		}

		Emit.Emitter.addListener('setDefectsViewDatagridHeaders', this.setDatagridHeaders);
		Emit.Emitter.addListener('setDefectsViewDatagridPages', this.setDatagridPages);
		Emit.Emitter.addListener('setDefectsElements', this.setDefectsElements);
		Emit.Emitter.addListener('setDefectTypes', this.setDefectTypes);
		Emit.Emitter.addListener('setWholeDefects', this.setWholeDefects);
		
		Emit.Emitter.addListener(PagerEmitGenerator.generate(ViewType.DEFECTS_VIEW), this.pagerRequester);

	}

	public firstLetterTLC = (key: string) => {
		return (`${key[0].toLowerCase()}${key.slice(1)}`);
	}

	public pagerRequester = (requestedPage: number) => {
		if (this.state.datagridSource.pages.filter(el => el.page === requestedPage).length === 0) // проверка на то, что страница была ранее загружена
			(async () => await SeparatedDataAPI.getSeparatedDefects(this.state.resoultID, requestedPage))(); // смена страниц
	}

	public setDatagridHeaders = (newHeaders: Array<HeaderItem>) => {
		let _gSource = this.state.datagridSource;
		_gSource.headers = newHeaders;
		Emit.Emitter.emit('setDataGridHeaderSource', _gSource.headers);
		this.setState({ datagridSource: _gSource });
	};

	public setWholeDefects = (newWholeDefects: Array<any>) => {
		// подстановка значений	вместо айдишников
		for (let i = 0; i < newWholeDefects.length; i++) {
			newWholeDefects[i]['elementID'] = this.getElementName(newWholeDefects[i]['elementID']);
			newWholeDefects[i]['defectID'] = this.getDefectType(newWholeDefects[i]['defectID']);
			newWholeDefects[i]['riskLevelID'] = this.getDefectColor(newWholeDefects[i]['riskLevelID'])
		}
		// console.log(newWholeDefects);

		Emit.Emitter.emit('setWholeData', newWholeDefects);
		this.setState({ wholeDefects: newWholeDefects });
	}

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
			data[i]['elementID'] = this.getElementName(data[i]['elementID']);
			data[i]['defectID'] = this.getDefectType(data[i]['defectID']);
			data[i]['riskLevelID'] = this.getDefectColor(data[i]['riskLevelID'])
		}

		let _gSource = this.state.datagridSource;
		_gSource.pages.push(newPage);
		this.setState({ datagridSource: _gSource });
	}

	componentDidMount() {
		// запросы на получение первоначальных данных проекта
		(async () => {
			await SeparatedDataAPI.getElements();
			await SeparatedDataAPI.getDefectTypes();
			await SeparatedDataAPI.getDefectsHeaders();
			await SeparatedDataAPI.getSeparatedDefects(this.state.resoultID, 0);
			await SeparatedDataAPI.getWholeDefects(this.state.resoultID);
		})();
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
				<DataGrid wholeData={this.state.wholeDefects} viewType={ViewType.DEFECTS_VIEW} source={this.state.datagridSource} />
			</div>
		);
	}
}

