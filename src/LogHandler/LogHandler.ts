import LogType from "../A100/model/enums/LogType";

export default class LogHandler {
    public static handle(componentName: string, type: LogType, message: string) {
        if (type === LogType.LOG) {
            console.log(`[${type}] in ${componentName}.tsx - ${message}`);
        } else if (type === LogType.ERROR) {
            console.error(`[${type}] in ${componentName}.tsx - ${message}`);
        }
    }
}