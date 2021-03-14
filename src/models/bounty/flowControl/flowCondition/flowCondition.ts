
export interface IFlowCondition {
    type: string;
}


export abstract class FlowCondition implements IFlowCondition {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    abstract check(answers: Record<number, number>): boolean;

    static fromJson(data: Nullable<IFlowCondition>): Nullable<FlowCondition> {
        if (data)
            switch(data.type) {
                case "and":
                    return FlowConditionAnd.fromJson(data as IFlowConditionNested);
                case "or":
                    return FlowConditionOr.fromJson(data as IFlowConditionNested);
                case "in":
                    return FlowConditionIn.fromJson(data as IFlowConditionIn);
                case "equal":
                    return FlowConditionEqual.fromJson(data as IFlowConditionEqual);
                default:
                    return undefined;
            }
    }

}

import { FlowConditionAnd, IFlowConditionNested } from "./flowConditionAnd";
import { FlowConditionEqual, IFlowConditionEqual } from "./flowConditionEqual";
import { FlowConditionIn, IFlowConditionIn } from "./flowConditionIn";
import FlowConditionOr from "./flowConditionOr";
