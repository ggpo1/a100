import A100ConnectionDataType from "../model/A100ConnectionDataType";
import MapSourceUnit from "../../MapCore/Models/MapSourceUnit";
import BaseUrl from "../data/BaseUrl";
import LogHandler from "../../LogHandler/LogHandler";
import LogType from "../model/enums/LogType";
import MapSource from "../data/MapSource";
import GlobalsatBang from "../model/GlobalsatBang";
import GlobalsatDeviation from "../model/GlobalsatDeviation";
import Emit from "../../MapCore/Data/Emit";

export default class MapAPI {
    public static async getMap(connectionData: A100ConnectionDataType): Promise<Array<MapSourceUnit>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.url}api/mapengine/map?resoultID=${connectionData.resoultID}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
            }).catch(() => {
                setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

    ///api/mapengine/map/unitnames?resoultID=5020
    public static async getUnitNames(connectionData: A100ConnectionDataType): Promise<Array<string>> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.url}api/mapengine/map/unitnames?resoultID=${connectionData.resoultID}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
            }).catch(() => {
                setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }

    public static async getGlobalsatBangs(connectionData: A100ConnectionDataType): Promise<Array<GlobalsatBang>> {
        return new Promise(resolve => {
            fetch(
                `${BaseUrl.url}api/globalsat/bangs?resoultID=${connectionData.resoultID}`,
                { method: 'GET' }
            ).then(response => response.json()).then(body => {
                LogHandler.handle('MapSource', LogType.LOG, 'fetching GLOBALSAT data...');
                MapSource.globalsatBangs = body;
                Emit.Emitter.emit('setGlobalsatData');
                resolve(body);
            }).catch(e => {
                LogHandler.handle('MapAPI', LogType.ERROR, 'error while fetching GLOBALSAT bangs!');
            });
        });
    }

    public static async getClobalsatDeviations(connectionData: A100ConnectionDataType): Promise<Array<GlobalsatDeviation>> {
        return new Promise(resolve => {
            fetch(
                `${BaseUrl.url}api/globalsat/corners?resoultID=${connectionData.resoultID}`,
                { method: 'GET' }
            ).then(response => response.json()).then(body => {
                MapSource.globalsatDeviations = body;
                Emit.Emitter.emit('setGlobalsatData');
                resolve(body)
            }).catch(e => {
                LogHandler.handle('MapAPI', LogType.ERROR, 'error while fetching GLOBALSAT deviations!');
            });
        });
    }

    // api/mapengine/map/byparams?resoultID=5020&UnitName=5%20Техноавиа%20Екатеринбург&UnitKey=unit_1
    public static async GetMapByParams(connectionData: A100ConnectionDataType, unitName: string, unitKey: string): Promise<any> {
        return new Promise((resolve => {
            fetch(`${BaseUrl.url}api/mapengine/map/byparams?resoultID=${connectionData.resoultID}&UnitName=${unitName}&UnitKey=${unitKey}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
            }).catch((e) => {
                console.log('units catch!');
            })
        }));
    }
}