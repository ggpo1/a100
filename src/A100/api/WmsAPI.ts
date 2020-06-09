
import BaseUrl from './../data/BaseUrl';
import GlobalsatSensor from './../model/GlobalsatSensor';
import Emit from './../../MapCore/Data/Emit';
import WmsFields from './../model/WmsFields';
import AddNewWmsFieldDTO from './../model/DTO/AddNewWmsFieldDTO';
import GlobalsatBang from './../../MapCore/Components/GlobalsatBang';
import LogType from './../model/enums/LogType';
import LogHandler from './../../LogHandler/LogHandler';

export default class WmsAPI {

    public static async getUnitsByResoult(resoultID): Promise<Array<string>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/wms/units?resoultID=${resoultID}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                Emit.Emitter.emit('setWMSUnitNamesEmit', body);
            }).catch(() => {

            })
        }));
    }

    public static async getResoultSensors(resoultID): Promise<Array<GlobalsatSensor>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/globalsat/sensors?resoultID=${resoultID}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                // console.log(body);
                Emit.Emitter.emit('setSensorsAddressEmit', body);
            }).catch(() => {

            })
        }));
    }

    public static async getSensorsWmsFields(resoultID): Promise<Array<WmsFields>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/wms/fields?resoultID=${resoultID}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                // console.log(body);
                Emit.Emitter.emit('setWmsFieldsEmit', body);
            }).catch(() => {

            })
        }));
    }

    public static async addField(field: AddNewWmsFieldDTO): Promise<any> {
        return new Promise((resolve) => {
            fetch(`${BaseUrl.Url}api/wms/fields`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(field),
            }).then((response) => response.json()).then((body) => {
                // resolve(body);
                // console.log(body);
                Emit.Emitter.emit('addNewFieldToSource', body);
            }).catch(() => {

            })
        });
    }

    public static async removeField(id: number): Promise<Array<WmsFields>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.Url}api/wms/fields?ID=${id}`, {
                method: 'DELETE',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                // console.log(body);
                // Emit.Emitter.emit('setWmsFieldsEmit', body);
            }).catch(() => {

            })
        }));
    }

    public static async getGlobalsatBangs(resoultID: number): Promise<Array<GlobalsatBang>> {
        return new Promise(resolve => {
            fetch(`${BaseUrl.Url}api/globalsat/bangs?resoultID=${resoultID}`,
                { method: 'GET' }
            ).then(response => response.json()).then(body => {
                LogHandler.handle('DashboardView', LogType.LOG, 'fetching GLOBALSAT data...');
                Emit.Emitter.emit('setDashboardGlobalsatBangsList', body);
                resolve(body);
            }).catch(e => {
                LogHandler.handle('WmsAPI', LogType.ERROR, 'error while fetching GLOBALSAT bangs!');
            });
        });
    }

}