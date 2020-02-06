import StillageSizeReducerType from './StillageSizeReducerType';
import StillageSize from './StillageSize';
import Orientation from "../Orientation";


export default class StillageSizeReducer {
    public A100SizeK = 30;


    public GetSize(stillageSize: StillageSize): StillageSizeReducerType {
        let size: StillageSizeReducerType = stillageSize === StillageSize.NORMAL ? (
            {
                firstSide: 75,
                secondSide: 25,
            }
        ) : (
                {
                    firstSide: 50,
                    secondSide: 25,
                }
            );
        return size;
    }

    public GetA100Size(pmCount: number, orientation: Orientation, scale: number, isBlockScaling: boolean) {
        if (scale > 1 && isBlockScaling) {
            if (orientation === Orientation.HORIZONTAL) {
                return {
                    firstSide: this.A100SizeK * pmCount * scale,
                    secondSide: this.A100SizeK * scale * 2
                }
            } else if (orientation === Orientation.VERTICAL) {
                return {
                    firstSide: this.A100SizeK * scale * 2,
                    secondSide: this.A100SizeK * pmCount * scale
                }
            } else {
                return {
                    firstSide: 0,
                    secondSide: 0
                }
            }
        } else if (scale === 1 && isBlockScaling) {
            if (orientation === Orientation.HORIZONTAL) {
                return {
                    firstSide: this.A100SizeK * pmCount * 2,
                    secondSide: this.A100SizeK * scale * 2
                }
            } else if (orientation === Orientation.VERTICAL) {
                return {
                    firstSide: this.A100SizeK * scale * 2,
                    secondSide: this.A100SizeK * pmCount * 2
                }
            } else {
                return {
                    firstSide: 0,
                    secondSide: 0
                }
            }
        } else {
            if (orientation === Orientation.HORIZONTAL) {
                return {
                    firstSide: this.A100SizeK * pmCount * scale,
                    secondSide: this.A100SizeK * scale
                }
            } else if (orientation === Orientation.VERTICAL) {
                return {
                    firstSide: this.A100SizeK * scale,
                    secondSide: this.A100SizeK * pmCount * scale
                }
            } else {
                return { firstSide: 0, secondSide: 0 }
            }
        }
    }
}