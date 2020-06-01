import ViewType from './../model/enums/ViewType';

export default class PagerEmitGenerator {

    public static generate(type: ViewType): string {
        return `${type}_pager_request`;
    }
}