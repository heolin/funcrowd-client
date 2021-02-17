import RankingRow, { IRankingRow } from "./rankingRow";


export default class Ranking {
    constructor(public rows: RankingRow[] = []) {}

    static fromJson(data: any) {
        let rows = data.map((rowData: IRankingRow) => RankingRow.fromJson(rowData));
        let object = new Ranking(rows);
        return object;
    }
}
