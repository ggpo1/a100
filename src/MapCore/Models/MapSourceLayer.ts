import ObjectItem from './ArrayItems/ObjectItem';
import SignatureItem from './ArrayItems/SignatureItem';
import StillageItem from './ArrayItems/StillageItem';
import LayerType from './Enums/LayerType';
import WallItem from './ArrayItems/WallIem';
import MapIconsType from "./Enums/MapIconsType";
import TextItem from "./ArrayItems/TextItem";

interface MapSourceLayer {
    id: number,
    key: string,
    title: string,
    type: LayerType,
    mapIconsType: MapIconsType,
    objects?: Array<ObjectItem>, // when prop type is "abstracts"
    stillages?: Array<StillageItem>, // when prop type is "stillages"
    walls?: Array<WallItem> // when prop type is "walls"
    texts?: Array<TextItem>  // when prop type is "text"
}

export default MapSourceLayer;
