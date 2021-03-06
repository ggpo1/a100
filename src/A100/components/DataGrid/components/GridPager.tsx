import React, { useState } from 'react';

import '../css/GridPager.css';
import Emit from '../../../../MapCore/Data/Emit';
import ViewType from './../../../model/enums/ViewType';
import PagerEmitGenerator from './../../../data/PagerEmitGenerator';

interface IGridPagerProps {
    pages: number,
    viewType: ViewType
}

enum PageChangingType {
    BACK,
    FORWARD
}

function GridPager(props: IGridPagerProps) {
    const [pages] = useState<typeof props.pages>(props.pages),
        [page, setPage] = useState<number>(0),
        [viewType] = useState<ViewType>(props.viewType),
        [isFiltering, setIsFiltering] = useState<boolean>(false),
        [filteringPage, setFilteringPage] = useState<number>(0),
        [filterPagesCount, setFiltersPagesCount] = useState<number>(0);


    if (Emit.Emitter.listeners('setPagerIsFiltering').length === 0)
        Emit.Emitter.addListener('setPagerIsFiltering', (value: boolean) => { 
            if (!value) setFilteringPage(0);
            setIsFiltering(value) 
        });

    if (Emit.Emitter.listeners('setFilterstPagesCount').length === 0)
        Emit.Emitter.addListener('setFilterstPagesCount', (value: number) => setFiltersPagesCount(value));

    if (Emit.Emitter.listeners('setPagerFilteringPage').length === 0)
        Emit.Emitter.addListener('setPagerFilteringPage', (value: number) => setFilteringPage(value));

    // обработка нажатия кнопок с номерами страниц
    let pageTitleClickHanadle = (newPage: number) => {
        Emit.Emitter.emit('setPage', newPage); // проброс события в соседний компонент
        setPage(newPage); // обновление state новым значением страницы
    };

    // обработка нажатия кнопок вперед/назад
    let pageBackOrForwardClickHandle = (where: PageChangingType) => {
        let newPage;
        
        let calcPage = isFiltering ? filteringPage : page;

        if (where === PageChangingType.BACK) { // если нажата кнопка назад
            if (calcPage !== 0) newPage = calcPage - 1; // проверка, чтобы мы не вышли в отрицательные страницы
        } else if (where === PageChangingType.FORWARD) { // если нажата кнопка вперед
            if (pages > (calcPage + 1)) newPage = calcPage + 1; // проверка, чтобы невозможно было листать по несуществующим страницам
        }

        if (isFiltering) {
            Emit.Emitter.emit('setContentFilteringPage', newPage);
            setFilteringPage(newPage);
        } else {
            Emit.Emitter.emit(PagerEmitGenerator.generate(viewType), newPage); // запрос на отправку запроса для получения новой страницы
            Emit.Emitter.emit('setPage', newPage); // проброс события в соседний компонент
            setPage(newPage); // обновление state новым значением страницы
        }
        
    };

    let pagesTitles: Array<JSX.Element> = []; // массив, куда будут сохранятся заголовки страниц
    for (let i = 1; i <= pages; i++) { // вывод блоков с заголовками страниц
        pagesTitles.push(
            <div
                key={`pageTitle_${i}`}
                style={{ color: (i === page + 1 ? 'blue' : '') }}
                className={'pager-page-title'}
                onClick={() => pageTitleClickHanadle(i-1)}
            >
                {i}
            </div>
        );
    }

    return (
        <div className={'grid-pager-wrapper'}>
            <div onClick={() => pageBackOrForwardClickHandle(PageChangingType.BACK)} className={'pager-page-title'}>назад</div>
            <div style={{display: 'flex', justifyContent: 'center',color: 'blue', width: '25%'}}>{isFiltering ? filteringPage + 1 : page + 1}</div>
            <div onClick={() => pageBackOrForwardClickHandle(PageChangingType.FORWARD)} className={'pager-page-title'}>вперёд</div>
        </div>
    );
}

export default GridPager;