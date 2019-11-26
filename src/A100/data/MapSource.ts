import MapSourceLayer from '../../MapCore/Models/MapSourceLayer';
import LayerType from '../../MapCore/Models/Enums/LayerType';
import Orientation from '../../MapCore/Models/Enums/Orientation';
import StillageSize from '../../MapCore/Models/Enums/StillageSize/StillageSize';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';
import DefectColors from '../../MapCore/Models/Enums/Colors/DefectColors';

const MapSource: Array<MapSourceUnit> = [
    {
        title: 'Блок 1',
        layers: [
            {
                title: 'Слой 1',
                type: LayerType.STILLAGES,
                stillages: [
                    {
                        title: '1.1.1',
                        x: 250,
                        y: 456,
                        orientation: Orientation.HORIZONTAL,
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
                        orientation: Orientation.HORIZONTAL,
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
                        title: '1.1.3',
                        x: 450,
                        y: 140,
                        orientation: Orientation.HORIZONTAL,
                        size: StillageSize.NORMAL
                        
                    },
                    {
                        title: '1.1.4',
                        x: 390,
                        y: 240,
                        orientation: Orientation.VERTICAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '2',
                            },
                        ],
                        size: StillageSize.NORMAL
                    }
                ]
            },
            {
                title: 'Слой 2',
                type: LayerType.STILLAGES,
                stillages: [
                    {
                        title: '1.2.1',
                        x: 380,
                        y: 400,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL,
                    },
                    {
                        title: '1.2.2',
                        x: 660,
                        y: 240,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '444',
                            },
                            {
                                place: 2,
                                title: '124',
                            },
                            {
                                place: 3,
                                title: '273',
                            },
                        ],
                        viks: [
                            {
                                place: 1,
                                level: 2,
                                color: DefectColors.RED
                            },
                            {
                                place: 2,
                                level: 2,
                                color: DefectColors.GREEN
                            },
                            {
                                place: 3,
                                level: 2,
                                color: DefectColors.YELLOW
                            }
                        ]
                    },
                    {
                        title: '1.2.3',
                        x: 123,
                        y: 456,
                        orientation: Orientation.HORIZONTAL,
                        size: StillageSize.NORMAL,
                        placeSignatures: [
                            {
                                place: 1,
                                title: '73',
                            }
                        ],
                        viks: [
                            {
                                place: 1, 
                                level: 3,
                                color: DefectColors.GREEN,
                            },
                            {
                                place: 2, 
                                level: 3,
                                color: DefectColors.YELLOW,
                            },
                            {
                                place: 3, 
                                level: 3,
                                color: DefectColors.RED,
                            }
                        ]
                    },
                    {
                        title: '1.2.4',
                        x: 900,
                        y: 245,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL,
                    }
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
                        size: StillageSize.NORMAL,
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
