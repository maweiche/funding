import axios from "axios";
import internal from "stream";

// covalent key
const key = 'ckey_da302f1c19694bdbbab1f7ae1ce';

// Test NFT Contract Address (PUDGY PENGUINS)
const ppg_contract_address = '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8';
const crypto_punks_contract_address = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
const bayc_contract_address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
const azuki_contract_address = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

// Test Block Height
const starting_block = 13000000;
const ending_block = 13000001;

// Chain : ChainID
const ethereumChainId = 1;
const goerliChainId = 5;
const polygonChainId = 137;
const bnbChainId = 56;
const fantomChainId = 250;
const avaxChainId = 43114;


export const getLatestBlockHeight = async (chainId: number) => {
    console.log('chain id: ', chainId);
    try {
        const response = await axios.get(
        `https://api.covalenthq.com/v1/${chainId}/block_v2/latest/?key=${key}`
        );
        console.log('response: ', response);
        return response.data.data.items[0].height;
    } catch (error) {
        console.log(error);
    }
}

// sample output
// {
//     "updated_at":"2022-10-20T22:15:01.917518380Z"
//     "items":[
//     0:{
//     "signed_at":"2022-10-20T22:14:57Z"
//     "height":8458593
//     }
//     ]
//     "pagination":NULL
// }

// average amount of blocks mined per day 7154.5

// Gets the changes in amount of token holders for a given contract address, chain, and starting/ending block height. 
//You can use 'latest' for the most recent block height.

export const getChangesInTokenHolders = async (chainId: number, contractAddress: string, startingBlock: number, endingBlock: number ) => {
    try {
        const response = await axios.get(
        `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/token_holders_changes/?starting-block=${startingBlock}&ending-block=${endingBlock}/?key=${key}`
        );
        console.log(response.data.data.items);
        return response.data.data.items;
    } catch (error) {
        console.log(error);
    }
};

// sample output with a page size of 3 on the pudgy penguins contract
// {
//     "updated_at":"2022-10-20T21:34:02.577837317Z"
//     "items":[
//     0:{
//     "token_holder":"0x2c2c2f6dbe08942280d4f7626b6bad5c11d20215"
//     "prev_balance":"0"
//     "prev_block_height":12500100
//     "next_balance":"83"
//     "next_block_height":13210000
//     "diff":"83"
//     }
//     1:{
//     "token_holder":"0x23a2f8da2e70e27ca96c70b2df800a75864975a5"
//     "prev_balance":"0"
//     "prev_block_height":12500100
//     "next_balance":"75"
//     "next_block_height":13210000
//     "diff":"75"
//     }
//     2:{
//     "token_holder":"0x5f3fb82ba7d9951d5c7f75c8cce68388450c62ec"
//     "prev_balance":"0"
//     "prev_block_height":12500100
//     "next_balance":"56"
//     "next_block_height":13210000
//     "diff":"56"
//     }
//     3:{
//     "token_holder":"0x9b353523f266b3e1740f4077f5ca6a5ad070cd8d"
//     "prev_balance":"0"
//     "prev_block_height":12500100
//     "next_balance":"51"
//     "next_block_height":13210000
//     "diff":"51"
//     }
//     ]
//     "pagination":{
//     "has_more":true
//     "page_number":0
//     "page_size":3
//     "total_count":NULL
//     }
// }

export const getTokenTransfers = async (chainId: number, contractAddress: string, startingBlock: number, endingBlock: number ) => {
    try {
        const response = await axios.get(
        `https://api.covalenthq.com/v1/${chainId}/address/${contractAddress}/transfers_v2/?starting-block=${startingBlock}&ending-block=${endingBlock}/?key=${key}`
        );
        
        return response.data.data.items;
    } catch (error) {
        console.log(error);
    }
}