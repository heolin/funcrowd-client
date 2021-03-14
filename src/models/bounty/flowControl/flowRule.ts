import { FlowCondition, IFlowCondition } from "./flowCondition/flowCondition";


export interface IFlowRule {
    from: number;
    to: number;
    on: Nullable<FlowCondition>
}


export class FlowRule implements IFlowRule {
    constructor(public from: number,
                public to: number,
                public on: Nullable<FlowCondition>) {}

    check(answers: Record<number, number>): boolean {
        if (this.on)
            return this.on.check(answers);
        return true;
    }

    static fromJson(data: IFlowRule): FlowRule {
        return new FlowRule(
            data.from,
            data.to,
            FlowCondition.fromJson(data.on as IFlowCondition)
        );
    }
}
