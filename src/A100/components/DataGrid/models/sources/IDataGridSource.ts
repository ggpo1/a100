// export interface IGridHeaderSource {
import HeaderItem from './../HeaderItem';
import IPageItem from './../IPageItem';
import ViewType from './../../../../model/enums/ViewType';
// 	source: Array<{
// 		key: string,
// 		title: string
// 	}>
// }

export default interface IDataGridSource {
	title?: string,
	headers: Array<HeaderItem>,
	pages: Array<IPageItem>
}