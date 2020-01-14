import A100ConnectionDataType from "../model/A100ConnectionDataType";
import MapSourceUnit from "../../MapCore/Models/MapSourceUnit";

export default class MapAPI {
    public async getMap(connectionData: A100ConnectionDataType): Promise<Array<MapSourceUnit>> {
        return new Promise((resolve => {
            fetch('BaseUrl/api/me/map?...', {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
              resolve(body);
            })
        }));
    }
}