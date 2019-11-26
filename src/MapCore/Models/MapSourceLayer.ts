import ObjectItem from './ArrayItems/ObjectItem';
import SignatureItem from './ArrayItems/SignatureItem';
import StillageItem from './ArrayItems/StillageItem';
import LayerType from './Enums/LayerType';
import WallItem from './ArrayItems/WallIem';

interface MapSourceLayer {
    id?: number,
    title: string,
    type: LayerType,
    objects?: Array<ObjectItem>, // when prop type is "abstracts"
    stillages?: Array<StillageItem>, // when prop type is "stillages"
    walls?: Array<WallItem> // when prop type is "walls"
}

export default MapSourceLayer;
