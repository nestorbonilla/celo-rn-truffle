const ContractKit = require('@celo/contractkit')
const Web3 = require('web3')
const path = require('path')

// Conéctacte a la red deseada
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)
// const kit = Kit.newKit('https://forno.celo.org') // mainnet

const getAccount = require('./utils/getAccount').getAccount

async function awaitWrapper(){
    let account = await getAccount()
    console.log(`Account address: ${account.address}`)
    kit.addAccount(account.privateKey)
}

awaitWrapper()

module.exports = {
  // Más información en <http://truffleframework.com/docs/advanced/configuration>
  // para configurar tu proyecto Truffle!

  // La siguiente línea colocará los contratos compilados y la información asociada en ./client/contracts
  contracts_build_directory: path.join(__dirname, "client/contracts"),

  networks: {
    // Utilice la red de desarrollo si está utilizando @celo/ganache-cli
    // https://www.npmjs.com/package/@celo/ganache-cli
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
    alfajores: {
      provider: kit.web3.currentProvider,
      network_id: 44787
    },
    mainnet: {
      provider: kit.web3.currentProvider,
      network_id: 42220
    }
  },
  compilers:{
    solc: {
      version: "^0.8.9"
    }
  }
};
