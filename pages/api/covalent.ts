import axios from "axios";
import { ethers } from "ethers";

// ABI DECODING SOMETHING, BUT VALUES ARE NOT MATCHING UP



//working block
//https://api.covalenthq.com/v1/80001/events/address/0xaf28cb0d9E045170E1642321B964740784E7dC64/?quote-currency=USD&format=JSON&starting-block=28824286&ending-block=28824287&key=ckey_da302f1c19694bdbbab1f7ae1ce


//Ethers functions

const utils = ethers.utils;

// Transfer Topic
const transfer_sig = 'Transfer(address,address,uint256)';

const transfer_topic = utils.toUtf8Bytes(transfer_sig);
console.log('transfer topic', transfer_topic);

const transfer_keccak256 = utils.keccak256(transfer_topic);
console.log('transfer keccak256', transfer_keccak256);

// Swapped Topic
const swapped_sig = 'Swapped(address,address,uint256,address,uint256,address)';
const swapped_topic = utils.toUtf8Bytes(swapped_sig);
console.log('swapped topic', swapped_topic);

const swapped_keccak256 = utils.keccak256(swapped_topic);
console.log('swapped keccak256', swapped_keccak256);

// Zeta Sent Topic
const zeta_sent_sig = 'ZetaSent(address,address,uint256,bytes,uint256,uint256,bytes,bytes)';
const zeta_sent_topic = utils.toUtf8Bytes(zeta_sent_sig);
console.log('zeta sent topic', zeta_sent_topic);

const zeta_sent_keccak256 = utils.keccak256(zeta_sent_topic);
console.log('zeta sent keccak256', zeta_sent_keccak256);




const decodedLog = utils.defaultAbiCoder.decode(['uint256'], '0x0000000000000000000000000000000000000000000000003db758145ca5d960');
console.log('this is the decodedLog', decodedLog);
// abiCoder.decode([ "uint a", "tuple(uint256 b, string c) d" ], data);??????
const decodedLogString = utils.defaultAbiCoder.decode(['uint256'], '0x0000000000000000000000000000000000000000000000003db758145ca5d960')[0].toString();
console.log('this is the decodedLogString', decodedLogString);





// WE ONLY NEED POLYGON MUMBAI
//contract addy: 0xFfF3B40f7905704ce5Ae876b59B6E1C30fBEa995

//TRANSFER TOPIC: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
//{"indexed":false,"internalType":"address","name":"receiverAddress","type":"address"}],"name":"Swapped","type":"event"}

// covalent key
const key = 'ckey_da302f1c19694bdbbab1f7ae1ce';

const eye_seek_contract_address = '0xFfF3B40f7905704ce5Ae876b59B6E1C30fBEa995';
const multi_chain_swap_address = '0xaf28cb0d9E045170E1642321B964740784E7dC64'

// Test NFT Contract Address (PUDGY PENGUINS)
const ppg_contract_address = '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8';
const crypto_punks_contract_address = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
const bayc_contract_address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
const azuki_contract_address = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

// Test Block Height
const starting_block = 13000000;
const ending_block = 13000001;

// Chain : ChainID

const polygonChainId = 137;
const polygonMumbaiChainId = 80001;
const bnbChainId = 56;
const fantomChainId = 250;



export const getLatestBlockHeight = async () => {
   
    try {
        const response = await axios.get(
        `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/block_v2/latest/?key=${key}`
        );
        console.log('response: ', response);
        return response.data.data.items[0].height;
    } catch (error) {
        console.log(error);
    }
}

