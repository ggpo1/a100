import React, { useState } from 'react';

import '../css/GridPager.css';
import Emit from '../../../../MapCore/Data/Emit';

interface IGridPagerProps {
    pages: number
}

function GridPager(props: IGridPagerProps) {
    const [pages] = useState<typeof props.pages>(props.pages);
    const [page, setPage] = useState<number>(0);

    let pageTitleClickHanadle = (newPage: number) => {
        Emit.Emitter.emit('setPage', newPage);
        setPage(newPage);
    };

    let pagesTitles: Array<JSX.Element> = [];
    for (let i = 1; i <= pages; i++) {
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
            <div className={'pager-page-title'}>назад</div>
            {pagesTitles}
            <div className={'pager-page-title'}>вперёд</div>
        </div>
    );
}

export default GridPager;