import Orientation from './../Enums/Orientation';

interface WallItem {
    id: number,
    key: string,
    startX: number,
    startY: number,
    length: number,
    orientation: Orientation,
    color?: string,

 }

 export default WallItem;
