const Crud = artifacts.require("Crud");

contract("Crud", () => {
    var crud = "";

    before(async () => {
        crud = await Crud.deployed();
    });

    it("should be create a player", async () => {
        await crud.create("Anh Kiet");
        const player = await crud.read(1);
        assert(player[0].toNumber() === 1);
        assert(player[1] === "Anh Kiet");
    });

    it("should be update", async () => {
        await crud.create("Anh Kiet");
        await crud.upload(1, "Binh");
        const player = await crud.read(1);
        assert(player[0].toNumber() === 1);
        assert(player[1] === "Binh");
    });

    it("should be return revert is player isn't exist", async () => {
        try {
            await crud.upload(2, "Kiet");
        } catch (e) {
            assert(e.message.includes("Player not exist"));
            return;
        }
    });

    it("should be delete", async () => {
        await crud.remove(1);
        try {
            await crud.read(1);
        } catch (e) {
            assert(e.message.includes("Player not exist"));
            return;
        }
    });
})