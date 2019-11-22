import StillageSizeReducerType from './StillageSizeReducerType';
import StillageSize from './StillageSize';

export default class StillageSizeReducer {
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
}