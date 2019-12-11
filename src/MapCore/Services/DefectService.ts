import VikItem from "../Models/ArrayItems/VikItem";
import StillageItem from "../Models/ArrayItems/StillageItem";

export default class DefectService {
    public getDefectUniqKey(stillageElement: StillageItem, element: VikItem): string {
        return stillageElement.key + '_defect_' + stillageElement.x + '_' + stillageElement.y + element.place + '_' + element.level + '_' + element.color;
    }
}