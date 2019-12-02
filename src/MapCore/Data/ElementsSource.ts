import CategoryItem from "../Models/ArrayItems/CategoryItem";
import Images from "./Images";
import LayerType from "../Models/Enums/LayerType";
import MapStillageType from "../Models/Enums/MapStillageType";

const ElementSource: Array<CategoryItem> = [
    {
        title: 'Стеллажи',
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
        title: 'Стены',
        elements: [
            {
                key: 'wall_hor',
                title: 'Стена горизонтальная',
                type: LayerType.WALLS,
                photo: Images.firewall,
            },
            {
                key: 'wall_vert',
                title: 'Стена вертикальная',
                type: LayerType.WALLS,
                photo: Images.firewall,
            }
        ],
    },
    {
        title: 'Освещение',
        elements: [
            {
                key: 'wall_hor',
                title: 'Светильник',
                type: LayerType.ABSTRACTS,
                photo: Images.lightbulb,
            },
        ],
    }
];

export default ElementSource;