import LayerType from '../../MapCore/Models/Enums/LayerType';
import Orientation from '../../MapCore/Models/Enums/Orientation';
import StillageSize from '../../MapCore/Models/Enums/StillageSize/StillageSize';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';
import DefectColors from '../../MapCore/Models/Enums/Colors/DefectColors';
import SignaturePosition from './../../MapCore/Models/Enums/SignaturePosition';
import Images from "../../MapCore/Data/Images";
import MapIconsType from "../../MapCore/Models/Enums/MapIconsType";

const MapSource: Array<MapSourceUnit> = [
    {
        id: 0,
        key: 'unit_0',
        title: 'Блок 1',
        layers: [
            {
                id: 1,
                key: 'unit_0_layer_1',
                title: 'Освещение',
                type: LayerType.LIGHTING,
                mapIconsType: MapIconsType.IMAGE,
                objects: [
                    {
                        id: 0,
                        key: 'unit_0_layer_1_object_0',
                        x: 450,
                        y: 150,
                        photo: Images.lightbulb,
                    },
                ]
            },
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
                        x: 250,
                        y: 600,
                        orientation: Orientation.HORIZONTAL,
                        signature: {
                            title: '12',
                            position: SignaturePosition.TOP,
                        },
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '12',
                            },
                            {
                                place: 2,
                                title: '112',
                            },
                            {
                                place: 3,
                                title: '6',
                            },
                        ],
                        viks: [
                            {
                                place: 1,
                                level: 2,
                                color: DefectColors.YELLOW
                            },
                            {
                                place: 2,
                                level: 3,
                                color: DefectColors.GREEN,
                            },
                            {
                                place: 3,
                                level: 3,
                                color: DefectColors.RED
                            }
                        ]
                    },
                    {
                        id: 1,
                        key: 'unit_0_layer_0_stillage_1',
                        x: 600,
                        y: 456,
                        orientation: Orientation.VERTICAL,
                        signature: {
                            title: '15',
                            position: SignaturePosition.LEFT,
                        },
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '12',
                            },
                            {
                                place: 2,
                                title: '112',
                            },
                            {
                                place: 3,
                                title: '6',
                            },
                        ],
                        viks: [

                        ]
                    },
                    {
                        id: 2,
                        key: 'unit_0_layer_0_stillage_2',
                        x: 250,
                        y: 456,
                        orientation: Orientation.HORIZONTAL,
                        signature: {
                            title: '15',
                            position: SignaturePosition.BOTTOM,
                        },
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '12',
                            },
                            {
                                place: 2,
                                title: '112',
                            },
                            {
                                place: 3,
                                title: '6',
                            },
                        ],
                        viks: [

                        ]
                    },
                    {
                        id: 3,
                        key: 'unit_0_layer_0_stillage_3',
                        x: 600,
                        y: 600,
                        orientation: Orientation.VERTICAL,
                        signature: {
                            title: '15',
                            position: SignaturePosition.RIGHT,
                        },
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '12',
                            },
                            {
                                place: 2,
                                title: '112',
                            },
                            {
                                place: 3,
                                title: '6',
                            },
                        ],
                        viks: [

                        ]
                    },
                ]
            },
            {
                id: 2,
                key: 'unit_0_layer_2',
                title: 'Стены',
                type: LayerType.WALLS,
                mapIconsType: MapIconsType.DRAWING,
                walls: [
                    {
                        id: 0,
                        key: 'unit_0_layer_2_wall_0',
                        startX: 100,
                        startY: 250,
                        length: 950,
                        orientation: Orientation.HORIZONTAL,
                    },
                ]
            },
        ]
    },
    {
        id: 1,
        key: 'unit_1',
        title: 'Склад',
        layers: [
            {
                id: 0,
                key: 'unit_1_layer_0',
                title: 'Стеллажи',
                type: LayerType.STILLAGES,
                mapIconsType: MapIconsType.DRAWING,
                stillages: [

                ],
            },
            {
                id: 1,
                key: 'unit_1_layer_0',
                title: 'Стены',
                type: LayerType.WALLS,
                mapIconsType: MapIconsType.DRAWING,
                walls: [
                    {
                        id: 0,
                        key: 'unit_1_layer_0_wall_0',
                        startX: 500,
                        startY: 300,
                        length: 400,
                        orientation: Orientation.HORIZONTAL,
                    },
                    {
                        id: 1,
                        key: 'unit_1_layer_0_wall_1',
                        startX: 500,
                        startY: 400,
                        length: 400,
                        orientation: Orientation.HORIZONTAL,
                    },
                    {
                        id: 2,
                        key: 'unit_1_layer_0_wall_2',
                        startX: 300,
                        startY: 400,
                        length: 200,
                        orientation: Orientation.VERTICAL,
                    },
                ],
            }
        ]
    },



];

export default MapSource;
