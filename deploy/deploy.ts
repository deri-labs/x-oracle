import {DeployFunction} from 'hardhat-deploy/types';
import {CHAIN_ID_LOCAL, SIGNER_ADDRESS} from "../helpers/constants";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy} = deployments;
    const {owner, user1} = await getNamedAccounts();
    const chainId = await getChainId();

    console.log(`>> deploying Oracle on chainId: ${chainId}, network: ${network.name}`)

    let signer = chainId == CHAIN_ID_LOCAL ? user1 : SIGNER_ADDRESS;
    await deploy('XOracle', {
        from: owner,
        args: [signer],
        log: true,
        waitConfirmations: 1,
    });

};

export default func;
func.tags = ['x-oracle'];
