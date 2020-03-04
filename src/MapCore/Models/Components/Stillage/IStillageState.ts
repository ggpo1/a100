import StillageItem from './../../ArrayItems/StillageItem';

interface IStillageState {
    source: StillageItem,
    mapStillages: Array<StillageItem>,
    isMoveEnabled: boolean,
    isAdding: boolean,
    deviations: Array<JSX.Element>,
    placeSignatures: Array<JSX.Element>,
    signature: JSX.Element,
    redDefects?: Array<JSX.Element>,
    greenDefects?: Array<JSX.Element>,
    yellowDefects?: Array<JSX.Element>
}

export default IStillageState;
