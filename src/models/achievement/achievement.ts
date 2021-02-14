
export interface IAchievement {

}


export default class Achievement implements IAchievement {
    constructor() {
    
    }

    static fromJson(data: IAchievement) {
        return new Achievement();
    }
}
