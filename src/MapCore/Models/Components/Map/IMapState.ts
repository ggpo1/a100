import MapSourceUnit from '../../MapSourceUnit';
import WallItem from "../../ArrayItems/WallIem";
interface IMapState {
    selectedUnit: number, // индекс выбранного блока
    selectedLayer: number, // индекс выбранного слоя deprecated
    stageScale: number, // оэф зума сцены
    moveStageParams: { // параметры сдвига сцены
      x: number,
      y: number,
    },
    stageX: number,
    stageY: number,
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
    }
}

export default IMapState;
