import sort from 'fast-sort';
import bs from 'js-binary-search';

import MapSourceLayer from "../Models/MapSourceLayer";
import StillageItem from "../Models/ArrayItems/StillageItem";
import ObjectItem from "../Models/ArrayItems/ObjectItem";

export default class ObjectService {
    public getObjectSourceItem(selectedLayer: MapSourceLayer, coords: { x: number, y: number }, photo: any) {
        let _id = 0; let _key = '';
        sort(selectedLayer.objects!).asc(e => e.id);
        if (selectedLayer.objects!.length !== 0) {
            _id = selectedLayer.objects![selectedLayer.objects!.length - 1].id;
        }
        _id++;
        _key = selectedLayer.key + '_object_' + _id.toString();
        return {
            id: _id,
            key: _key,
            x: coords.x,
            y: coords.y,
            photo: photo,
        }
    }

    public searchByID(shapesList: Array<ObjectItem>, id: number) {
        return bs.search_in_associative(shapesList, 'id', id);
    }
}