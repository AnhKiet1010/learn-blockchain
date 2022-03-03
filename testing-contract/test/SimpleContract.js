const Simple = artifacts.require("Simple");

contract("Simple", () => {
    it("should be deployed", async () => {
        const simpleContract = await Simple.deployed();
        assert(simpleContract.address !== "");
    });

    it("should be say hello", async () => {
        const simpleContract = await Simple.deployed();
        assert(await simpleContract.sayHello() === "Hello Kiet");
    });
})