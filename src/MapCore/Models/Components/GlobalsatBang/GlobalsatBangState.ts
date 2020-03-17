import GlobalsatBang from "../../ArrayItems/GlobalsatBang";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface GlobalsatBangState {
    parentKey: string,
    source: GlobalsatBang,
    stillages: Array<StillageItem>,
    rect: any,
    needStillages: { LOW?: StillageItem, HIGH?: StillageItem },
    isInfoRect: boolean,
    bangs: Array<GlobalsatBang>,
    selectedBangIndex: number
}