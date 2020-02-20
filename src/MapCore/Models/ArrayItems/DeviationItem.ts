import StillageItem from "./StillageItem";
import SignaturePosition from "../Enums/SignaturePosition";

export default interface DeviationItem {
    id: number,
    key: string,
    deviationPosition: SignaturePosition,
    arrowFirstToSecond: boolean,
    stillageID?: number,
}

