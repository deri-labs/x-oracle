import {ethers} from "hardhat";
import {BTC_ID} from "../helpers/ids";

async function update(){

    let xOracle = await ethers.getContract("XOracle");
    let res = await fetch("http://localhost:9022/feed/latest_update_data?id=0x0000000000000000000000000000000000000001")
    let updateData = (await res.json())["data"]

    await (await xOracle.updatePrice(updateData));

    let price = await xOracle.getPrice(BTC_ID);
    console.log(price.id)
    console.log(price.price)
    console.log(price.conf)
    console.log(price.decimals)
    console.log(price.timestamp)

}


update()