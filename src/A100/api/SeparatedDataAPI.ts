import BaseUrl from "../data/BaseUrl";
import HeaderItem from "../components/DataGrid/models/HeaderItem";
import DefectsGridData from './../data/DefectsGridData';
import Emit from './../../MapCore/Data/Emit';

// https://a100.technovik.ru:1000/api/SeparatedData/headers/defects
// https://a100.technovik.ru:1000/api/SeparatedData/defects?resoultID=5020&page=10
// https://a100.technovik.ru:1000/api/SeparatedData/additional/elements
// https://a100.technovik.ru:1000/api/SeparatedData/additional/defecttypes
// https://a100.technovik.ru:1000/api/SeparatedData/all/defects?resoultID=5020
export default class SeparatedDataAPI {

    public static async getDefectsHeaders(): Promise<Array<HeaderItem>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/separatedData/headers/defects`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                DefectsGridData.DefectsHeaders = body;
                resolve(body);
                Emit.Emitter.emit('setDefectsViewDatagridHeaders', body);
            }).catch(() => {
                // setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

    public static async getSeparatedDefects(resoultID: number, page: number): Promise<Array<any>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/separatedData/defects?resoultID=${resoultID}&page=${page}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                DefectsGridData.DefectsHeaders = body;
                resolve(body);
                // console.log(body);
                Emit.Emitter.emit('setDefectsViewDatagridPages', body, page);
            }).catch(() => {
                // setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

    public static async getWholeDefects(resoultID: number): Promise<Array<any>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/separatedData/all/defects?resoultID=${resoultID}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                DefectsGridData.DefectsHeaders = body;
                resolve(body);
                Emit.Emitter.emit('setWholeDefects', body);
            }).catch(() => {
                // setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

    public static async getElements(): Promise<Array<any>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/separatedData/additional/elements`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                DefectsGridData.DefectsHeaders = body;
                resolve(body);

                Emit.Emitter.emit('setDefectsElements', body);
            }).catch(() => {
                // setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

    public static async getDefectTypes(): Promise<Array<any>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/separatedData/additional/defecttypes`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                DefectsGridData.DefectsHeaders = body;
                resolve(body);
                Emit.Emitter.emit('setDefectTypes', body);
            }).catch(() => {
                // setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

}