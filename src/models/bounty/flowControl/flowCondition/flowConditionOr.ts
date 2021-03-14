import { FlowCondition } from "./flowCondition";
import {IFlowConditionNested} from "./flowConditionAnd";


export default class FlowConditionOr extends FlowCondition {
    constructor(public children: Nullable<FlowCondition>[]) {
        super("or");
    }

    check(answers: Record<number, number>): boolean {
        for (let child of this.children) {
            if (child && child.check(answers))
                return true;
        }
        return false;
    }

    static fromJson(data: Nullable<IFlowConditionNested>): Nullable<FlowConditionOr> {
        if (data)
            return new FlowConditionOr(
                data.children.map((child) => FlowCondition.fromJson(child))
            );
    }
}
