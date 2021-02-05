import ConfigBuilder from "../../src/session/configBuilder";


describe("Test ConfigBuilder", () => {
    it("Creating a builder object", () => {
        expect(new ConfigBuilder()).toBeInstanceOf(ConfigBuilder);
    });

    it("Creating a config", () => {
        let builder: ConfigBuilder = new ConfigBuilder();
        expect(builder.create()).toBeInstanceOf(Object);
    });
});
