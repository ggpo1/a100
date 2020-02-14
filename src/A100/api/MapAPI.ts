import A100ConnectionDataType from "../model/A100ConnectionDataType";
import MapSourceUnit from "../../MapCore/Models/MapSourceUnit";
import BaseUrl from "../data/BaseUrl";
import LogHandler from "../../LogHandler/LogHandler";
import LogType from "../model/enums/LogType";
import MapSource from "../data/MapSource";

export default class MapAPI {
    public async getMap(connectionData: A100ConnectionDataType): Promise<Array<MapSourceUnit>> {
        let url = BaseUrl.url + 'api/mapengine/map?resoultID=' + connectionData.resoultID;
        return new Promise((resolve => {
            fetch(url, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
            }).catch(() => {
                setTimeout(() => MapSource.GetMap(), 2000);
            })
        }));
    }
}