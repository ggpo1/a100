import React, { useState } from 'react';

import '../css/GridContent.css';
import IDataGridProps from '../models/components/DataGrid/IDataGridProps';
import Emit from '../../../../MapCore/Data/Emit';

interface IGridContentProps {
	source: IDataGridProps
}

function GridContent(props: IDataGridProps) {
	const [source, setSource] = useState<typeof props.source>(props.source),
		[page, setPage] = useState<number>(0),
		[filters, setFilters] = useState<any>({}),
		[isFiltering, setIsFiltering] = useState<boolean>(false);

	if (Emit.Emitter.listeners('setPage').length === 0)
		Emit.Emitter.addListener('setPage', (newPage) => setPage(newPage));



	let filterRowInputChangeHandler = (key: string, value: string) => {
		// console.log(`${key}: ${value}`);
		if (value === '') {
			delete filters[key];
			setFilters(filters);
			let _isFiltering = false;
			source.headers.forEach(el => {
				if (filters[el.key] !== undefined) _isFiltering = true;
			})
			!_isFiltering && setIsFiltering(_isFiltering);
		}
		else {
			filters[key] = value;
			setFilters(filters);
			setIsFiltering(true);
		}
	}

	let rowsEls: Array<JSX.Element> = [],
		filterRow: Array<JSX.Element> = [];
	source.headers.forEach((el, i) => {
		filterRow.push(
			<input
				onChange={(e) => filterRowInputChangeHandler(el.key, e.target.value)}
				key={`filterRowCell_${i}`}
				className={'row-cell row-input'}
			/>
		);
	});

	if (isFiltering) {
		rowsEls.push(
			<div key={`filterRows`} style={{ margin: 0 }} className={'grid-block grid-row'}>
				{filterRow}
			</div>
		);	

		let _pages = source.pages;
		_pages.forEach((el, i) => {
			// _pages[i].rows.map((el) => Array.prototype.filter());	
		});

	} else {
		rowsEls.push(
			<div key={`filterRows`} style={{ margin: 0 }} className={'grid-block grid-row'}>
				{filterRow}
			</div>
		);

		source.pages[page].rows.forEach((element, i) => {
			let cellEls: Array<JSX.Element> = [];
			source.headers.forEach((headerEl, j) => {
				if (headerEl.type === 'boolean') {
					cellEls.push(
						<div key={`${i}_${j}`} className={'row-cell'}>
							{element[headerEl.key] ? 'Да' : 'Нет'}
						</div>
					);
				} else {
					if (headerEl.isHide) {
						cellEls.push(
							<div title={element[headerEl.key]} key={`${i}_${j}`} className={'row-cell'}>
								...
						</div>
						);
					} else {
						cellEls.push(
							<div key={`${i}_${j}`} className={'row-cell'}>
								{element[headerEl.key]}
							</div>
						);
					}
				}
			});
			rowsEls.push(
				<div style={{ background: element['backColor'] }} key={i} className={'grid-block grid-row'}>
					{cellEls}
				</div>
			);
		});
	}
	return (
		<div className={'grid-block gridcontent-wrapper'}>
			{rowsEls}
		</div>
	);
}

export default GridContent;