import {deployFixture} from "../helpers/utils";
import {ethers} from "hardhat";
import {BTC_ID} from "../helpers/ids";
import {getCurrentTimestamp} from "hardhat/internal/hardhat-network/provider/utils/getCurrentTimestamp";
import {expect} from "chai";

describe("XOracle", async () => {

    let owner: any,
        user1: any,
        oracle: any

    beforeEach(async () => {
        ({owner, user1, oracle} = await deployFixture());
    });

    it("check oracle verify and update", async () => {
        let timestamp = getCurrentTimestamp();
        let data = [BTC_ID, 60000, 10, 0, timestamp];
        let packedData = ethers.utils.solidityPack(["address", "uint64", "uint64", "uint32", "uint256"], data);
        let priceHash = ethers.utils.keccak256(packedData);
        let signature = await user1.signMessage(ethers.utils.arrayify(priceHash));
        const sig = ethers.utils.splitSignature(signature);

        data.push(sig.v, sig.r, sig.s);
        let updateData = ethers.utils.defaultAbiCoder.encode(
            ["address", "uint64", "uint64", "uint32", "uint256", "uint8", "bytes32", "bytes32"], data);
        await oracle.updatePrice([updateData]);

        let result = await oracle.getPrice(BTC_ID);
        expect(result.id).to.eq(BTC_ID);
        expect(result.price).to.eq(60000);
        expect(result.conf).to.eq(10);
        expect(result.decimals).to.eq(0);
        expect(result.timestamp).to.eq(timestamp);
    })

});
