
export interface IAnnotationResponse {

}


export default class AnnotationResponse implements IAnnotationResponse {
    constructor() {
    
    }

    static fromJson(data: IAnnotationResponse) {
        let object = new AnnotationResponse();

        return object;
    }
}
