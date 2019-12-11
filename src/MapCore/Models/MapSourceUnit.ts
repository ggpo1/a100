import MapSourceLayer from "./MapSourceLayer";

interface MapSourceUnit {
    id: number,
    key: string,
    title: string,
    layers: Array<MapSourceLayer>,
}

export default MapSourceUnit;
