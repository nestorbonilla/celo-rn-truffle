import React from 'react'
import './global'
import { web3, kit } from './root'
import { Image, StyleSheet, Text, TextInput, Button, View, LogBox } from 'react-native'
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import { toTxResult } from "@celo/connect"
import * as Linking from 'expo-linking'
import HelloWorldContract from './contracts/HelloWorld.json'


LogBox.ignoreLogs(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

export default class App extends React.Component {

  // Establece los valores por defecto para el estado
  state = {
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    helloWorldContract: {},
    contractName: '',
    textInput: ''
  }

  // Esta función se llama cuando la página se procesa correctamente.
  componentDidMount = async () => {
    
    // Obtiene el ID de la red de Celo
    const networkId = await web3.eth.net.getId();
    
    // Obtiene la información del contrato HelloWorld implementado para el ID de red apropiada
    const deployedNetwork = HelloWorldContract.networks[networkId];

    // Crea una nueva instancia de contrato con la información del contrato de HelloWorld
    const instance = new web3.eth.Contract(
      HelloWorldContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    // Guardar la instancia del contrato
    this.setState({ helloWorldContract: instance })
  }

  login = async () => {
    
    // Un string que puedes pasar a DAppKit, que puede usar para escuchar la respuesta a esa solicitud
    const requestId = 'login'
    
    // Un string que se mostrará al usuario, indicando la DApp que solicita acceso / firma
    const dappName = 'Hola Celo'
    
    // El enlace profundo que utilizará Celo Wallet para redirigir al usuario a la DApp
    const callback = Linking.makeUrl('/my/path')
  
    // Solicite información de usuario a la wallet Celo Alfajores
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
  
    // Espera la respuesta de Celo Wallet
    const dappkitResponse = await waitForAccountAuth(requestId)

    // Configura la cuenta predeterminada a la cuenta devuelta de la billetera
    kit.defaultAccount = dappkitResponse.address

    // Obtiene el contrato del token estable
    const stableToken = await kit.contracts.getStableToken()

    // Obtiene el saldo de la cuenta de usuario (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    
    // Convierte de un número grande a un string redondeándolo al número apropiado de decimales
    const ERC20_DECIMALS = 18
    let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    let cUSDBalance = cUSDBalanceDec.toString()
    
    // Actualiza el estado
    this.setState({ cUSDBalance, 
                    isLoadingBalance: false,
                    address: dappkitResponse.address, 
                    phoneNumber: dappkitResponse.phoneNumber })
  }

  read = async () => {
    
    // Leer el nombre almacenado en el contrato HelloWorld
    let name = await this.state.helloWorldContract.methods.getName().call()
    
    // Actualiza el estado
    this.setState({ contractName: name })
  }

  write = async () => {
    const requestId = 'update_name'
    const dappName = 'Hello Celo'
    const callback = Linking.makeUrl('/my/path')

    // Crea un objeto de transacción para actualizar el contrato con el 'textInput'
    const txObject = await this.state.helloWorldContract.methods.setName(this.state.textInput)

    // Envía una solicitud a la billetera de Celo para enviar una transacción de actualización al contrato de HelloWorld
    requestTxSig(
      kit,
      [
        {
          from: this.state.address,
          to: this.state.helloWorldContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    )

    // Obtiene la respuesta de la billetera Celo
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    // Obtiene el resultado de la transacción, una vez que se haya incluido en la cadena de bloques de Celo
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Recibo de transacción de actualización de contrato de Hello World: `, result)  
  }

  onChangeText = async (text) => {
    this.setState({textInput: text})
  }

  render(){
    return (
      <View style={styles.container}>
        <Image resizeMode='contain' source={require("./assets/white-wallet-rings.png")}></Image>
        <Text>Abre client/App.js para iniciar a trabajar en tu Dapp!</Text>
        
        <Text style={styles.title}>Primero loguéate</Text>
        <Button title="login()" 
          onPress={()=> this.login()} />
                <Text style={styles.title}>Información de cuenta:</Text>
        <Text>Dirección de cuenta:</Text>
        <Text>{this.state.address}</Text>
        <Text>Número telefónico: {this.state.phoneNumber}</Text>
        <Text>Balance cUSD: {this.state.cUSDBalance}</Text>

        <Text style={styles.title}>Leer en HelloWorld</Text>
        <Button title="leer nombre en contrato" 
          onPress={()=> this.read()} />
        <Text>Nombre en contrato: {this.state.contractName}</Text>
        
        <Text style={styles.title}>Escribe en HelloWorld</Text>
        <Text>Nuevo nombre en contrato:</Text>
        <TextInput
          style={{  borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }}
          placeholder="ingresa un nuevo nombre"
          onChangeText={text => this.onChangeText(text)}
          value={this.state.textInput}
          />
        <Button style={{padding: 30}} title="actualizar nombre en contrato" 
          onPress={()=> this.write()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBCC5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 8, 
    fontSize: 20, 
    fontWeight: 'bold'
  }
});
