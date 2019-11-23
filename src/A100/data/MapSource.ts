import MapSourceLayer from '../../MapCore/Models/MapSourceLayer';
import LayerType from '../../MapCore/Models/Enums/LayerType';
import Orientation from '../../MapCore/Models/Enums/Orientation';
import StillageSize from '../../MapCore/Models/Enums/StillageSize/StillageSize';
import MapSourceUnit from '../../MapCore/Models/MapSourceUnit';

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
                    },
                    {
                        title: '1.1.2',
                        x: 100,
                        y: 140,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL
                    },
                    {
                        title: '1.1.3',
                        x: 450,
                        y: 140,
                        orientation: Orientation.HORIZONTAL,
                        size: StillageSize.SMALL
                    },
                    {
                        title: '1.1.4',
                        x: 390,
                        y: 240,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.SMALL
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
                        size: StillageSize.SMALL,
                    },
                    {
                        title: '1.2.2',
                        x: 660,
                        y: 240,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL
                    },
                    {
                        title: '1.2.3',
                        x: 123,
                        y: 456,
                        orientation: Orientation.HORIZONTAL,
                        size: StillageSize.SMALL
                    },
                    {
                        title: '1.2.4',
                        x: 900,
                        y: 245,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL
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
                                color: '#FF003C'
                            }
                        ]
                    },
                    {
                        title: '2.1.4',
                        x: 510,
                        y: 450,
                        orientation: Orientation.VERTICAL,
                        size: StillageSize.NORMAL
                    },
                ]
            }
        ]
    }
];

export default MapSource;
