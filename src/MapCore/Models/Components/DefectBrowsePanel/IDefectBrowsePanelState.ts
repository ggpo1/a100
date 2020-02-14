import VikItem from "../../ArrayItems/VikItem";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface IDefectBrowsePanelState {
    selectedPage: number,
    panelWidthPer: string,
    fullWidthPx: number,
    isResize: boolean,
    source?: VikItem,
    parentSource: StillageItem,
    isPhotoWatcher: boolean,
    selectedPhoto: number,
}