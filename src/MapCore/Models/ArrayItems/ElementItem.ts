import LayerType from "../Enums/LayerType";

export default interface ElementItem {
    key?: string,
    title?: string,
    type?: LayerType,
    photo: any,
}