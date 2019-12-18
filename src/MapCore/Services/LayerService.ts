import MapSourceLayer from "../Models/MapSourceLayer";
import LayerType from "../Models/Enums/LayerType";
import MapIconsType from "../Models/Enums/MapIconsType";
import MapSourceUnit from "../Models/MapSourceUnit";
import LayerIndexByType from "../Models/LayerIndexByType";
import bs from 'js-binary-search';
import WallItem from "../Models/ArrayItems/WallIem";


export default class LayerService {
    public getLayerSourceItem(selectedUnit: MapSourceUnit, type: LayerType) {
        let _id = -50; let _key = '';
        for (const el of selectedUnit.layers!) {
            if (el.id > _id) {
                _id = el.id;
            }
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
}