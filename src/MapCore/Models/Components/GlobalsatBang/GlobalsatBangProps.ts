import GlobalsatBang from "../../ArrayItems/GlobalsatBang";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface GlobalsatBangProps {
    parentKey: string,
    source: GlobalsatBang,
    stillages: Array<StillageItem>,
    bangs: Array<GlobalsatBang>
}