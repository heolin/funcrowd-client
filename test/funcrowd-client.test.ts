import FuncrowdClient from "../src/funcrowd-client";


describe("Test whole module", () => {
    it("Testing", () => {
        let client: FuncrowdClient = new FuncrowdClient();

        expect(client).toBeInstanceOf(FuncrowdClient);
    });
});