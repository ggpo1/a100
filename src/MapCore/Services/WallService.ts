import WallItem from "../Models/ArrayItems/WallIem";
import MapSourceUnit from "../Models/MapSourceUnit";
import Orientation from "../Models/Enums/Orientation";
import AppState from "../Data/AppState";
import MapSourceLayer from "../Models/MapSourceLayer";
import {NodeWorker} from "inspector";
import bs from 'js-binary-search';
import sort from 'fast-sort';

export default class WallService {
    public getWallSourceItem(selectedLayer: MapSourceLayer,
                              startX: number,
                              startY: number,
                              length: number,
                              orientation: Orientation
    ): WallItem {
        let newWall;
        let _id = 0; let _key = '';
        sort(selectedLayer.walls!).asc(e => e.id);
        if (selectedLayer.walls!.length !== 0) {
            _id = selectedLayer.walls![selectedLayer.walls!.length - 1].id;
        }
        _id++;
        _key = selectedLayer.key + '_wall_' + _id.toString();

        newWall = {
            id: _id,
            key: 'wall_for_move_' + _key,
            startX: startX,
            startY: startY,
            length: length,
            // orientation: AppState.State.selectedEl.orientation
            orientation: orientation
        };


        return newWall;
    }

    public setSourceWallParams(wall: WallItem, cursorCoords, upDownCoords, stageDeviation) {
        if (wall.orientation === Orientation.HORIZONTAL) {
            wall.length = Math.abs(cursorCoords.startX - cursorCoords.x) + 25;
        } else {
            wall.length = Math.abs(cursorCoords.startY - cursorCoords.y) + 25;
        }

        if (wall.orientation === Orientation.HORIZONTAL) {

            if (upDownCoords.down.x <= upDownCoords.up.x) {
                if (upDownCoords.down.x < upDownCoords.up.x) {
                    wall.startX = upDownCoords.down.x - stageDeviation.x;
                }
            } else {
                wall.startX = upDownCoords.up.x - stageDeviation.x;
            }

        } else {

            if (upDownCoords.down.y <= upDownCoords.up.y) {
                if (upDownCoords.down.y < upDownCoords.up.y) {
                    wall.startY = upDownCoords.down.y - stageDeviation.y;
                }
            } else {
                wall.startY = upDownCoords.up.y - stageDeviation.y;
            }

        }
        return wall;
    }

    public getWallIndexByID(list: Array<WallItem>, id) {
        return bs.search_in_associative(list, 'id', id);
    }

    public resizeWall(e, _wall: WallItem, isStart: boolean, moveStageParams): WallItem {
        if (_wall.orientation === Orientation.HORIZONTAL) {
            if (isStart) {
                if (e.clientX > _wall.startX) {
                    _wall.length -= (e.clientX - moveStageParams.x) - _wall.startX;
                    _wall.startX = e.clientX - moveStageParams.x;
                } else {
                    _wall.length += Math.abs((e.clientX - moveStageParams.x) - _wall.startX);
                    _wall.startX = e.clientX - moveStageParams.x;
                }
            } else {
                _wall.length += (e.clientX - moveStageParams.x) - (_wall.startX + _wall.length);
            }
        } else if (_wall.orientation === Orientation.VERTICAL) {
            if (isStart) {
                if (e.clientY > _wall.startY) {
                    _wall.length -= (e.clientY - moveStageParams.y) - _wall.startY;
                    _wall.startY = e.clientY - moveStageParams.y;
                } else {
                    _wall.length += Math.abs((e.clientY - moveStageParams.y) - _wall.startY);
                    _wall.startY = e.clientY - moveStageParams.y;
                }
            } else {
                _wall.length += (e.clientY - moveStageParams.y) - (_wall.startY + _wall.length);
            }
        }
        return _wall;
    }

}