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
        let _id = -50; let _key = ''; let ids: number[] = [];
        for (const el of selectedLayer.walls!) {
            ids.push(el.id);
        }
        _id = Math.max.apply(null, ids);
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
}