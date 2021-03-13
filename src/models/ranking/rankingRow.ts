
export interface IRankingRow {
    position    : number,
    userId: number,
    username: string,
    value: number
}


/**
 * 
 */
export default class RankingRow implements IRankingRow {

    constructor(public position: number, public userId: number,
                public username: string, public value: number) {}
                

    static fromJson(data: IRankingRow) {
        let row = new RankingRow(
            data.position,
            data.userId,
            data.username,
            data.value
        );
        return row;
    }
}

