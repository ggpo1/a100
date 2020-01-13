import StillageItem from './../../ArrayItems/StillageItem';

interface IStillageState {
    source: StillageItem,
    mapStillages: Array<StillageItem>,
    isMoveEnabled: boolean,
    isAdding: boolean,
}

export default IStillageState;
