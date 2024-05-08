import {HardhatUserConfig} from 'hardhat/types';

import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat';
import 'solidity-coverage';
import {task} from "hardhat/config";
import "hardhat-contract-sizer";
import 'solidity-docgen';
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import 'hardhat-dependency-compiler';

const secret = require("./secret.json");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.17',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100,
                    },
                },
            }
        ],
    },
    namedAccounts: {
        owner: 0,
        user1: 1,
        user2: 2
    },
    networks: {
        goerli: {
            url: secret.url_goerli,
            accounts: [secret.key_dev]
        },
        zksync_mainnet: {
            zksync: true,
            url: secret.url_zksync_mainnet,
            accounts: [secret.key_prd],
            verifyURL: "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
        },
        zksync_sepolia: {
            zksync: true,
            url: secret.url_zksync_sepolia,
            accounts: [secret.key_dev]
        },
        linea_mainnet: {
            url: secret.url_linea_mainnet,
            accounts: [secret.key_prd, secret.key_same_nonce]
        },
        linea_testnet: {
            url: secret.url_linea_testnet,
            accounts: [secret.key_dev, secret.key_same_nonce],
            verify: {
                etherscan: {
                    apiUrl: "https://api-testnet.lineascan.build",
                    apiKey: secret.api_key_linea
                }
            }
        },
        base_sepolia: {
            url: secret.url_base_sepolia,
            accounts: [secret.key_dev, secret.key_same_nonce],
            verify: {
                etherscan: {
                    apiUrl: "https://api-goerli.basescan.org",
                    apiKey: secret.api_key_base
                }
            }
        },
        base_mainnet: {
            url: secret.url_base_mainnet,
            accounts: [secret.key_prd, secret.key_same_nonce],
        },
        blast_sepolia: {
            url: secret.url_blast_sepolia,
            accounts: [secret.key_dev, secret.key_same_nonce]
        },
        blast_mainnet: {
            url: secret.url_blast_mainnet,
            accounts: [secret.key_prd, secret.key_same_nonce]
        },
        zklink_testnet: {
            zksync: true,
            url: secret.url_zklink_testnet,
            accounts: [secret.key_dev]
        },
        zklink_mainnet: {
            zksync: true,
            url: secret.url_zklink_mainnet,
            accounts: [secret.key_prd]
        }
    },
    contractSizer: {
        runOnCompile: false
    }
}
export default config;

