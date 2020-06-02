import IDataGridSource from '../../sources/IDataGridSource';
import ViewType from './../../../../../model/enums/ViewType';

export default interface IDataGridProps {
	source: IDataGridSource,
	viewType: ViewType,
	wholeData: Array<any>
}