import { FlowCondition, IFlowCondition } from "./flowCondition";


export interface IFlowConditionNested extends IFlowCondition {
    children: Nullable<IFlowCondition>[];
}


export class FlowConditionAnd extends FlowCondition {
    constructor(public children: Nullable<FlowCondition>[]) {
        super("and");
    }

    check(answers: Record<number, number>): boolean {
        for (let child of this.children) {
            if (child && !child.check(answers))
                return false;
        }
        return true;
    }

    static fromJson(data: Nullable<IFlowConditionNested>): Nullable<FlowConditionAnd> {
        if (data)
            return new FlowConditionAnd(
                data.children.map((child) => FlowCondition.fromJson(child))
            );
    }
}