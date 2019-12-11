import CategoryItem from "../Models/ArrayItems/CategoryItem";
import Images from "./Images";
import LayerType from "../Models/Enums/LayerType";
import MapStillageType from "../Models/Enums/MapStillageType";
import Orientation from "../Models/Enums/Orientation";

const ElementSource: Array<CategoryItem> = [
    {
        title: 'стеллажи',
        elements: [
            {
                key: 'stillage_1',
                title: 'Стеллаж',
                stillageType: MapStillageType.NORMAL_BOTTOM,
                type: LayerType.STILLAGES,
                photo: Images.stillage1,
            },
            {
                key: 'stillage_2',
                title: 'Стеллаж',
                stillageType: MapStillageType.NORMAL_TOP,
                type: LayerType.STILLAGES,
                photo: Images.stillage2,
            },
            {
                key: 'stillage_3',
                title: 'Стеллаж',
                stillageType: MapStillageType.NORMAL_LEFT_VERT,
                type: LayerType.STILLAGES,
                photo: Images.stillage3,
            },
            {
                key: 'stillage_4',
                title: 'Стеллаж',
                stillageType: MapStillageType.NORMAL_RIGHT_VERT,
                type: LayerType.STILLAGES,
                photo: Images.stillage4,
            },
            {
                key: 'stillage_5',
                title: 'Стеллаж',
                stillageType: MapStillageType.SMALL_BOTTOM,
                type: LayerType.STILLAGES,
                photo: Images.stillage5,
            },
            {
                key: 'stillage_6',
                title: 'Стеллаж',
                stillageType: MapStillageType.SMALL_TOP,
                type: LayerType.STILLAGES,
                photo: Images.stillage6
            },
            {
                key: 'stillage_7',
                title: 'Стеллаж',
                stillageType: MapStillageType.SMALL_LEFT_VERT,
                type: LayerType.STILLAGES,
                photo: Images.stillage7,
            },
            {
                key: 'stillage_8',
                title: 'Стеллаж',
                stillageType: MapStillageType.SMALL_RIGHT_VERT,
                type: LayerType.STILLAGES,
                photo: Images.stillage8,
            }
        ],
    },
    {
        title: 'стены',
        elements: [
            {
                key: 'wall_hor',
                title: 'Стена горизонтальная',
                type: LayerType.WALLS,
                photo: Images.firewall,
                orientation: Orientation.HORIZONTAL,
            },
            {
                key: 'wall_vert',
                title: 'Стена вертикальная',
                type: LayerType.WALLS,
                photo: Images.firewall,
                orientation: Orientation.VERTICAL,
            }
        ],
    },
    {
        title: 'освещение',
        elements: [
            {
                key: 'first_light',
                title: 'Светильник',
                type: LayerType.LIGHTING,
                photo: Images.lightbulb,
            },
            {
                key: 'second_light',
                title: 'Светильник',
                type: LayerType.LIGHTING,
                photo: Images.idea,
            },
        ],
    }
];

export default ElementSource;