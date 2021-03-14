import { FlowCondition, IFlowCondition } from "./flowCondition";


export interface IFlowConditionEqual extends IFlowCondition {
    task: number;
    answer: number;
}


export class FlowConditionEqual extends FlowCondition {
    constructor(public task: number, 
                public answer: number) {
        super("equal");
    }

    check(answers: Record<number, number>): boolean {
        return answers[this.task] == this.answer;
    }

    static fromJson(data: Nullable<IFlowConditionEqual>): Nullable<FlowConditionEqual> {
        if (data)
            return new FlowConditionEqual(data.task, data.answer);
    }
}
