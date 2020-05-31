import React, { useState } from 'react';
import queryString from 'query-string';
import DataGrid from '../components/DataGrid/DataGrid';
import LogType from '../model/enums/LogType';
import LogHandler from '../../LogHandler/LogHandler';
import SeparatedDataAPI from '../api/SeparatedDataAPI';
import IDataGridSource from '../components/DataGrid/models/sources/IDataGridSource';
import DefectsGridData from '../data/DefectsGridData';

interface IDefectsViewState {
	resoultID: number,
	datagridSource: IDataGridSource
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
				}
			};
			
		} catch (e) {
			LogHandler.handle('MapView', LogType.ERROR, 'error while parsing parameters or they are empty!');
		}
	}
	componentDidMount() {
		let headers = (async () => await SeparatedDataAPI.getDefectsHeaders());
		headers().then((datagridSource: any) => {
			DefectsGridData.DefectsHeaders = datagridSource;
			// console.log(DefectsGridData.DefectsHeaders);
		});
		// console.log(DefectsGridData.DefectsHeaders);
	}

	render() {
		console.log(DefectsGridData.DefectsHeaders)
		return (
			<div className={'defectsview-wrapper'}>
				<DataGrid source={this.state.datagridSource} />
			</div>
		);
	}
}

