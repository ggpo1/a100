import MapSourceUnit from '../../MapSourceUnit';
import WallItem from "../../ArrayItems/WallIem";
import LayerType from "../../Enums/LayerType";
import StillageItem from "../../ArrayItems/StillageItem";
import ObjectItem from "../../ArrayItems/ObjectItem";
import VikItem from "../../ArrayItems/VikItem";
interface IMapState {
    dragNum: number,
    selectedStillage?: StillageItem,
    selectedVik?: VikItem,

    lazyLoading: boolean,

    parentKey: string,

    stageScales: {
        x: number,
        y: number
    }

    isReadOnly: boolean,

    isAddCircleAdding: boolean,
    isToggledToAdd: boolean,
    lastAddedItemType?: LayerType,
    lastAddedItem?: any,
    // shape moving
    isShapeMoveEnable: boolean,
    isShapeMovingNow: boolean,
    selectedShapeForMove?: {
        type?: LayerType,
        shape?: any
    }

    isWallUnderChild: boolean, // флаг для отражения нахождения стены на другие объекты
    wallLayerIndex: number, // индекс слоя со стенами
    wallIndex: number, // индекс выбранной стены
    selectedUnit: number, // индекс выбранного блока
    selectedLayer: number, // индекс выбранного слоя deprecated
    stageScale: number, // оэф зума сцены
    moveStageParams: { // параметры сдвига сцены при stageDragAction
      x: number, // сдвиг по X
      y: number, // сдвиг по Y
    },
    stageX: number, //
    stageY: number, //
    isMouseDown: boolean, // зажата ли левая кнопка мыши
    source: Array<MapSourceUnit>, // данные для отрисовки
    isOnlyRed: boolean, // флаг для фильтра, переделать в объект
    cursorCoords: { // координаты курсора для mouseDown и mouseUp, для рисования стены
        startX: number,
        startY: number,
        x: number,
        y: number,
    },
    isDrawing: boolean, // флаг проверки идет ли рисование стены
    cncFlag: boolean, // флаг проверки добавляется ли элемент с помощью click&click
    isAddLayerModal: boolean, // флаг открытия модального окна добавления нового слоя deprecated
    isDefectBrowsePanel: boolean, // флаг открытия модального окна просмотра повреждения
    layersSelected: number[], // список индесов выбранных слоев actual
    upDownCoords: { // same as cursorCoords
        up: {
            x: number,
            y: number,
        },
        down: {
            x: number,
            y: number,
        }
    },

    // resizing
    isIncreaseResizingLength: boolean,
    resizingWallIndex: number, // индекс стены, которую редактируют
    isStart: boolean, // какой из двух ползунков был задействован в resizing (deprecated)
    isWallResizingNow: boolean, // флаг для обозначения, что карта находится в режиме изменения длины стены
    selectedWallToResize: WallItem | undefined, // элемент выбранной стены для изменения длины стены
    resizeCursorCoordinates: { // отдельный объект для сохранения данных о позиции курсора приизменении длины стены
        startX: number, // начальное положение курсора при mouseDown по иксу
        startY: number, // начальное положение курсора при mouseUp по игрику
        actionEndX: number, // положение курсора при mouseMove и mouseUp по иксу
        actionEndY: number, // положение курсора при mouseMove и mouseUp по игрику
    }
}

export default IMapState;
