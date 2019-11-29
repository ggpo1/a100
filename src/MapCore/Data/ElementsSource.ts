import CategoryItem from "../Models/ArrayItems/CategoryItem";
import Images from "./Images";
import LayerType from "../Models/Enums/LayerType";

const ElementSource: Array<CategoryItem> = [
    {
        title: 'Стеллажи',
        elements: [
            {
                key: 'stillage_1',
                title: 'Стеллаж',
                type: LayerType.STILLAGES,
                photo: Images.stillage1,
            },
            {
                key: 'stillage_2',
                title: 'Стеллаж',
                type: LayerType.STILLAGES,
                photo: Images.stillage2,
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
                photo: Images.wallHor,
            },
            {
                key: 'wall_vert',
                title: 'Стена вертикальная',
                type: LayerType.WALLS,
                photo: Images.wallVert,
            }
        ],
    }
];

export default ElementSource;