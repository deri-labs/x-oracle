// @ts-nocheck
import {deployments, ethers, network} from "hardhat";
import {XOracle} from "../typechain-types";

export async function deployFixture() {

    await deployments.fixture();

    const users = {
        owner: await ethers.getNamedSigner("owner"),
        user1: await ethers.getNamedSigner("user1"),
        user2: await ethers.getNamedSigner("user2")
    }

    const contracts = {
        oracle: await ethers.getContract<XOracle>("XOracle")
    }

    return {...users, ...contracts};
}

export const forwardTime = async (seconds: number) => {
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
}

export async function deployContract(name, args) {
    const contractFactory = await ethers.getContractFactory(name)
    return await contractFactory.deploy(...args)
}

export function newWallet() {
    return ethers.Wallet.createRandom()
}

export async function reportGasUsed(tx: any, label: any) {
    const {gasUsed} = await ethers.provider.getTransactionReceipt(tx.hash)
    console.info(label, gasUsed.toString())
    return gasUsed
}

export function getEthNumber(amount: BigNumber) {
    return parseInt(ethers.utils.formatEther(amount));
}