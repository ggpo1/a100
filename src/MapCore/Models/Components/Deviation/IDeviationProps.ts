import DeviationItem from "../../ArrayItems/DeviationItem";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface IDeviationProps {
    source?: DeviationItem,
    parentSource: StillageItem
}