#  Shopping Cart Project (ETH Payment)

## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/).
This repository contains instructions and code for setting up a faucet for a private Ethereum network. The faucet allows users to request and receive Ether (ETH) for testing and development purposes.
It's mandatory to be owner of some tests accounts using Metamask

### App Architecture

The architecture of the app is classical Shopping cart example using react (Front) + Node.js (Backend) + Ethereum node (using docker) + Metamask to handle transactions.

### Prerequisites
Before you begin, ensure you have the following prerequisites installed:

1. **Docker**: Install Docker to set up a local Ethereum node with the desired network configuration.
2. **Metamask**: Ensure you have Metamask installed in your browser and configure it to connect to the Ethereum private network.

## Steps

### 1. Postgresql Northwind DB (you can find out any mock/random data values seaching in google)

docker run --name curso-pg-cesta -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres 

**Set YOUR wallets direction(Test networks) in node/genesis.json and Save It**
### ethereum/client-go version 1.11.5 

In terminal:


```
cd 6-3_ShoppingCart_eth/node

docker run --rm -it -v ${PWD}/data/keystore:/data ethereum/client-go:v1.11.5 account new --keystore /data
// Set password: 1234 (if you prefer another, remember change it also in Back module)

docker run -d -p 8545:8545 -p:30303:30303 -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json --name eth-node  ethereum/client-go:v1.11.5 init --datadir data /genesis.json
```

```
// Set  your metamask to see the first results and if it works

docker run -d -p 8545:8545 -p:30303:30303 -v ${PWD}/data:/data --name eth-node-8888  ethereum/client-go:v1.11.5 \
--datadir data --http.api personal,admin,eth,net,web3 --http.corsdomain="*" --http --http.addr 0.0.0.0 \
--http.port 8545 --mine --miner.etherbase <<YOUR_WALLET>> --miner.threads=1
```

**Reset web explorer and Metamask**

**Set the NEW wallet direction in nodo/genesis.json and Save It**

The new account will be the Faucet miner

Rename the file created (UTC--... for account.json) and take the new wallet address (add an 0x where you paste it (genesis and comand))

### 2. Shopping Cart Back (Node.js)

```
cd ..
cd shc-back
yarn init -y
yarn add express
yarn add cors
yarn add pg
npx nodemon app.js
```

### 3. Shopping Cart Front (React)

Components to add:

    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.2",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.21.1"

```
yarn create vite shc-front --template react
cd ..
cd shc-front
yarn dev
```

### Steps:

1. Postgresql + northwiod DB(you can find out any mock/random data values seaching in google)
docker run --name curso-pg-cesta -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres https://github.com/pthom/northwind_psql/blob/master/northwind.sql


2. Create ETH node.
create a new folder node/genesis.json with the following structure:
Execute docker eth node and prepare to send transactions between your accounts
docker run -d -p 8545:8545 -p:30303:30303 -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json --name eth-node  ethereum/client-go:v1.11.5 init --datadir data /genesis.json
docker run -d -p 8545:8545 -p:30303:30303 -v ${PWD}/data:/data --name eth-node-8888  ethereum/client-go:v1.11.5 --datadir data --http.api personal,admin,eth,net,web3 --http.corsdomain="*" --http --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0xfEA10424b7D66A17a2829d92b60112120a53BC5a --miner.threads=1

3. Front Design:
React to manage and show all data, using vite framework to start. shc-front folder

4. Back
Node.js for the backend. shc-back folder. Inseide this folder we connect to Postgrest DB