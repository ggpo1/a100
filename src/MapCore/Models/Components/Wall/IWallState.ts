import WallItem from './../../ArrayItems/WallIem';

interface IWallState {
    source: WallItem,
    cursorCoords: {
        x: number,
        y: number,
    },
    isDeleteModal: boolean,
    isAddLabelButton: boolean,
}

export default IWallState;
