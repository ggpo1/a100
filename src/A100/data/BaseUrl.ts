enum ApiModeType {
    TEST,
    PROD
}

export default class BaseUrl {
    public static mode: ApiModeType = ApiModeType.TEST;
    // public static url: string = 'https://localhost:5001/';
    // public static url: string = 'http://localhost:65233/';
    // public static url: string = 'https://a100.technovik.ru:1000/';

    public static get Url(): string {
        return BaseUrl.mode === ApiModeType.TEST ? 'http://localhost:65233/' : 'https://a100.technovik.ru:1000/';
    }
}