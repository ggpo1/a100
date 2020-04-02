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
		title: string
	}>,
	pages: Array<{
		page: number,
		rows: Array<any>
	}>
}