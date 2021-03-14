import { FlowCondition, IFlowCondition } from "./flowCondition";


export interface IFlowConditionIn extends IFlowCondition {
    task: number;
    answers: number[];
}


export class FlowConditionIn extends FlowCondition {
    constructor(public task: number, 
                public answers: number[]) {
        super("in");
    }

    check(answers: Record<number, number>): boolean {
        return this.answers.includes(answers[this.task]);
    }

    static fromJson(data: Nullable<IFlowConditionIn>): Nullable<FlowConditionIn> {
        if (data)
            return new FlowConditionIn(data.task, data.answers);
    }
}
