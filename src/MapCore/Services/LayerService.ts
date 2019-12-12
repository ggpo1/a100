import MapSourceLayer from "../Models/MapSourceLayer";
import LayerType from "../Models/Enums/LayerType";
import MapIconsType from "../Models/Enums/MapIconsType";
import MapSourceUnit from "../Models/MapSourceUnit";

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
}