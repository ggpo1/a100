import MapSourceLayer from "./MapSourceLayer";

interface MapSourceUnit {
    id?: number,
    title: string,
    layers: Array<MapSourceLayer>,
}

export default MapSourceUnit;
