// Inicializa una instancia de ContractKit conectada a la testnet de Alfajores (solo lectura)

import Web3 from 'web3'
import { newKitFromWeb3 } from "@celo/contractkit";

export const provider = "https://alfajores-forno.celo-testnet.org"
// export const provider = 'https://forno.celo.org' // o 'wss://forno.celo.org/ws' (para soporte a websocket)

export const web3 = new Web3(provider);
export const kit = newKitFromWeb3(web3)
