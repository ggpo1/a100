import BaseUrl from "../data/BaseUrl";
import HeaderItem from "../components/DataGrid/models/HeaderItem";

//https://a100.technovik.ru:1000/api/SeparatedData/headers/defects
export default class SeparatedDataAPI {

    public static async getDefectsHeaders(): Promise<Array<HeaderItem>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.url}api/SeparatedData/headers/defects`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                //console.log(body);
            }).catch(() => {
                // setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

}