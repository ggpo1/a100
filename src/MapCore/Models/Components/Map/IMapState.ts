
import MapSourceLayer from './../../MapSourceLayer';
interface IMapState {
    selectedLayer: number,
    stageScale: number,
    stageX: number,
    stageY: number,
    isMouseDown: boolean,
    source: Array<MapSourceLayer>,
}

export default IMapState;
