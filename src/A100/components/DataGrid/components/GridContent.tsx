import React, { useState } from 'react';

import '../css/GridContent.css';


function GridContent() {
	

	return (
		<div className={'grid-block gridcontent-wrapper'}>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
			<div className={'grid-block grid-row'}></div>
		</div>
	);
}

export default GridContent;