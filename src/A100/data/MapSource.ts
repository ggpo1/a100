import LayerType from '../../MapCore/Models/Enums/LayerType';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';
import A100ConnectionData from "./A100ConnectionData";
import MapAPI from "../api/MapAPI";
import Emit from "../../MapCore/Data/Emit";
import MapIconsType from "../../MapCore/Models/Enums/MapIconsType";

export default class MapSource {

    public static async GetMap() {
        let mapAPI = new MapAPI();
        this.data = await mapAPI.getMap(A100ConnectionData.data);
        let that = this;
        let nullableUnits: Array<number> = [];
        setTimeout(function () {
            // empty blocks deleting
            // for (let k = 0; k < MapSource.data.length; k++) {
            //     if (MapSource.data[k].layers === null || MapSource.data[k].layers === undefined) {
            //         nullableUnits.push(k);
            //     }
            // }
            // nullableUnits.forEach((el) => {
            //     MapSource.data.splice(el, 1);
            // });
            Emit.Emitter.emit('mapSetState');
        }, 1000);
    }

    public static data: Array<MapSourceUnit> = [
        {
            id: 0,
            key: 'unit_0',
            title: 'Блок 1',
            layers: []
        },
        {
            id: 1,
            key: 'unit_1',
            title: 'Блок 2',
            layers: []
        },
        {
            id: 2,
            key: 'unit_2',
            title: 'Блок 3',
            layers: []
        },
    ];
}