export const getLogEvents = async (startingBlock: number , endingBlock: number) => {
    try {
        // abiDecoder.addABI(sampleABI);
        console.log('passing in these params: ', polygonMumbaiChainId, multi_chain_swap_address, startingBlock, endingBlock);
        console.log('link to check:', `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/events/address/${multi_chain_swap_address}/?quote-currency=USD&format=JSON&starting-block=${startingBlock}&ending-block=${endingBlock}&key=${key}`)
        const response = await axios.get(
            //Test Link w/ params filled in (limited to page size of 25)
            `https://api.covalenthq.com/v1/80001/events/address/0xaf28cb0d9E045170E1642321B964740784E7dC64/?quote-currency=USD&format=JSON&starting-block=28824286&ending-block=28824287&page-size=100&key=ckey_da302f1c19694bdbbab1f7ae1ce`

            //Dynamic Link
            // `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/events/address/${multi_chain_swap_address}/?quote-currency=USD&format=JSON&starting-block=${startingBlock}&ending-block=${endingBlock}&key=${key}`
        );
        console.log('log events response: ', response.data.data);
        // example response from getLogEvents, we need to parse this for the "raw_log_data" then decode the log events using TypeScript
// {
//     "data": {
//     "updated_at": "2022-10-25T14:06:04.760220603Z",
//     "items": [
//     {
//     "block_signed_at": "2022-10-25T14:04:57Z",
//     "block_height": 28804728,
//     "tx_offset": 16,
//     "log_offset": 86,
//     "tx_hash": "0xf48addc383fa1691f42f0c513fafc65437f76b8afcab2479ad7d074e5eb6f26e",
//     "raw_log_topics": [
//     "0x6135b536e33070976edb6dc1ecd6f9235b0d3a24970b028cd9dc6994bd0d5ec0"
//     ],
//     "sender_contract_decimals": 0,
//     "sender_name": null,
//     "sender_contract_ticker_symbol": null,
//     "sender_address": "0xaf28cb0d9e045170e1642321b964740784e7dc64",
//     "sender_address_label": null,
//     "sender_logo_url": "https://logos.covalenthq.com/tokens/80001/0xaf28cb0d9e045170e1642321b964740784e7dc64.png",
//     "raw_log_data": "0x000000000000000000000000388629844f89dbb8833569cc46ae75a4b587bba2000000000000000000000000ae13d989dac2f0debff460ac112a837c89baa7cd0000000000000000000000000000000000000000000000000429d069189e0000000000000000000000000000000080383847bd75f91c168269aa74004877592f0000000000000000000000000000000000000000000000003db758145ca5d960000000000000000000000000388629844f89dbb8833569cc46ae75a4b587bba2",
//     "decoded": null
//     },
//     {
//     "block_signed_at": "2022-10-25T14:04:57Z",
//     "block_height": 28804728,
//     "tx_offset": 17,
//     "log_offset": 92,
//     "tx_hash": "0xb1c21c89d2eb882be1836a2ef0a83a6115dcd1ba69012f66697ea1092e938302",
//     "raw_log_topics": [
//     "0x6135b536e33070976edb6dc1ecd6f9235b0d3a24970b028cd9dc6994bd0d5ec0"
//     ],
//     "sender_contract_decimals": 0,
//     "sender_name": null,
//     "sender_contract_ticker_symbol": null,
//     "sender_address": "0xaf28cb0d9e045170e1642321b964740784e7dc64",
//     "sender_address_label": null,
//     "sender_logo_url": "https://logos.covalenthq.com/tokens/80001/0xaf28cb0d9e045170e1642321b964740784e7dc64.png",
//     "raw_log_data": "0x000000000000000000000000b29024c1916d6255e334e5d383dbfe56b29ce97d000000000000000000000000000080383847bd75f91c168269aa74004877592f0000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000080383847bd75f91c168269aa74004877592f0000000000000000000000000000000000000000000000006f041694db7833b4000000000000000000000000b29024c1916d6255e334e5d383dbfe56b29ce97d",
//     "decoded": null
//     },
//     {
//     "block_signed_at": "2022-10-25T14:04:57Z",
//     "block_height": 28804728,
//     "tx_offset": 18,
//     "log_offset": 107,
//     "tx_hash": "0x9bc3e0e3c6e2586b0b87e4a7ad29f4f084b10bbbeacdcf14b8da3765cc34765c",
//     "raw_log_topics": [
//     "0x74e171117e91660f493740924d8bad0caf48dc4fbccb767fb05935397a2c17ae"
//     ],
//     "sender_contract_decimals": 0,
//     "sender_name": null,
//     "sender_contract_ticker_symbol": null,
//     "sender_address": "0xaf28cb0d9e045170e1642321b964740784e7dc64",
//     "sender_address_label": null,
//     "sender_logo_url": "https://logos.covalenthq.com/tokens/80001/0xaf28cb0d9e045170e1642321b964740784e7dc64.png",
//     "raw_log_data": "0x0000000000000000000000000000000000000000000000005e5c3fe9b6ecca470000000000000000000000000000000000000000000000001bf04205e831713e",
//     "decoded": null
//     },
//     {
//     "block_signed_at": "2022-10-25T14:04:57Z",
//     "block_height": 28804728,
//     "tx_offset": 18,
//     "log_offset": 109,
//     "tx_hash": "0x9bc3e0e3c6e2586b0b87e4a7ad29f4f084b10bbbeacdcf14b8da3765cc34765c",
//     "raw_log_topics": [
//     "0x6135b536e33070976edb6dc1ecd6f9235b0d3a24970b028cd9dc6994bd0d5ec0"
//     ],
//     "sender_contract_decimals": 0,
//     "sender_name": null,
//     "sender_contract_ticker_symbol": null,
//     "sender_address": "0xaf28cb0d9e045170e1642321b964740784e7dc64",
//     "sender_address_label": null,
//     "sender_logo_url": "https://logos.covalenthq.com/tokens/80001/0xaf28cb0d9e045170e1642321b964740784e7dc64.png",
//     "raw_log_data": "0x0000000000000000000000008639e50d0eeed386949331cc3b48b7a12baf541d000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d600000000000000000000000000000000000000000000000002c68af0bb14000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bf04205e831713e0000000000000000000000008639e50d0eeed386949331cc3b48b7a12baf541d",
//     "decoded": null
//     }
//     ],
//     "pagination": {
//     "has_more": false,
//     "page_number": 0,
//     "page_size": 100,
//     "total_count": null
//     }
//     },
//     "error": false,
//     "error_message": null,
//     "error_code": null
//     }

    let total_log_data = [];
    let total_amount_transferred = 0;
    for (let i = 0; i < response.data.data.items.length; i++) {
        if(response.data.data.items[i].raw_log_topics[0] === swapped_keccak256) {
            // console.log('response.data.data.items[i].raw_log_data: ', response.data.data.items[i].raw_log_data);
            const decoded_raw_log_data = utils.defaultAbiCoder.decode(['uint256'], response.data.data.items[i].raw_log_data).toString();
            console.log(decoded_raw_log_data);
            // decoded_raw_log_data = 2134241423262388746
            // format the decoded_raw_log_data to a readable number
            const formatted_decoded_raw_log_data = utils.formatUnits(decoded_raw_log_data, 18);
            

            console.log(formatted_decoded_raw_log_data);

            


            // total_amount_transferred += decoded_transfer_amount;

            total_log_data.push({
                "tx_hash" : `https://mumbai.polygonscan.com/tx/${response.data.data.items[i].tx_hash}`,
                "tx_amount_transferred" : formatted_decoded_raw_log_data
            });
        }
    }

    console.log(total_log_data);
    console.log(total_amount_transferred);

    return total_amount_transferred;
    

    
    // let totalLogData = [];
    // for (let i = 0; i < log_data.length; i++) {
    //     const decodedLogA = utils.defaultAbiCoder.decode(['uint256'], log_data[i]).toString(); // expected response is a number like 3000000000000000000 which is 3, we need to format it to 3
    //     const transferedAmount = utils.formatUnits(decodedLogA, 18); // expected response is a number like 3
    //     // convert decodedLogA to 2 decimal number
    //     // console.log('transfered amount',transferedAmount);
    //     totalAmountTransferred += parseFloat(transferedAmount);

    //     totalLogData.push({
    //         transfered_amount: transferedAmount,
    //         tx_hash: 

    // }
    // console.log('totalAmountTransferred: ', totalAmountTransferred); //7.67096445306104e+30 format into 2 decimal number

    // const totalAmountTransferredFormatted = totalAmountTransferred.toFixed(2);
    // console.log('totalAmountTransferredFormatted: ', totalAmountTransferredFormatted); 

    

    // return totalAmountTransferred;
    } catch (error) {
        console.log(error);
    }
}





