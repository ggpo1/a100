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

interface IGridContentSource {
	source: IDataGridSource,
	page: number,
	filterPage: number,
	filters: Array<{
		key: string,
		value: string
	}>,
	isFiltering: boolean,
	wholeData: Array<any>,
	isFilterResultEmpty: boolean,
	filtersResult: Array<JSX.Element>
}

export default class GridContent extends React.Component<IGridContentProps, IGridContentSource> {

	constructor(props: IGridContentProps) {
		super(props);

		this.state = {
			source: props.source,
			page: 0,
			filterPage: 0,
			filters: [],
			isFiltering: false,
			wholeData: props.wholeData,
			isFilterResultEmpty: false,
			filtersResult: []
		}

		Emit.Emitter.addListener('setPage', (newPage) => this.setState({ page: newPage }));
		Emit.Emitter.addListener('setWholeData', (newWholeData) => this.setState({ wholeData: newWholeData }));
		Emit.Emitter.addListener('setContentFilteringPage', (value: number) => this.setState({ filterPage: value }));

	}
	// [filteringPages, setFiltering] = useState



	// console.log('_____FILTERS_____');
	// console.log(filters);
	// console.log('__________');

	public filterRowInputChangeHandler = (key: string, value: string) => {
		const { filters, isFilterResultEmpty, wholeData, filterPage, source } = this.state;
		// console.log(`${key}: ${value}`);

		let _filters = filters;
		let notIn = _filters.filter(el => el.key === key).length === 0;


		// console.log(notIn);
		let _isFiltering: boolean = false;

		if (value.length !== 0) {
			if (notIn) {
				_filters.push({
					key,
					value
				});
			} else {
				_filters.map(el => {
					if (el.key === key) el.value = value;
					return el;
				});
			}
			_isFiltering = true;
			Emit.Emitter.emit('setPagerIsFiltering', true);
			this.setState({ isFiltering: true, filters: _filters });
		} else {
			let index = _filters.findIndex(el => el.key === key);
			_filters.splice(index, 1);

			_isFiltering = _filters.length !== 0;
			// console.log(_isFiltering);
			Emit.Emitter.emit('setPagerIsFiltering', _isFiltering);
			this.setState({ isFiltering: _isFiltering, filters: _filters });
		}

	}

	render() {
		const {
			source,
			filters,
			isFiltering,
			wholeData,
			filterPage,
			page,
			isFilterResultEmpty
		} = this.state;

		// console.log(filters);

		let rowsEls: Array<JSX.Element> = [],
			filterRow: Array<JSX.Element> = [];

		source.headers.forEach((el, i) => {
			filterRow.push(
				<input
					onChange={e => this.filterRowInputChangeHandler(el.key, e.target.value)}
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

		console.log(isFiltering);

		if (isFiltering) { // FILTERING
			let data = wholeData;

			try {
				filters.forEach(filter => {
					data = data.filter(predicate => predicate[filter.key].toString().toLowerCase().includes(filter.value.toString().toLowerCase()));
				});
			} catch (e) {
				LogHandler.handle('GridContent', LogType.ERROR, "error while filtering!");
				data = [];
			}
			// console.log(data);

			let pagesCount = Math.ceil(data.length / 10);
			Emit.Emitter.emit('setFilterstPagesCount', pagesCount)
			console.log(`PAGES: ${pagesCount}`);
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

		} else { // ELSE
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
			// }



			// let result;
			// console.log(this.state.filtersResult);
			// if (isFiltering) {
			// 	if (this.state.isFilterResultEmpty) {
			// 		result = emptyFilterResultBlock;
			// 	} else {
			// 		result = this.state.filtersResult;
			// 	}
			// } else {
			// 	result = rowsEls;
			// }


		}
		let emptyFilterResultBlock;
		if (isFilterResultEmpty) {
			emptyFilterResultBlock = [
				<div className={'empty-filter-result-block'}>
					ничего не найдено...
					</div>
			];
		}
		return (
			<div style={{ overflow: 'auto' }} className={'grid-block gridcontent-wrapper'}>
				{rowsEls}
			</div>
		);
	}
}

// CELL COMPONENT CODE
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