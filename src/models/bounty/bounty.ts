
export interface IBounty {

}


export default class Bounty implements IBounty {
    constructor() {
    
    }

    static fromJson(data: IBounty) {
        return new Bounty();
    }

    newItem() {
        
    }
}