export const getERC20Transfers = async () => {
    // https://api.covalenthq.com/v1/:chain_id/address/:address/transfers_v2/?&key=ckey_da302f1c19694bdbbab1f7ae1ce
    try {
        const response = await axios.get(
        //https://api.covalenthq.com/v1/80001/address/0xaf28cb0d9E045170E1642321B964740784E7dC64/transfers_v2/?&key=ckey_da302f1c19694bdbbab1f7ae1ce
        `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/address/${multi_chain_swap_address}/transfers_v2/?&key=${key}`
        );
        console.log('erc20 transfers: ', response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getNFTTransactions = async () => {
    try{
        const response = await axios.get(`https://api.covalenthq.com/v1/${polygonMumbaiChainId}/tokens/${multi_chain_swap_address}/nft_transactions/1/?key=${key}`);
        console.log('get nft transactions',response);
        return response.data.data.items.length;
    } catch (error) {
        console.log(error);
    }
}

export const getChangesInTokenHolders = async (startingBlock: number, endingBlock: number ) => {
    try {
        const response = await axios.get(
        `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/tokens/${multi_chain_swap_address}/token_holders_changes/?starting-block=${startingBlock}&ending-block=${endingBlock}/?key=${key}`
        );
        console.log('changes in token holders',response);
        return response;
    } catch (error) {
        console.log(error);
    }
};


export const getTokenTransfers = async (startingBlock: number, endingBlock: number ) => {
    try {
        const response = await axios.get(
         //https://api.covalenthq.com/v1/80001/address/0xaf28cb0d9E045170E1642321B964740784E7dC64/transfers_v2/?starting-block=28758609&ending-block=28758610/?key=ckey_da302f1c19694bdbbab1f7ae1ce   
        `https://api.covalenthq.com/v1/${polygonMumbaiChainId}/address/${multi_chain_swap_address}/transfers_v2/?starting-block=${startingBlock}&ending-block=${endingBlock}/?key=${key}`
        );
        console.log('get token transfers',response);
        return response;
    } catch (error) {
        console.log(error);
    }
}


//https://api.covalenthq.com/v1/80001/tokens/0xaf28cb0d9E045170E1642321B964740784E7dC64/nft_transactions/0x000080383847bD75F91c168269Aa74004877592f/?&key=ckey_da302f1c19694bdbbab1f7ae1ce

//https://api.covalenthq.com/v1/137/address/0x6Ae5cB20877DBFE96DC176C81262e65950b29369/transfers_v2/?contract-address=0xaf28cb0d9E045170E1642321B964740784E7dC64&key=ckey_da302f1c19694bdbbab1f7ae1ce