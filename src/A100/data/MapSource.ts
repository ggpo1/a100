import LayerType from '../../MapCore/Models/Enums/LayerType';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';
import A100ConnectionData from "./A100ConnectionData";
import MapAPI from "../api/MapAPI";
import Emit from "../../MapCore/Data/Emit";
import MapIconsType from "../../MapCore/Models/Enums/MapIconsType";
import StillageSize from "../../MapCore/Models/Enums/StillageSize/StillageSize";
import Orientation from "../../MapCore/Models/Enums/Orientation";
import SignaturePosition from "../../MapCore/Models/Enums/SignaturePosition";

export default class MapSource {
    public static offline: boolean = false;

    public static async GetMap() {
        let _t: Array<MapSourceUnit> = [];
        let that = this;
        let mapAPI = new MapAPI();
        if (!this.offline) this.data = await mapAPI.getMap(A100ConnectionData.data);
        // console.log(this.data);

        if (this.data["status"] !== undefined) {
            this.data = [
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
        // {
        //     id: 0,
        //     key: 'unit_0',
        //     title: 'Блок 1',
        //     layers: []
        // },
        // {
        //     id: 1,
        //     key: 'unit_1',
        //     title: 'Блок 2',
        //     layers: []
        // },
        // {
        //     id: 2,
        //     key: 'unit_2',
        //     title: 'Блок 3',
        //     layers: []
        // },

        {
            id: 0,
            key: 'unit_0',
            title: 'Блок 1',
            layers: [
                {
                    id: 0,
                    key: 'unit_0_layer_0',
                    title: 'Стеллажи',
                    type: LayerType.STILLAGES,
                    mapIconsType: MapIconsType.DRAWING,
                    stillages: [
                        {
                            id: 0,
                            key: 'unit_0_layer_0_stillage_0',
                            x: 300,
                            y: 290,
                            orientation: Orientation.HORIZONTAL,
                            signature: {
                                title: '12',
                                position: SignaturePosition.TOP,
                            },
                            deviations: [
                                {
                                    id: 0,
                                    key: 'unit_0_layer_0_stillage_0_deviation_0',
                                    x: 300,
                                    y: 290,
                                    deviationPosition: SignaturePosition.RIGHT,
                                    arrowFirstToSecond: false,
                                }
                            ],
                            placeSignatures: [
                                {
                                    title: '1',
                                    place: 1
                                },
                                {
                                    title: '2',
                                    place: 2
                                },
                            ],
                            size: StillageSize.NORMAL,
                            pmCount: 2,
                            scale: 1,
                            isBlockScaling: false,
                            viks: [

                            ]
                        },
                    ]
                },
            ]
        },
    ];
}

