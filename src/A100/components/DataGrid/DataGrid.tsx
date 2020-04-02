import React, { useState } from 'react';
import GridHeader from './components/GridHeader';
import GridContent from './components/GridContent';
import IDataGridState from './models/components/DataGrid/IDataGridState';
import IDataGridProps from './models/components/DataGrid/IDataGridProps';

import './css/DataGrid.css';
// import { IGridHeaderSource } from './models/sources/IDataGridSource';


function DataGrid(props: IDataGridProps) {
	const [source, setSource] = useState<typeof props.source>(props.source);
	
	// let headerSource: IGridHeaderSource = {
	// 	source: source.headers
	// };

	return (
		<div className={'datagrid-wrapper'}>
			<div className={'grid-header'}>
				<GridHeader source={source.headers} />
			</div>
			<div className={'grid-content'}>
				<GridContent  />
			</div>
			<div className={'grid-pager'}>
				
			</div>
		</div>
	);
}

export default DataGrid;