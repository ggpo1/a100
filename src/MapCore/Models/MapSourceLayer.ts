import ObjectItem from './ArrayItems/ObjectItem';
import SignatureItem from './ArrayItems/SignatureItem';
import StillageItem from './ArrayItems/StillageItem';
import LayerType from './Enums/LayerType';

interface MapSourceLayer {
    id?: number,
    title: string,
    type: LayerType,
    objects?: Array<ObjectItem>, // when prop type is "abstracts"
    stillages?: Array<StillageItem>, // when prop type is "stillages"
    signatures?: Array<SignatureItem>, // when prop type is "signatures"
    walls?: Array<any> // when prop type is "walls" // TODO add model
}

export default MapSourceLayer;
