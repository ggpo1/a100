import StillageItem from './StillageItem';

interface MapSourceLayer {
    id?: number,
    title: string,
    stillages: Array<StillageItem>,
}

export default MapSourceLayer;
