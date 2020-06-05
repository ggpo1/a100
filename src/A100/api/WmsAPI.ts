
import BaseUrl from './../data/BaseUrl';
import GlobalsatSensor from './../model/GlobalsatSensor';
import Emit from './../../MapCore/Data/Emit';
import WmsFields from './../model/WmsFields';

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

}