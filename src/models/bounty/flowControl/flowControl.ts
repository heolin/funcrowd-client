import { FlowRule, IFlowRule } from "./flowRule";


export interface IFlowControl {
    rules: IFlowRule[] 
}


export default class FlowControl {
    public currentNode: number;
    private _answers: Record<number, number>;
    private _nodeRules: Record<number, FlowRule[]>;

    constructor(public rules: FlowRule[], initialNode: number = 0) {

        this.currentNode = initialNode;
        this._answers = {};
        this._nodeRules = this._initializeNodeRules(rules);
    }

    get isFinished() {
        return this.currentNode == undefined;
    }

    private _initializeNodeRules(rules: FlowRule[]) {
        let _nodeRules: Record<number, FlowRule[]> = {};
        rules.map((rule: FlowRule) => {
            if (!(rule.from in _nodeRules))
                _nodeRules[rule.from] = [];
            _nodeRules[rule.from].push(rule);
        });

        return _nodeRules;
    }

    private _getFlowRule(): Nullable<FlowRule> {
        let rules = this._nodeRules[this.currentNode];

        for (let rule of rules) {
            if (rule.check(this._answers))
                return rule;
        }
        throw Error("No FlowRule was matched to handle this configuration.");
    }

    consume(answer: number) {
        this._answers[this.currentNode] = answer;
        let rule = this._getFlowRule();
        if (rule)
            this.currentNode = rule.to;
    }
    
    static fromJson(data: IFlowControl): FlowControl {
        return new FlowControl(
            data.rules.map((rule) => FlowRule.fromJson(rule))
        );
    }
}
