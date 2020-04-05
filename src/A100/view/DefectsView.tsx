import React, { useState } from 'react';

import DataGrid from '../components/DataGrid/DataGrid';


function DefectsView() {
	return (
		<div className={'defectsview-wrapper'}>
			<DataGrid source={{
				headers: [
					{
						key: 'row',
						title: 'Ряд'
					},
					{
						key: 'place',
						title: 'Место'
					},
					{
						key: 'level',
						title: 'Уровень'
					},
					{
						key: 'elementName',
						title: 'Элемент'
					},
					{
						key: 'size',
						title: 'Размер'
					},
					{
						key: 'defectType',
						title: 'Тип дефекта'
					},
					{
						key: 'riskLevel',
						title: 'Уровень риска'
					},
					{
						key: 'comment',
						title: 'Комментарий'
					},
					{
						key: 'browseDate',
						title: 'Дата обнаружения'
					},
					{
						key: 'isDone',
						title: 'Исправлен'
					}
				],
				pages: [
					{
						page: 1,
						rows: [
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Красный',
								comment: 'Коммент',
								browseDate: '2019-12-12',
								isDone: false,
							}
						]
					},
					{
						page: 2,
						rows: []
					},
					{
						page: 3,
						rows: []
					},
				]
			}} />
		</div>
	);
}

export default DefectsView;