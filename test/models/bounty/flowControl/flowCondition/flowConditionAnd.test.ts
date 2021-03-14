import {FlowConditionAnd} from "../../../../../src/models/bounty/flowControl/flowCondition/flowConditionAnd";
import {FlowConditionEqual} from "../../../../../src/models/bounty/flowControl/flowCondition/flowConditionEqual";


describe("Test creating FlowConditionAnd", () => {
    
    it("Testing creating the object", () => {
        let condition = new FlowConditionAnd([
            new FlowConditionEqual(1, 1),
            new FlowConditionEqual(2, 1)
        ]);
        expect(condition).toBeInstanceOf(FlowConditionAnd);
    });
});
