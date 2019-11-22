import MapSourceLayer from '../../MapCore/Models/MapSourceLayer';
import LayerType from '../../MapCore/Models/Enums/LayerType';
import Orientation from '../../MapCore/Models/Enums/Orientation';
import StillageSize from '../../MapCore/Models/Enums/StillageSize/StillageSize';

const MapSource: Array<MapSourceLayer> = [
    {
        title: 'Слой 1',
        type: LayerType.STILLAGES,
        stillages: [
            {
                title: '1.1',
                x: 250,
                y: 456,
                orientation: Orientation.HORIZONTAL,
                size: StillageSize.NORMAL,
            },
            {
                title: '1.2',
                x: 100,
                y: 140,
                orientation: Orientation.VERTICAL,
                size: StillageSize.NORMAL
            },
            {
                title: '1.3',
                x: 450,
                y: 140,
                orientation: Orientation.HORIZONTAL,
                size: StillageSize.SMALL
            },
            {
                title: '1.4',
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
                title: '2.1',
                x: 380,
                y: 400,
                orientation: Orientation.VERTICAL,
                size: StillageSize.SMALL,
            },
            {
                title: '2.2',
                x: 660,
                y: 240,
                orientation: Orientation.VERTICAL,
                size: StillageSize.NORMAL
            },
            {
                title: '2.3',
                x: 123,
                y: 456,
                orientation: Orientation.HORIZONTAL,
                size: StillageSize.SMALL
            },
            {
                title: '2.4',
                x: 900,
                y: 245,
                orientation: Orientation.VERTICAL,
                size: StillageSize.NORMAL
            }
        ]
    },
];

export default MapSource;
