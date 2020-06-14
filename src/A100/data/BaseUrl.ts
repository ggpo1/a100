enum ApiModeType {
    TEST,
    PROD
}

const URLS = {
    prod: 'https://a100.technovik.ru:1000/',
    test: 'http://localhost:65233/'
}

export default class BaseUrl {
    public static mode: ApiModeType = ApiModeType.TEST;

    public static get Url(): string {
        return BaseUrl.mode === ApiModeType.TEST ? URLS.test : URLS.prod;
    }
}