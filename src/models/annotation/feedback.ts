
interface IFeedback {
    
}


export default class Feedback implements IFeedback {
    constructor() {
    }

    static fromJson(data: IFeedback) {
        let object = new Feedback(
        );
        return object;
    }
}
