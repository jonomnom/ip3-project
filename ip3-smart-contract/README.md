## Deploy contract on testnset interact with it
- deploy the contract: run`npx hardhat run ./scripts/deployIp3.js --network goerli`
- purhcase example: 
    - in the `/scripts/purchaseCertificateExample.js` changed to use new deployed ip3 contract address on line 500.
    - Then run script `npx hardhat run ./scripts/purchaseCertificateExample.js --network goerli`

## ERC20 Token Approval and Transfer
- https://ethereum.org/en/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/
- https://learnblockchain.cn/question/2698 
- USDT Contract in Goerli testnet: https://goerli.etherscan.io/address/0x509ee0d083ddf8ac028f2a56731412edd63223b9#code
- https://stackoverflow.com/questions/67511692/how-to-receive-and-send-usdt-in-a-smart-contract


## Deploy on Goerli

run `npx hardhat verify --network goerli <IP3 Contract address> "<Stable coin address>"`

## Dune Dashboard
- Show the NFT ip transactions and total revenue
- Show top NFT ip
- Show NFT ip under different rental type

## Subgraph
- Use NFT ip to get transaction and total renue
- hahsed NFT
- buyers
- authorizers
- getAuthroizeRecordMap
- getAuthroizeCertificateMap

```
event Purchased(
        bytes32 indexed hashedAuthorizeNFT,
        bytes32 indexed hashedAuthorizeCertificate,
        address indexed renterAddress,
        AuthorizedNFT authorizedNFT,
        AuthorizeCertificate authorizeCertificate
    );
```