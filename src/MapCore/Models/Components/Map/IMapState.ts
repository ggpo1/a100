import MapSourceUnit from '../../MapSourceUnit';
import WallItem from "../../ArrayItems/WallIem";
interface IMapState {
    selectedUnit: number,
    selectedLayer: number,
    stageScale: number,
    stageX: number,
    stageY: number,
    isMouseDown: boolean,
    source: Array<MapSourceUnit>,
    isOnlyRed: boolean,
    cursorCoords: {
        startX: number,
        startY: number,
        x: number,
        y: number,
    },
    isDrawing: boolean,
    cncFlag: boolean,

    isDefectBrowsePanel: boolean,
    layersSelected: number[],
}

export default IMapState;
