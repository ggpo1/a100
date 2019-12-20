import CategoryItem from "../../ArrayItems/CategoryItem";

export default interface IElementsPanelState {
    source: Array<CategoryItem>,
    selectedCategory: number,
    isToggled: boolean,
    selectedElementIndex: string,
}