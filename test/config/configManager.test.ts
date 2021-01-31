import ConfigBuilder from "../../src/config/configBuilder";
import ConfigManager from "../../src/config/configManager";
import User from "../../src/models/user/user";


describe("Test ConfigManager", () => {
    const configBuilder: ConfigBuilder = new ConfigBuilder();
    const user: User = new User();


    it("Creating a ConfigManager object", () => {
        let manager: ConfigManager = new ConfigManager(configBuilder);
        expect(manager).toBeInstanceOf(ConfigManager);
        expect(manager.user).toBeUndefined();
    });

    it("Setuping user", () => {
        let manager: ConfigManager = new ConfigManager(configBuilder);
        manager.setupUser(user);
        expect(manager.config).not.toBeUndefined();
        
    });
});
