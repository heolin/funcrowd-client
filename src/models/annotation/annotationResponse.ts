import Feedback from "./feedback";

interface IAnnotationDTO {
    itemId: number;
    data: Record<string, any>;
    skipped: boolean;
    feedback: Feedback,
    attempt: number
}

class AnnotationDTO implements IAnnotationDTO {
    constructor(public itemId: number, public data: Record<string, any>,
                public skipped: boolean, public feedback: Feedback,
                public attempt: number) {}

    static fromJson(data: IAnnotationDTO): AnnotationDTO {
        let object = new AnnotationDTO(
            data.itemId,
            data.data,
            data.skipped,
            Feedback.fromJson(data.feedback),
            data.attempt
        )
        return object;
    }
}



export interface IAnnotationResponse {
    annotation: IAnnotationDTO,
    nextItemId: number,
    isVerified: boolean,
    expBase: number,
    expBonus: number,
    errors: any[]
}


export default class AnnotationResponse implements IAnnotationResponse {
    constructor(public annotation: IAnnotationDTO, public nextItemId: number,
                public isVerified: boolean, public expBase: number,
                public expBonus: number, public errors: any[]) {}

    static fromJson(data: IAnnotationResponse): AnnotationResponse {
        let object = new AnnotationResponse(
            AnnotationDTO.fromJson(data.annotation),
            data.nextItemId,
            data.isVerified,
            data.expBase,
            data.expBonus,
            data.errors
        );

        return object;
    }

    get feedback(): Feedback {
        return this.annotation.feedback;
    }
}
