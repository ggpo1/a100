import React, { useState } from 'react';

import IGridHeaderProps from '../models/components/GridHeader/IGridHeaderProps';

import '../css/GridHeader.css';


function GridHeader(props: IGridHeaderProps) {
	const [source, setSource] = useState<typeof props.source>(props.source),
		  [sortingHeaders] = useState<Array<number>>([]);

	let headerCellClickHandler = (cellNum: number) => sortingHeaders.push(cellNum); 

	let headerCells: Array<JSX.Element> = [];
	source.forEach((el, i) => {
		headerCells.push(
			<div 
				key={`${el.key}`}
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