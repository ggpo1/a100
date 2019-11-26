import Orientation from './../Enums/Orientation';

interface WallItem {
    startX: number,
    startY: number,
    length: number,
    orientation: Orientation,
    color?: string,

 }

 export default WallItem;
