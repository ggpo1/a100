import React, { useState } from 'react';

import '../css/GridPager.css';

interface IGridPagerProps {
    pages: number
}

function GridPager(props: IGridPagerProps) {
    const [pages] = useState<typeof props.pages>(props.pages);

    let pagesTitles: Array<JSX.Element> = [];
    for (let i = 1; i <= pages; i++) {
        pagesTitles.push(
            <div key={`pageTitle_${i}`} className={'pager-page-title'}>{i}</div>
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