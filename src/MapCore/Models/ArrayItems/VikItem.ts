import DefectColors from "../Enums/Colors/DefectColors";

interface VikItem {
    
    place: number,
    level: number,
    color: DefectColors,
    stillageID?: number,
}

export default VikItem;
