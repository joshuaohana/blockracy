# Blockracy

## Backend / Blockchain

1. `npm i`
2. `npx hardhat compile` to compile
3. setup env vars
   - RINKEBY_PRIVATE_KEY (deployer address's private key)
   - RINKEBY_ALCHEMY_API_KEY (api key for rinkeby from https://alchemyapi.io/)
4. `npm run deploy:rinkeby`

### Testing

`npx hardhat test`
`npx hardhat coverage`

## Frontend

1. `cd frontend`
2. `npm i`
3. `quasar dev` for local development

## Hardhat

Try running some of the following tasks:

`npx hardhat help`
`GAS_REPORT=true npx hardhat test`
`npx hardhat node`
