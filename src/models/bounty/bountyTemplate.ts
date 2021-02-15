
export interface IBountyTemplate {

}


export default class BountyTemplate implements IBountyTemplate {

    constructor() {

    }


    static fromJson(data: IBountyTemplate): BountyTemplate {
        let object = new BountyTemplate();
        return object;
    }
}