/*
    Este script busca un archivo .secret en la raíz del proyecto.
    Si no encuentra ninguno, crea una clave privada de cuenta y guarda la clave en un nuevo archivo .secret.
    Si se encuentra un archivo .secret, devuelve un objeto de cuenta correspondiente a la clave privada almacenada.
*/

const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
var web3 = new Web3();

const filePath = path.join(__dirname, '../.secret');

function getAccount() {
    return new Promise(resolve => {
        if(fs.existsSync(filePath)){
            fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                resolve(web3.eth.accounts.privateKeyToAccount(data))
            })
        } else {
            let randomAccount = web3.eth.accounts.create()
        
            fs.writeFile(filePath, randomAccount.privateKey, (err) => {
                if(err) {
                    return console.log(err);
                }
            })

            resolve(randomAccount)
        }
    })
}

module.exports = {
    getAccount
}
