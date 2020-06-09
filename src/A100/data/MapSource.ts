import LayerType from '../../MapCore/Models/Enums/LayerType';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';
import A100ConnectionData from "./A100ConnectionData";
import MapAPI from "../api/MapAPI";
import Emit from "../../MapCore/Data/Emit";
import MapIconsType from "../../MapCore/Models/Enums/MapIconsType";
import StillageSize from "../../MapCore/Models/Enums/StillageSize/StillageSize";
import Orientation from "../../MapCore/Models/Enums/Orientation";
import SignaturePosition from "../../MapCore/Models/Enums/SignaturePosition";
import LogHandler from '../../LogHandler/LogHandler';
import LogType from "../model/enums/LogType";
import GlobalsatBang from "../model/GlobalsatBang";
import GlobalsatDeviation from "../model/GlobalsatDeviation";

export default class MapSource {
    public static offline: boolean = false;
    public static firstLoading: boolean = true;

    // public static mapAPI: MapAPI = new MapAPI();

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
                            orientation: Orientation.VERTICAL,
                            signature: {
                                title: '12',
                                position: SignaturePosition.RIGHT,
                            },
                            deviations: [
                                // {
                                //     id: 0,
                                //     key: 'unit_0_layer_0_stillage_0_deviation_0',
                                //     deviationPosition: SignaturePosition.TOP,
                                //     arrowFirstToSecond: false,
                                //     stillageID: 0
                                // }
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
    public static globalsatBangs: Array<GlobalsatBang> = [];
    public static globalsatDeviations: Array<GlobalsatDeviation> = [];

    public static async GetMapByParams(mapUnit: string, mapKey: string, selectedUnit: number) {
        if (!this.offline) {
            let layers = [];
            if (MapSource.data[selectedUnit].layers !== undefined) {
                // if (MapSource.data[selectedUnit].layers.length === 0) {
                LogHandler.handle('MapSource', LogType.LOG, 'fetching data by params...');

                layers = await MapAPI.GetMapByParams(A100ConnectionData.data, mapUnit, mapKey);

                for (let i = 0; i < MapSource.data.length; i++) {
                    if (MapSource.data[i].title === mapUnit) {
                        MapSource.data[i].layers = layers;
                    }
                }
                setTimeout(function () {
                    Emit.Emitter.emit('mapSetState');
                    Emit.Emitter.emit('setSelectedUnit', selectedUnit);
                }, 1000);

                // LogHandler.handle('MapSource', LogType.LOG, 'OK');
                // } else {
                //     Emit.Emitter.emit('setSelectedUnit', selectedUnit);
                // }
            } else {
                LogHandler.handle('MapSource', LogType.ERROR, 'error while fetching data by params!');
            }
        }
    }

    public static async GetGlobalsatData() {
        let bangs = await MapAPI.getGlobalsatBangs(A100ConnectionData.data);
        let deviations = await MapAPI.getGlobalsatDeviations(A100ConnectionData.data);
    }

    public static async GetUnits() {
        if (!this.offline) {
            if (this.firstLoading) {
                Emit.Emitter.addListener('GetMapByParams', this.GetMapByParams);
                this.firstLoading = false;
            }
            let units: Array<any> = [];
            units = await MapAPI.getUnitNames(A100ConnectionData.data);
            this.data = [];
            units.forEach(el => {
                this.data.push(el);
            });

            MapSource.GetMapByParams(MapSource.data[0].title, MapSource.data[0].key, 0);

            setTimeout(function () {
                Emit.Emitter.emit('mapSetState');
                Emit.Emitter.emit('setSelectedUnit', 0);
            }, 1000);
        }
    }

    public static async GetMap() {
        let _t: Array<MapSourceUnit> = [];
        let that = this;
        if (!this.offline) this.data = await MapAPI.getMap(A100ConnectionData.data);
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


}

