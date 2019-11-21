import React from 'react';
import IIntroducingProps from '../model/Components/Introducing/IIntroducingProps';
import IIntroducingState from '../model/Components/Introducing/IIntroducingState';


export default class Introducing extends React.Component<IIntroducingProps, IIntroducingState> {

    constructor(props: IIntroducingProps) {
        super(props);
    }

    render() {
        return (
            <div>Intro</div>
        );
    }

}