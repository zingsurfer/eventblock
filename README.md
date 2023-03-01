# EventBlock

### Tech
EventBlock was built with:
- [Solidity](https://soliditylang.org/)
- [React](https://reactjs.org/)
- [React Truffle Box](https://trufflesuite.com/boxes/react/)
- [Truffle](https://trufflesuite.com)
- [Webpack](https://webpack.js.org)
- [Aurora](https://aurora.dev/)
- [Mocha](https://mochajs.org/)

### Development
##### 1. Setup
Install dependencies:
```sh
npm install -g truffle ganache yarn
make install
```
Then update env vars in `truffle/.env` with your own.

##### 2. Deploy Contracts to Devnet / Testnet
Devnet
```
Open a separate terminal and run Ganache, a simulated Ethereum blockchain on your machine.
ganache

# Keep Ganache running and open another terminal.
# Compile and deploy contracts to Ganache.
make dev_deploy
```

Aurora testnet ([explorer](https://explorer.testnet.aurora.dev/))
```sh
make test_deploy
```

##### 3. Start Client
```sh
make start_client
```
