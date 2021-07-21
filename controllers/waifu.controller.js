require('dotenv').config()
const {TonClient,signerNone} = require("@tonclient/core");
const {libNode} = require("@tonclient/lib-node");
const {Account} = require("@tonclient/appkit");
TonClient.useBinaryLibrary(libNode)
const client = new TonClient({network: { 
      endpoints: JSON.parse(process.env.endpoints)
}});
const ABI = require("../smc/CryptoNeuralWaifu.abi.json");

const SMC = {abi: ABI}
const Contract = new Account(SMC, {
    address: process.env.ROOT_ADDRESS,
    client,
    signer: signerNone(), 
});

// Get all waifus with method waifusMeta
const all_waifus = async (req, res) => {
    try{
    var response = await Contract.runLocal("waifusMeta")
    //console.log(response.decoded.output.waifusMeta)
    res.json(response.decoded.output.waifusMeta)
    }catch(e){
        res.status(500).send('Error ＞﹏＜');
    }
}

// Get n latest waifus
const latest_waifus = async (req, res) => {
    try{
        var response = await Contract.runLocal("getLatestWaifus",{N: req.params.n})
        
        res.json(response.decoded.output.value0)
    }catch(e){
        res.status(500).send('Error ＞﹏＜');
    }
}

// Get waifu all data
const waifu = async (req, res) => {
    try{
        var response = await Contract.runLocal("getWaifuAllData",{waifuIndex: req.params.id})
        
        res.json(response.decoded.output)
    }catch(e){
        res.status(500).send('Error ＞﹏＜');
    }
}

// Get all bids
const bids = async (req, res) => {
    try{
        var response = await Contract.runLocal("waifuBids")
        
        res.json(response.decoded.output.waifuBids)
    }catch(e){
        console.log(e)
        res.status(500).send('Error ＞﹏＜');
    }
}

// Get all offers
const offers = async (req, res) => {
    try{
        var response = await Contract.runLocal("waifusOfferedForSale")
        
        res.json(response.decoded.output.waifusOfferedForSale)
    }catch(e){
        console.log(e)
        res.status(500).send('Error ＞﹏＜');
    }
}

module.exports = { waifu,latest_waifus,all_waifus,bids,offers }