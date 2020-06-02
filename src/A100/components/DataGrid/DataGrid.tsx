import React, { useState } from 'react';
import GridHeader from './components/GridHeader';
import GridContent from './components/GridContent';
import IDataGridState from './models/components/DataGrid/IDataGridState';
import IDataGridProps from './models/components/DataGrid/IDataGridProps';

import './css/DataGrid.css';
import GridPager from './components/GridPager';
import ViewType from './../../model/enums/ViewType';


function DataGrid(props: IDataGridProps) {
	const [source, setSource] = useState<typeof props.source>(props.source);
	const [viewType] = useState<ViewType>(props.viewType);
	
	// let headerSource: IGridHeaderSource = {
	// 	source: source.headers
	// };

	return (
		<div className={'datagrid-wrapper'}>
			<div className={'grid-header'}>
				<GridHeader source={source.headers} />
			</div>
			<div className={'grid-content'}>
				<GridContent wholeData={props.wholeData} viewType={viewType} source={source} />
			</div>
			<div className={'grid-pager'}>
				<GridPager viewType={viewType} pages={1000} />
			</div>
		</div>
	);
}

export default DataGrid;