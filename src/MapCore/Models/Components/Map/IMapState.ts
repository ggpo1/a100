import MapSourceUnit from '../../MapSourceUnit';
interface IMapState {
    selectedUnit: number,
    selectedLayer: number,
    stageScale: number,
    stageX: number,
    stageY: number,
    isMouseDown: boolean,
    source: Array<MapSourceUnit>,
    isOnlyRed: boolean,
}

export default IMapState;
