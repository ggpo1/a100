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
				pages: []
			}} />
		</div>
	);
}

export default DefectsView;