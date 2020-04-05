import React, { useState } from 'react';

import '../css/GridContent.css';
import IDataGridProps from '../models/components/DataGrid/IDataGridProps';

interface IGridContentProps {
	source: IDataGridProps
}

function GridContent(props: IDataGridProps) {
	const [source, setSource] = useState<typeof props.source>(props.source);
	
	console.log(source)

	let rowsEls: Array<JSX.Element> = [];
	source.headers.forEach(element => {
		let rowsCellsEls: Array<JSX.Element> = [];
		source.pages[0].rows.forEach(element => {
			
		});
	});

	return (
		<div className={'grid-block gridcontent-wrapper'}>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
		</div>
	);
}

export default GridContent;