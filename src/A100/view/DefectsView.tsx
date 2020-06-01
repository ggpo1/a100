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
		// Emit.Emitter.addListener('defectsTestEmit', this.test);
		
		// this.setDatagridHeaders(this.state.datagridSource.headers);
	}

	// public test = (name: Array<HeaderItem>) => console.log(`hello, ${name}`);

	public setDatagridHeaders = (newHeaders: Array<HeaderItem>) => {
		console.log(newHeaders);
		let _gSource = this.state.datagridSource;
		_gSource.headers = newHeaders;

		Emit.Emitter.emit('setDataGridHeaderSource', _gSource.headers);
		this.setState({ datagridSource: _gSource });
	};

	public setDefectsElements = (newDefectsElements: Array<IDefectElementItem>) => {
		// console.log(newDefectsElements);
		this.setState({ defectElements: newDefectsElements });
	}

	public setDefectTypes = (newDefectTypes: Array<IDefectType>) => {
		// console.log(newDefectTypes);
		this.setState({ defectTypes: newDefectTypes });
	}

	public setDatagridPages = (data: Array<any>) => {
		console.log(data);
		// console.log(this.state.defectElements);
		let newPage: IPageItem = {
			page: 0,
			rows: data
		}
		let _gSource = this.state.datagridSource;
		_gSource.pages.push(newPage);
		// this.state.datagridSource.headers.forEach((el, i) => {  });
		this.setState({ datagridSource: _gSource });

	}

	componentDidMount() {
		(async () => await SeparatedDataAPI.getElements())();
		(async () => await SeparatedDataAPI.getDefectTypes())();
		(async () => await SeparatedDataAPI.getDefectsHeaders())();
		(async () => await SeparatedDataAPI.getSeparatedDefects(5020, 1))();
		// headers().then((datagridSource: any) => {
		// 	DefectsGridData.DefectsHeaders = datagridSource;
		// 	console.log(DefectsGridData.DefectsHeaders);
		// });
		// console.log(DefectsGridData.DefectsHeaders);
	}

	render() {
		// console.log(DefectsGridData.DefectsHeaders)
		return (
			<div className={'defectsview-wrapper'}>
				<DataGrid source={this.state.datagridSource} />
			</div>
		);
	}
}

