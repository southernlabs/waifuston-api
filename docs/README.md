# [Waifuston API]()

> Simple HTTP api wrapper for Waifuston smart contract

[waifuston.com](https://Waifuston.com) is a first NFT collection and marketplace in [Free TON](https://freeton.org) blockchain.

This repository holds an API wrapper for smart contracts using [TON SDK](https://github.com/tonlabs/TON-SDK).

Smart contract documentation and full methods description can be found in repository: https://github.com/southernlabs/waifuston-contracts

To fetch waifus history you should process extarnal messages from blockchain. This API does not handle external messages yet, you can setup your own listener, such as https://github.com/southernlabs/ton-watcher

_images remark_. Images are stored off-chain. We know it is a little bit insecure and will be fixed in future. You can get any waifu image easily via our cdn: `https://images.waifuston.com/0x0000000000000000000000000000000000000000000000000000000000000000.jpg`

## Deployment

This app is ready to be deployed in docker. Consider adding ENV veriables:
```env
PORT=8080
ROOT_ADDRESS=0:1cc19337587036a64f1806efdc9a3c34862181ac771b9424bd7c3e75bade58c4
ENDPOINTS=["https://main1.ton.dev/","https://main2.ton.dev/","https://main3.ton.dev/"]
```

## Endpoint

You can check out this api at `https://api.waifuston.com`.

For example visit `https://api.waifuston.com/waifus/1` in your browser.

# Methods

## Waifus
```
waifus
```
Get all waifus. __Warning. Will return a huge JSON object.__

```json
{
    "0x0000000000000000000000000000000000000000000000000000000000000000":{"owner":"0x6fa6de453017e2ef8f98f676a193fd009c7c09d94cd8e5192d6d80b74ac5723f","name":"","mintTimestamp":"11962643000001","isForSale":false,"hasBid":true},"0x0000000000000000000000000000000000000000000000000000000000000001":{"owner":"0x6fa6de453017e2ef8f98f676a193fd009c7c09d94cd8e5192d6d80b74ac5723f","name":"5a6f6d626965204769726c","mintTimestamp":"11963008000001","isForSale":true,"hasBid":false},
...
```
---
```
waifus/bids
```
Return JSON of waifus bids

```json
{"0x0000000000000000000000000000000000000000000000000000000000000000":{"hasBid":true,"waifuIndex":"0x0000000000000000000000000000000000000000000000000000000000000000","bidder":"0x6b89a8bf57810c23cb46ac87c872278affdb2c414cdeada276640d80ef52973f","value":"1000000000"} 
...
```

---
```
waifus/offers
```

Return JSON of waifus offered for sale

```json
{"0x0000000000000000000000000000000000000000000000000000000000000001":{"isForSale":true,"waifuIndex":"0x0000000000000000000000000000000000000000000000000000000000000001","seller":"0x6fa6de453017e2ef8f98f676a193fd009c7c09d94cd8e5192d6d80b74ac5723f","minValue":"10000000000000"}
...
```

---
```
waifus/:n
```

Returns latest n waifus. Example: `waifus/1` - get latest minted waifu

```json
{"0x00000000000000000000000000000000000000000000000000000000000003cd":{"owner":"0x5294e1e3af5b1543c57d736b693c0ae54558bd55bacb9ef1cc34ac7f5a9c020c","name":"","mintTimestamp":"16423617000001","isForSale":false,"hasBid":false}}
```

## Waifu

```
waifu/:id
```

Get full info about waifu with provided ID. Id can be a decimal number `10` or hex `0x000000000000000000000000000000000000000000000000000000000000000a`. Return JSON with 3 objects: `m` - meta, `b` - bid, `o` - offer.

```json
{"m":{"owner":"0x4682d3b866727420548f7b2e8a10566cd5ab160532b35e7440470b80237e84c2","name":"","mintTimestamp":"11978194000001","isForSale":true,"hasBid":false},
"o":{"isForSale":true,"waifuIndex":"0x000000000000000000000000000000000000000000000000000000000000000a","seller":"0x4682d3b866727420548f7b2e8a10566cd5ab160532b35e7440470b80237e84c2","minValue":"10000000000000"},
"b":{"hasBid":false,"waifuIndex":"0x0000000000000000000000000000000000000000000000000000000000000000","bidder":"0x0000000000000000000000000000000000000000000000000000000000000000","value":"0"}}
```

## User

```
user/:pubKey
```

Get user by a Public Key. Public key must be in hex format.Example: `user/0x6fa6de453017e2ef8f98f676a193fd009c7c09d94cd8e5192d6d80b74ac5723f`.
Returns only his owned waifus.

```json
{"waifus":{"0x0000000000000000000000000000000000000000000000000000000000000000":{"owner":"0x6fa6de453017e2ef8f98f676a193fd009c7c09d94cd8e5192d6d80b74ac5723f","name":"","mintTimestamp":"11962643000001","isForSale":false,"hasBid":true},"0x0000000000000000000000000000000000000000000000000000000000000001":{"owner":"0x6fa6de453017e2ef8f98f676a193fd009c7c09d94cd8e5192d6d80b74ac5723f","name":"5a6f6d626965204769726c","mintTimestamp":"11963008000001","isForSale":true,"hasBid":false}}}
```

## General

```
count
```
Return total number of waifus

```
974
```