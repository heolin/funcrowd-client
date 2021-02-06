import Context from "../src/context";
import SessionManager from "../src/session/sessionManager";
import { sessionManagerFixture } from "./config/fixtures";

describe("Test creating Context object", () => {
    let sessionManager: SessionManager = sessionManagerFixture();
    
    it("Testing creating the object", () => {
        let context: Context = new Context(sessionManager);
        expect(context).toBeInstanceOf(Context);
    });
});
