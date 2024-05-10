import {ethers} from "hardhat";
import {WOJAK_ID} from "../helpers/ids";

async function update() {

    let xOracle = await ethers.getContract("XOracle");
    let res = await fetch("http://64.52.80.238:9022/feed/latest_price_data?id=0x0000000000000000000000000000000000000003")
    let updateData = (await res.json())["data"]["updateData"]

    await (await xOracle.updatePrice(updateData));

    let price = await xOracle.getPrice(WOJAK_ID);
    console.log(price.id)
    console.log(price.price)
    console.log(price.conf)
    console.log(price.decimals)
    console.log(price.timestamp)

}


update()