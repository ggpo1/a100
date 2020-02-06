import A100ConnectionDataType from "../model/A100ConnectionDataType";
import MapSourceUnit from "../../MapCore/Models/MapSourceUnit";
import BaseUrl from "../data/BaseUrl";
import LogHandler from "../../LogHandler/LogHandler";
import LogType from "../model/enums/LogType";

export default class MapAPI {
    public async getMap(connectionData: A100ConnectionDataType): Promise<Array<MapSourceUnit>> {
        let url = BaseUrl.url + 'api/mapengine/map?resoultID=' + connectionData.resoultID;
        return new Promise((resolve => {
            fetch(url, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
            }).catch(error => LogHandler.handle('MapAPI', LogType.ERROR, 'error while fetching data from A100'))
        }));
    }
}