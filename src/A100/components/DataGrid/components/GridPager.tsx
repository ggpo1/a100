import React, { useState } from 'react';

import '../css/GridPager.css';
import Emit from '../../../../MapCore/Data/Emit';

interface IGridPagerProps {
    pages: number
}

enum PageChangingType {
    BACK,
    FORWARD
}

function GridPager(props: IGridPagerProps) {
    const [pages] = useState<typeof props.pages>(props.pages);
    const [page, setPage] = useState<number>(0);

    // обработка нажатия кнопок с номерами страниц
    let pageTitleClickHanadle = (newPage: number) => {
        Emit.Emitter.emit('setPage', newPage); // проброс события в соседний компонент
        setPage(newPage); // обновление state новым значением страницы
    };

    // обработка нажатия кнопок вперед/назад
    let pageBackOrForwardClickHandle = (where: PageChangingType) => {
        let newPage = page;

        if (where === PageChangingType.BACK) { // если нажата кнопка назад
            if (page !== 0) newPage = page - 1; // проверка, чтобы мы не вышли в отрицательные страницы
        } else if (where === PageChangingType.FORWARD) { // если нажата кнопка вперед
            if (pages > (page + 1)) newPage = page + 1; // проверка, чтобы невозможно было листать по несуществующим страницам
        }
        
        Emit.Emitter.emit('setPage', newPage); // проброс события в соседний компонент
        setPage(newPage); // обновление state новым значением страницы
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
            {pagesTitles}
            <div onClick={() => pageBackOrForwardClickHandle(PageChangingType.FORWARD)} className={'pager-page-title'}>вперёд</div>
        </div>
    );
}

export default GridPager;