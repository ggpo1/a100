import MapSourceLayer from "../Models/MapSourceLayer";

export default class ObjectService {
    public getObjectSourceItem(selectedLayer: MapSourceLayer, coords: { x: number, y: number }, photo: any) {
        let _id = -50; let _key = '';
        for (const el of selectedLayer.objects!) {
            if (el.id > _id) {
                _id = el.id;
            }
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
}