import Orientation from './../Enums/Orientation';

interface WallItem {
    key?: string,
    startX: number,
    startY: number,
    length: number,
    orientation: Orientation,
    color?: string,

 }

 export default WallItem;
