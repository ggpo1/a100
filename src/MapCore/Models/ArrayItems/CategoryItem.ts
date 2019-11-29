import ElementItem from "./ElementItem";

export default interface CategoryItem {
    id?: number,
    title: string,
    elements: Array<ElementItem>,
}