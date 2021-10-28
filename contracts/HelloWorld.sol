// Aprende más sobre Solidity acá: https://solidity.readthedocs.io

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Declara un contrato inteligente llamado HelloWorld
contract HelloWorld {
    // Define un string llamado name, y lo inicializamos con el valor 'Bienvenido Celo'
    string name = "Bienvenido a Celo!";

    // Declara una función llamada getName
    // La etiqueta 'public' significa que la función puede ser llamada internamente, por transacciones o por otros contratos
    // La etiqueta 'view' inica que la función no cambia ningún estado en el contrato
    // La función retorna un string, desde la ubicación de los datos de la memoria
    function getName() public view returns (string memory) {
        // Regresa el la variable de almacenamiento 'name'
        return name;
    }

    // Declara una función llamada setName
    // La función toma 1 parámetro, un string, llamado newName, con la ubicación de los datos de calldata en la EVM
    // La etiqueta 'external' significa que la función solamente puede ser llamada desde uan fuente externa
    function setName(string calldata newName) external {
        // Colca la variable de almacenamiento, name, al valor pasado como newName
        name = newName;
    }
}
