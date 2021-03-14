
export interface IBountyNode {
    
}

export class BountyNode {
    static fromJson(data: IBountyNode): BountyNode {
        return new BountyNode();
    }
}


export interface IBountyTemplate {
    name: string;
    description: string;
    strategy: string;
    nodes: BountyNode[];
}


export default class BountyTemplate implements IBountyTemplate {

    constructor(public name: string, public description: string,
                public strategy: string, public nodes: BountyNode[]) {}

    static fromJson(data: IBountyTemplate): BountyTemplate {
        let object = new BountyTemplate(
            data.name,
            data.description,
            data.strategy,
            data.nodes.map((node) => BountyNode.fromJson(node))
        );
        return object;
    }
}
