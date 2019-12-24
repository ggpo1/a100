import sort from 'fast-sort';
import bs from 'js-binary-search';

import StillageSizeReducer from "../Models/Enums/StillageSize/StillageSizeReducer";
import MapSourceLayer from "../Models/MapSourceLayer";
import LayerType from "../Models/Enums/LayerType";
import MapIconsType from "../Models/Enums/MapIconsType";
import MapSourceUnit from "../Models/MapSourceUnit";
import LayerIndexByType from "../Models/LayerIndexByType";
import WallItem from "../Models/ArrayItems/WallIem";
import Orientation from "../Models/Enums/Orientation";
import SignaturePosition from "../Models/Enums/SignaturePosition";
import ElementItem from "../Models/ArrayItems/ElementItem";
import StillageService from "./StillageService";

export default class LayerService {

    private stillageSizeReducer!: StillageSizeReducer;
    private stillageService!: StillageService;

    constructor() {
        this.stillageSizeReducer = new StillageSizeReducer();
        this.stillageService = new StillageService();
    }

    public getLayerSourceItem(selectedUnit: MapSourceUnit, type: LayerType) {
        let _id = 0; let _key = '';
        sort(selectedUnit.layers).asc(e => e.id);
        if (selectedUnit.layers.length !== 0) {
            _id = selectedUnit.layers[selectedUnit.layers.length - 1].id;
        }
        _id++;
        _key = selectedUnit.key + '_layer_' + _id.toString();
        return {
            id: _id,
            key: _key,
            title:  this.getLayerNameByType(type),
            type: type,
            mapIconsType: this.getMapIconsTypeByLayerType(type),
            walls: [],
            stillages: [],
            objects: [],
        }
    }

    public getLayerIndexByTypeBinary(list: Array<MapSourceLayer>, type: LayerType) {
        let start = 0; let end = list.length - 1;

        list.sort((a, b) => {
            if (a.type > b.type) {
                return 1;
            }
            if (a.type < b.type) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });

        while (start <= end) {
            let mid = Math.floor((start + end)/2);
            if (list[mid].type === type) {
                return mid;
            } else if (list[mid].type < type) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return -1;
    }

    private getLayerNameByType(type: LayerType): string {
        switch (type) {
            case LayerType.STILLAGES: return 'Стеллажи';
            case LayerType.WALLS: return 'Стены';
            case LayerType.LIGHTING: return 'Освещение';
            case LayerType.SIGNATURES: return 'Подписи';
            case LayerType.ABSTRACTS: return 'Абстракции';
            default: return '';
        }
    }

    private getMapIconsTypeByLayerType(type: LayerType): MapIconsType {
        switch (type) {
            case LayerType.STILLAGES: return MapIconsType.DRAWING;
            case LayerType.WALLS: return MapIconsType.DRAWING;
            case LayerType.LIGHTING: return MapIconsType.IMAGE;
            case LayerType.SIGNATURES: return MapIconsType.DRAWING;
            case LayerType.ABSTRACTS: return MapIconsType.IMAGE;
        }
    }

    public getLayerIndex(selectedLayers: Array<number>, layersList: Array<MapSourceLayer>, type: LayerType): LayerIndexByType{
        let returnState = {
            selected: {
                is: false,
                index: -1,
            },
            created: {
                is: false,
                index: -1,
            }
        };
        let object = bs.search_in_associative(layersList, 'type', type);
        returnState.created.index = object.index;
        object = object.item;

        if (returnState.created.index !== -1) {
            returnState.created.is = true;
            returnState.selected.index = bs.search(selectedLayers, returnState.created.index).index;
            if (returnState.selected.index !== -1 && returnState.selected.index !== undefined) {
                returnState.selected.is = true;
            } else {
                returnState.selected.is = false;
                returnState.selected.index = -1;
            }
        }
        return returnState;
    }

    public deleteBadWalls(list: Array<WallItem>): Array<WallItem> {
        let count = 0;
        let badEls: WallItem[] = [];

        for (let k = 0; k < list.length; k++) {
            if (list[k].key.includes('wall_for_move')) {
                badEls.push(list[k]);
                count++;
            }
        }

        if (badEls.length !== 0) {
            for (let k = 0; k < badEls.length; k++) {
                let index = list.indexOf(badEls[k]);
                list.splice(index, 1);
            }
        }
        return list;
    }

    public hasUnderChild(layersList: Array<MapSourceLayer>, type: LayerType, x: number, y: number, selected: ElementItem): boolean {
        let object = bs.search_in_associative(layersList, 'type', LayerType.STILLAGES);
        let layer = layersList[object.index];
        if (type === LayerType.STILLAGES) {
            let selectedStillageToAdd = this.stillageService.getStillageSourceItem(layer, { x, y }, selected.stillageType!);
            const newSWidth = selectedStillageToAdd.width;
            const newSHeight = selectedStillageToAdd.height;
            const newSStartX = selectedStillageToAdd.x;
            const newSStartY = selectedStillageToAdd.y;
            const newSEndX = newSStartX + selectedStillageToAdd.width;
            const newSEndY = newSStartY + selectedStillageToAdd.height;


            // stillages search
            let stillagesList = layer.stillages!;
            for (let i = 0; i < stillagesList.length; i++) {
                const el = stillagesList[i];
                    if (el.orientation === Orientation.HORIZONTAL) {
                        if (el.signature!.position === SignaturePosition.TOP) {
                            if (((x >= (el.x - newSWidth)) && (x <= (el.x + el.width!))) && ((y >= (el.y - newSHeight! - 24.5)) && (y <= (el.y + el.height!)))) {
                                return true;
                            }
                        } else if (el.signature!.position === SignaturePosition.BOTTOM) {
                            if (((x >= (el.x - newSWidth!)) && (x <= (el.x + el.width!))) && ((y >= (el.y - newSHeight!)) && (y <= (el.y + el.height!)))) {
                                return true;
                            }
                        }
                    } else {
                        if (el.signature!.position === SignaturePosition.LEFT) {
                            if (((x >= (el.x - 24.5)) && (x <= (el.x + el.width!))) && ((y >= el.y) && (y <= (el.y + el.height!)))) {
                                return true;
                            }
                        } else if (el.signature!.position === SignaturePosition.RIGHT) {
                            if (((x >= el.x) && (x <= (el.x + el.width!))) && ((y >= el.y) && (y <= (el.y + el.height!)))) {
                                return true;
                            }
                        }
                    }
            }
            // walls search
            object = bs.search_in_associative(layersList, 'type', LayerType.WALLS);
            let walls = layersList[object.index].walls!;
            let elStartX, elStartY, elEndX, elEndY = 0;
            for (let i = 0; i < walls.length; i++) {
                const el = walls[i];
                    elStartX = el.startX;
                    elStartY = el.startY;
                    if (el.orientation === Orientation.HORIZONTAL) {
                        elEndX = elStartX + el.length;
                        elEndY = elStartY + 10;
                    } else {
                        elEndX = elStartX + 10;
                        elEndY = elStartY + el.length;
                    }

                    if ((newSStartX > (elStartX - newSWidth) && newSStartX < elEndX) && (newSStartY > (elStartY - newSHeight) && newSStartY < elEndY)) {
                        return true;
                    }
                // console.error(el);
            }
        } else if (type === LayerType.WALLS) {
            console.error('WALL!');
            return true;
        } else if (type === LayerType.ABSTRACTS) {
            return true;
        }

        // sort(stillagesList).asc([
        //     e => e.x,
        //     e => e.y
        // ]);



        return false;
    }

}