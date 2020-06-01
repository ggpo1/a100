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

	// console.log('_____FILTERS_____');
	// console.log(filters);
	// console.log('__________');

	let filterRowInputChangeHandler = (key: string, value: string) => {

		if (value.length === 0) {
			delete filters[key];
			let _isFiltering = false;
			source.headers.forEach(el => {
				if (filters[el.key] !== undefined) _isFiltering = true;
			});
			setFilters(filters);
			!_isFiltering && setIsFiltering(_isFiltering);
		}
		else {
			console.log('eKey: ' + key);
			console.log('eVal: ' + value);
			console.log('eFilVal: ' + filters[key]);

			// if (filters[key] === undefined) 
			// filters[key] = '';

			filters[key] = value;
			console.log('eFilValUp: ' + filters[key]);
			console.log('__________');
			setFilters(filters);
			if (!isFiltering) setIsFiltering(true);
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
				placeholder={el.title}
			/>
		);
	});

	rowsEls.push(
		<div key={`filterRows`} style={{ margin: 0 }} className={'grid-block grid-row'}>
			{filterRow}
		</div>
	);

	// console.log('isFiltering: ' + isFiltering);
	let _isFiltering;

	if (isFiltering) {
		// FILTERING
		// console.log(filters);
		let _pages = source.pages;
		let _notPaged: Array<any> = [];
		_pages.forEach((el, i) => { // преобразование данных с пагинацией в данные без пагинации
			el.rows.forEach((rowEl: any) => _notPaged.push(rowEl));
		});

		let _filters = Object.keys(filters).map((key) => {
			return { key: key, value: filters[key] }
		});

		let _filteredRows: Array<any> = [];
		_filters.forEach((_filter) => { // фильтрация
			_filteredRows = _notPaged.filter(pred => pred[_filter.key].toString().toLowerCase().includes(_filter.value.toString().toLowerCase()))// _filter.value);
		});

		_filteredRows.forEach((element, i) => {
			let cellEls: Array<JSX.Element> = [];
			source.headers.forEach((headerEl, j) => {
				cellEls.push(
					<Cell
						key={`cell_${j}_${i}`}
						dataType={headerEl.type}
						value={element[headerEl.key]}
						row={j}
						column={i}
						isHide={headerEl.isHide}
					/>
				);

			});
			rowsEls.push(
				<div style={{ background: element['backColor'] }} key={i} className={'grid-block grid-row'}>
					{cellEls}
				</div>
			);
		})


	} else {
		try {
			source.pages[page].rows.forEach((element, i) => {
				let cellEls: Array<JSX.Element> = [];
				source.headers.forEach((headerEl, j) => {
					cellEls.push(
						<Cell
							key={`cell_${j}_${i}`}
							dataType={headerEl.type}
							value={element[headerEl.key]}
							row={j}
							column={i}
							isHide={headerEl.isHide}
						/>
					);
				});
				rowsEls.push(
					<div style={{ background: element['backColor'] }} key={i} className={'grid-block grid-row'}>
						{cellEls}
					</div>
				);
			});
		} catch (e) { }
	}

	return (
		<div className={'grid-block gridcontent-wrapper'}>
			{rowsEls}
		</div>
	);
}

interface ICell {
	dataType: string,
	value: string,
	row: number,
	column: number,
	isHide: boolean
}

function Cell(props: ICell) {
	// console.log(props);
	if (props.dataType === 'boolean') { // DO ENUM
		return (
			<div key={`${props.column}_${props.row}`} className={'row-cell'}>
				{props.value ? 'Да' : 'Нет'}
			</div>
		);
	} else if (props.dataType === 'dateTime') {
		let date = props.value.toString().split('T')[0];
		return (
			<div title={props.value} key={`${props.column}_${props.row}`} className={'row-cell'}>
				{date}
			</div>
		);
	} else {
		return (
			<div title={props.value} key={`${props.column}_${props.row}`} className={'row-cell'}>
				{props.isHide ? (props.value.length === 0 ? '-' : '. . .') : props.value}
			</div>
		);
	}
}

export default GridContent;