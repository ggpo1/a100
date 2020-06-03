import React, { useState } from 'react';

import '../css/GridContent.css';
import IDataGridProps from '../models/components/DataGrid/IDataGridProps';
import Emit from '../../../../MapCore/Data/Emit';
import IDataGridSource from '../models/sources/IDataGridSource';
import ViewType from './../../../model/enums/ViewType';
import LogHandler from './../../../../LogHandler/LogHandler';
import LogType from './../../../model/enums/LogType';
import IPageItem from './../models/IPageItem';

interface IGridContentProps {
	source: IDataGridSource,
	viewType: ViewType
	wholeData: Array<any>
}

function GridContent(props: IGridContentProps) {
	const [source, setSource] = useState<typeof props.source>(props.source),
		[page, setPage] = useState<number>(0),
		[filterPage, setFilterPage] = useState(0),
		[filters, setFilters] = useState<any>({}),
		[isFiltering, setIsFiltering] = useState<boolean>(false),
		[wholeData, setWholeData] = useState<Array<any>>(props.wholeData)
	// [filteringPages, setFiltering] = useState

	if (Emit.Emitter.listeners('setPage').length === 0)
		Emit.Emitter.addListener('setPage', (newPage) => setPage(newPage));

	if (Emit.Emitter.listeners('setWholeData').length === 0)
		Emit.Emitter.addListener('setWholeData', (newWholeData) => setWholeData(newWholeData))

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
			// console.log('eKey: ' + key);
			// console.log('eVal: ' + value);
			// console.log('eFilVal: ' + filters[key]);

			// if (filters[key] === undefined) 
			// filters[key] = '';

			filters[key] = value;
			// console.log('eFilValUp: ' + filters[key]);
			// console.log('__________');
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
	// let _isFiltering;

	let firstLetterTLC = (key: string) => {
		return (`${key[0].toLowerCase()}${key.slice(1)}`);
	}

	Emit.Emitter.emit('setPagerIsFiltering', isFiltering); // НЕ РАБОТАЕТ

	if (isFiltering) {
		// console.log(wholeData);

		let _filters = Object.keys(filters).map((key) => {
			return { key: firstLetterTLC(key), value: filters[key] }
		});

		// console.log(_filters);
		let data = wholeData;
		try {
			_filters.forEach(filter => {
				data = data.filter(predicate => predicate[filter.key].toString().toLowerCase().includes(filter.value.toString().toLowerCase()));
			});
		} catch (e) {
			LogHandler.handle('GridContent', LogType.ERROR, "error while filtering!");
			data = [];
		}
		console.log(data);

		let pagesCount = Math.ceil(data.length / 10);
		// let page = 0;
		let pages: Array<IPageItem> = [];
		for (let i = 0; i < pagesCount - 1; i++) {
			let from = i * 10;
			let to = from + 10;

			let pageRows: Array<any> = [];			
			for (let j = from; j < to; j++) {
				pageRows.push(data[j]);
			}
			pages.push({
				page: i,
				rows: pageRows
			});
		}
		console.log(pages);



		try {
			pages[filterPage].rows.forEach((element, i) => {
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


		// FILTERING
		// console.log(filters);
		// let _pages = source.pages;
		// let _notPaged: Array<any> = [];
		// _pages.forEach((el, i) => { // преобразование данных с пагинацией в данные без пагинации
		// 	el.rows.forEach((rowEl: any) => _notPaged.push(rowEl));
		// });

		// let _filters = Object.keys(filters).map((key) => {
		// 	return { key: key, value: filters[key] }
		// });

		// let _filteredRows: Array<any> = [];
		// _filters.forEach((_filter) => { // фильтрация
		// 	_filteredRows = _notPaged.filter(pred => pred[_filter.key].toString().toLowerCase().includes(_filter.value.toString().toLowerCase()))// _filter.value);
		// });

		// _filteredRows.forEach((element, i) => {
		// 	let cellEls: Array<JSX.Element> = [];
		// 	source.headers.forEach((headerEl, j) => {
		// 		cellEls.push(
		// 			<Cell
		// 				key={`cell_${j}_${i}`}
		// 				dataType={headerEl.type}
		// 				value={element[headerEl.key]}
		// 				row={j}
		// 				column={i}
		// 				isHide={headerEl.isHide}
		// 			/>
		// 		);

		// 	});
		// 	rowsEls.push(
		// 		<div style={{ background: element['backColor'] }} key={i} className={'grid-block grid-row'}>
		// 			{cellEls}
		// 		</div>
		// 	);
		// })


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
		<div style={{ overflow: 'auto' }} className={'grid-block gridcontent-wrapper'}>
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
	try {
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
	} catch (ex) {
		return (
			<div key={`empty`} className={'row-cell'}></div>
		);
	}
}

export default GridContent;