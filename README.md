<p align="center">
  <div align="center">
    <img width="110px" style="border-radius: 10px;" src="client/public/logos/logo-square.png">
    <img src="client/public/logos/name-lg.png">
  </div>
  <p align="center">A decentralized calendar</p>
  <p align="center">
    <a href="#about">About</a>
    •
    <a href="#tech">Tech</a>
    •
    <a href="#development">Development</a>
  </p>

</p>
<br/>

# About
🚧🔨 Coming soon

# Tech
EventBlock was built with:
- [Aurora](https://aurora.dev/)
- [Infura](https://www.infura.io/)
- [Mocha](https://mochajs.org/)
- [React](https://reactjs.org/)
- [React Truffle Box](https://trufflesuite.com/boxes/react/)
- [Solidity](https://soliditylang.org/)
- [Truffle](https://trufflesuite.com)
- [Webpack](https://webpack.js.org)

# Development
This project includes a Makefile. Run `make` to list all available commands.

## 1. Setup
Install dependencies:
```sh
make setup
```
Then update env vars in `truffle/.env` with your own.

Hereafter, new dependencies can be installed with: `make install`.

## 2. Deploy
### Devnet
```sh
# Open a separate terminal and run Ganache,
# a simulated Ethereum blockchain on your machine.
ganache

# Keep Ganache running and open another terminal.
# Compile and deploy contracts to Ganache.
make dev_deploy
```

### Aurora testnet
Run: `make test_deploy`.

## 3. Connect Metamask
Set up a separate browser profile with its own clean extension installation of Metamask for developing than the one you typically use.

Then enable test networks in Metamask:
</br>
Settings > Advanced > Toggle "Show test networks"


### Devnet
> 💡 Explorer: [Ganache's built in block explorer](https://trufflesuite.com/ganache/)

Ganache outputs a list of pre-funded test accounts that you can import. Alternately, you can specify an account to fund when you run ganache with an option like `-m` ([docs](https://github.com/trufflesuite/ganache#documentation)).
Then switch Metamask to the Localhost 8545 network.

### Testnet
> 💡 Explorer: [Aurora testnet explorer](https://explorer.testnet.aurora.dev/)

[Add Aurora testnet to metamask](https://doc.aurora.dev/interact/metamask/#connecting-metamask-to-aurora). Then get funds from the [Aurora facet](https://aurora.dev/faucet) (select "devnet").

## 4. Start Client
Run `make start_client`.

## Testing
Run `make test`.
