import MapSourceUnit from "../../../../MapCore/Models/MapSourceUnit";

interface IMapViewState {
    employeeID: number,
    controlID: number,
    resoultID: number,
    warhouseID: number,
    mapSource: Array<MapSourceUnit>,
}

export default IMapViewState;
