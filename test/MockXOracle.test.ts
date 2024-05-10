import {deployContract, deployFixture} from "../helpers/utils";
import {ethers} from "hardhat";
import {BTC_ID} from "../helpers/ids";
import {getCurrentTimestamp} from "hardhat/internal/hardhat-network/provider/utils/getCurrentTimestamp";
import {expect} from "chai";

describe("MockXOracle", async () => {

    let mockOracle: any

    beforeEach(async () => {
        mockOracle = await deployContract("MockXOracle", []);
    });

    it("check mock price suc", async () => {
        let timestamp = getCurrentTimestamp();
        let data = [BTC_ID, 60000, 10, 0, timestamp];
        let updateData = await mockOracle.createUpdateData(...data);
        await mockOracle.updatePrice(updateData);

        let result = await mockOracle.getPrice(BTC_ID);
        expect(result.id).to.eq(BTC_ID);
        expect(result.price).to.eq(60000);
        expect(result.conf).to.eq(10);
        expect(result.decimals).to.eq(0);
        expect(result.timestamp).to.eq(timestamp);
    })

});
