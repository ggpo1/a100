import DefectColors from "../Enums/Colors/DefectColors";

interface VikItem {
    id: number,
    place: number,

    row: string,
    elementName: string,
    level: number,
    elementSize: string,
    color: DefectColors,
    elementManufacturer: string,
    defectType: string,
    comment: string,
    isRepaired: boolean,
    defectDate: string,
    repairDate: string,
    detailsCount: number
    defectPhotos: Array<any>,
    repairsPhotos: Array<any>,
    stillageID?: number,
}

export default VikItem;
