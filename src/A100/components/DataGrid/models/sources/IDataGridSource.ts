// export interface IGridHeaderSource {
// 	source: Array<{
// 		key: string,
// 		title: string
// 	}>
// }

export default interface IDataGridSource {
	title?: string,
	headers: Array<{
		key: string,
		type: string,
		title: string,
		isHide: boolean
	}>,
	pages: Array<{
		page: number,
		rows: Array<any>
	}>
}