import React, { useState } from 'react';

import DataGrid from '../components/DataGrid/DataGrid';


function DefectsView() {
	return (
		<div className={'defectsview-wrapper'}>
			<DataGrid source={{
				headers: [
					{
						key: 'row',
						type: 'string',
						title: 'Ряд',
						isHide: false
					},
					{
						key: 'place',
						type: 'string',
						title: 'Место',
						isHide: false
					},
					{
						key: 'level',
						type: 'string',
						title: 'Уровень',
						isHide: false
					},
					{
						key: 'elementName',
						type: 'string',
						title: 'Элемент',
						isHide: false
					},
					{
						key: 'size',
						type: 'string',
						title: 'Размер',
						isHide: false
					},
					{
						key: 'defectType',
						type: 'string',
						title: 'Тип дефекта',
						isHide: false
					},
					{
						key: 'riskLevel',
						type: 'string',
						title: 'Уровень риска',
						isHide: false
					},
					{
						key: 'comment',
						type: 'string',
						title: 'Комментарий',
						isHide: true
					},
					{
						key: 'browseDate',
						type: 'string',
						title: 'Дата обнаружения',
						isHide: false
					},
					{
						key: 'isDone',
						type: 'boolean',
						title: 'Исправлен',
						isHide: false
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
								comment: 'Комментарий к данному повреждению',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#f08080'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Жёлтый',
								comment: 'Комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#fffacd'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Зелёный',
								comment: 'Еще один комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#90ee90'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Красный',
								comment: 'Комментарий к данному повреждению',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#f08080'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Жёлтый',
								comment: 'Комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#fffacd'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Зелёный',
								comment: 'Еще один комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#90ee90'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Красный',
								comment: 'Комментарий к данному повреждению',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#f08080'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Жёлтый',
								comment: 'Комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#fffacd'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Зелёный',
								comment: 'Еще один комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#90ee90'
							}
						]
					},
					{
						page: 2,
						rows: [
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Зелёный',
								comment: 'Еще один комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#90ee90'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Красный',
								comment: 'Комментарий к данному повреждению',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#f08080'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Жёлтый',
								comment: 'Комментарий',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#fffacd'
							},
							{
								row: '1',
								place: '3',
								level: '1',
								elementName: 'Балка',
								size: '1204x134',
								defectType: 'Скручивание',
								riskLevel: 'Красный',
								comment: 'Комментарий к данному повреждению',
								browseDate: '2019-12-12',
								isDone: false,
								backColor: '#f08080'
							},
						]
					}
				]
			}} />
		</div>
	);
}

export default DefectsView;