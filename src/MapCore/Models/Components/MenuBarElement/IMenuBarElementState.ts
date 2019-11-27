import StillageSize from './../../Enums/StillageSize/StillageSize';
import Orientation from './../../Enums/Orientation';
import MenuBarItem from './../../ArrayItems/MenuBarItem';

interface IMenuBarElementState {
    stillageSize: StillageSize,
    stillageOrientation: Orientation,
    stillageCaption: boolean,
    source: MenuBarItem,
}

export default IMenuBarElementState;
