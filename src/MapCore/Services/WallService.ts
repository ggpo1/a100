import WallItem from "../Models/ArrayItems/WallIem";
import MapSourceUnit from "../Models/MapSourceUnit";
import Orientation from "../Models/Enums/Orientation";
import AppState from "../Data/AppState";
import MapSourceLayer from "../Models/MapSourceLayer";

export default class WallService {
    public getWallSourceItem(selectedLayer: MapSourceLayer,
                              startX: number,
                              startY: number,
                              length: number,
                              orientation: Orientation
    ): WallItem {
        let newWall;
        let _id; let _key = '';

        _id = this.getMaxIDBinary(selectedLayer.walls!);
        _id++;
        _key = selectedLayer.key + '_wall_' + _id.toString();

        newWall = {
            id: _id,
            key: 'wall_for_move_' + _key,
            startX: startX,
            startY: startY,
            length: length,
            orientation: AppState.State.selectedEl.orientation
        };


        return newWall;
    }

    public getMaxIDBinary(list: Array<WallItem>) {
        let startI = 0; let endI = list.length - 1;

        let _max = list[0].id;
        while (true) {
            if (list[startI].id > _max && list[startI].id >= list[endI].id) {
                _max = list[startI].id;
            } else if (list[endI].id > _max && list[endI].id >= list[startI].id) {
                _max = list[endI].id;
            }
            if (list.length % 2 !== 0) {
                if (startI === endI) {
                    return _max;
                }
            } else {
                if ((list.length / 2) === startI) {
                    return _max;
                }
            }
            startI++;
            endI--;
        }
    }
}