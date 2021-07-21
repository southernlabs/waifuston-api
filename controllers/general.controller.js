require('dotenv').config()
const {TonClient,signerNone} = require("@tonclient/core");
const {libNode} = require("@tonclient/lib-node");
const {Account} = require("@tonclient/appkit");
TonClient.useBinaryLibrary(libNode)
const client = new TonClient({network: { 
      endpoints: JSON.parse(process.env.ENDPOINTS)
}});
const ABI = require("../smc/CryptoNeuralWaifu.abi.json");

const SMC = {abi: ABI}
const Contract = new Account(SMC, {
    address: process.env.ROOT_ADDRESS,
    client,
    signer: signerNone(), 
});

const count = async (req, res) => {  
    try{
        var response = await Contract.runLocal("nextWaifuIndexToAssign")
        var c = parseInt(response.decoded.output.nextWaifuIndexToAssign, 16)
        res.json(c)
    }catch(e){
        res.status(500).send('Error ＞﹏＜');
    }
}

module.exports = {count}