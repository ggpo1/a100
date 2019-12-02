import LayerType from '../../MapCore/Models/Enums/LayerType';
import Orientation from '../../MapCore/Models/Enums/Orientation';
import StillageSize from '../../MapCore/Models/Enums/StillageSize/StillageSize';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';
import DefectColors from '../../MapCore/Models/Enums/Colors/DefectColors';
import SignaturePosition from './../../MapCore/Models/Enums/SignaturePosition';
import Images from "../../MapCore/Data/Images";

const MapSource: Array<MapSourceUnit> = [
    {
        title: 'Блок 1',
        layers: [
            {
                title: 'Стеллажи',
                type: LayerType.STILLAGES,
                // walls: [
                //     {
                //         startX: 500,
                //         startY: 100,
                //         length: 700,
                //         orientation: Orientation.VERTICAL,
                //     },
                // ],
                stillages: [
                    {
                        title: '1.1.1',
                        x: 250,
                        y: 456,
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
                        title: '1.1.2',
                        x: 100,
                        y: 140,
                        orientation: Orientation.VERTICAL,
                        signature: {
                                title: '1',
                                position: SignaturePosition.RIGHT,
                        },
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '1',
                            },
                            {
                                place: 2,
                                title: '2',
                            },
                            {
                                place: 3,
                                title: '3',
                            },
                        ],
                        viks: [
                            {
                                place: 1,
                                level: 2,
                                color: DefectColors.RED
                            }
                        ]
                    },
                    {
                        title: '1.1.2',
                        x: 200,
                        y: 140,
                        orientation: Orientation.VERTICAL,
                        signature: {
                                title: '1',
                                position: SignaturePosition.RIGHT,
                        },
                        size: StillageSize.SMALL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '1',
                            },
                            {
                                place: 2,
                                title: '2',
                            },
                            {
                                place: 3,
                                title: '3',
                            },
                        ],
                        viks: [
                            {
                                place: 1,
                                level: 2,
                                color: DefectColors.RED
                            }
                        ]
                    },
                ]
            },
            {
                title: 'Освещение',
                type: LayerType.ABSTRACTS,
                objects: [
                    {
                        x: 450,
                        y: 150,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 450,
                        y: 700,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 720,
                        y: 150,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 150,
                        y: 150,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 720,
                        y: 700,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 150,
                        y: 700,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 450,
                        y: 420,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 720,
                        y: 420,
                        photo: Images.lightbulb,
                    },
                    {
                        x: 150,
                        y: 420,
                        photo: Images.lightbulb,
                    },
                ]
            },
            {
                title: 'Стены',
                type: LayerType.WALLS,
                walls: [
                    {
                        startX: 10,
                        startY: 100,
                        length: 950,
                        orientation: Orientation.HORIZONTAL,
                    },
                    {
                        startX: 10,
                        startY: 100,
                        length: 700,
                        orientation: Orientation.VERTICAL,
                    },
                    {
                        startX: 10,
                        startY: 790,
                        length: 950,
                        orientation: Orientation.HORIZONTAL,
                    },
                    {
                        startX: 950,
                        startY: 100,
                        length: 400,
                        orientation: Orientation.VERTICAL,
                    },
                    {
                        startX: 950,
                        startY: 650,
                        length: 150,
                        orientation: Orientation.VERTICAL,
                    },
                ]
            },
        ]
    },
    {
        title: 'Склад холодной продукции',
        layers: [
            {
                title: 'Стеллажи',
                type: LayerType.STILLAGES,
                stillages: [
                    {
                        title: '2.1.1',
                        x: 540,
                        y: 450,
                        orientation: Orientation.HORIZONTAL,
                        signature: {
                                title: '1',
                                position: SignaturePosition.TOP,
                        },
                        size: StillageSize.SMALL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '12',
                            },
                            {
                                place: 2,
                                title: '13',
                            },
                        ],
                        viks: [
                            {
                                place: 1,
                                level: 2,
                                color: DefectColors.YELLOW
                            }
                        ]
                    },
                    // {
                    //     title: '2.1.4',
                    //     x: 510,
                    //     y: 450,
                    //     orientation: Orientation.VERTICAL,
                    //     size: StillageSize.NORMAL
                    // },
                ]
            }
        ]
    },

];

export default MapSource;
