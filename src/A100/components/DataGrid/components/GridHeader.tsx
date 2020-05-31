import React, { useState } from 'react';

import IGridHeaderProps from '../models/components/GridHeader/IGridHeaderProps';

import '../css/GridHeader.css';


function GridHeader(props: IGridHeaderProps) {
	const [source, setSource] = useState<typeof props.source>(props.source),
		  [sortingHeaders, setSortingHeaders] = useState<Array<number>>([]);

	let headerCellClickHandler = (cellNum: number) => {
		console.log('sortingCell: ' + cellNum);
		sortingHeaders.push(cellNum);
		console.log(sortingHeaders);
		setSortingHeaders(sortingHeaders);
	}; 

	let headerCells: Array<JSX.Element> = [];
	source.forEach((el, i) => {
		headerCells.push(
			<div 
				key={`${el.key}`}
				style={{ color: (sortingHeaders.indexOf(i) !== -1 ? 'blue' : '') }}
				className={`header-cell ${sortingHeaders.indexOf(i) !== -1 && 'sorting-header'}`}
				onClick={() => headerCellClickHandler(i)}
			>
				{el.title}
			</div>
		);	
	});

	return (
		<div className={'girdheader-wrapper'}>
			{headerCells}
		</div>
	);
}

export default GridHeader;