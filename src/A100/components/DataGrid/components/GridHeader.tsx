import React, { useState } from 'react';

import IGridHeaderProps from '../models/components/GridHeader/IGridHeaderProps';

import '../css/GridHeader.css';
import Emit from './../../../../MapCore/Data/Emit';
import HeaderItem from './../models/HeaderItem';


function GridHeader(props: IGridHeaderProps) {
	const [source, setSource] = useState<typeof props.source>(props.source),
		[sortingHeaders, setSortingHeaders] = useState<Array<number>>([]);

	let setSourceRemote = (source: Array<HeaderItem>) => setSource(source);

	// Костыли ебаные
	if (Emit.Emitter.eventNames().indexOf('setDataGridHeaderSource') === -1)
		Emit.Emitter.addListener('setDataGridHeaderSource', setSourceRemote);

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