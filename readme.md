# Celo React Native Truffle

Este repositorio contiene la estructura general de un proyecto del blockchain Celo en React Native utilizando [Truffle](https://www.trufflesuite.com/). Utiliza el [Truffle Box](https://www.trufflesuite.com/boxes/) de React y lo configura para que trabaje con React Native utilizando [Expo](https://expo.dev/).

Con esta una aplicación React Native podemos leer y actualizar un contrato en la [red de prueba Alfajores](https://docs.celo.org/getting-started/alfajores-testnet).

## Requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Expo](https://docs.expo.io/get-started/installation/)

## Obtén el repositorio

```bash
git clone git@github.com:nestorbonilla/celo-rn-truffle.git
```

<em>\* Si deseas crear tu propio proyecto con React Native utilizando Truffle sin clonar este repositorio, también he creado un [tutorial](https://nestorbonilla.gitbook.io/celo/truffle/mi-primer-proyecto) en el que te explico paso a paso como hacerlo. Y si quieres comprender mejor cómo integrar cUSD en tu proyecto tengo esta otra [guía](https://nestorbonilla.gitbook.io/celo/integrando-cusd) para ti.</em>

La configuración y los contratos inteligentes del proyecto se encuentran en el directorio raíz. El front-end de React Native está en el directorio `/client`. Una vez hayas clonado el repositorio, ejecuta:

```bash
yarn       # instala las dependencias
cd client  # entramos al directorio cliente
yarn       # instala las dependencias del front-end
```

## Dependencias para móvil

Necesitarás la aplicación Expo instalada en tu dispositivo móvil de desarrollo o emulador ([iOS](https://apps.apple.com/app/apple-store/id982107779) o [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)).

También necesitarás la [Celo Wallet](https://celo.org/developers/wallet) en tu dispositivo móvil (o emulador) para firmar transacciones. La aplicación puede conectarse automáticamente al contrato de HelloWorld que ya se ha implementado en la red de prueba, o es posible que deba implementar el tuyo propio (detalles a continuación).

## Desarrollo de contratos inteligentes

El proyecto viene con un [ejemplo de contrato Hello World](https://github.com/nestorbonilla/celo-rn-truffle/blob/master/contracts/HelloWorld.sol) en el directorio raíz de contratos.

El repositorio al utilizar un box de Truffle también está configurada para publicar contratos inteligentes Solidity en la red de prueba Alfajores. Para esto necesitarás fondos de la red de prueba.

Para crear una nueva cuenta de desarrollo, ejecuta en la raíz del proyecto:

```bash
yarn account
```

La nueva dirección de la cuenta se imprimirá en la consola. Este script generará una clave privada para ti y la almacenará en `/ .secret`. Si necesitas imprimir la información de la cuenta nuevamente, ejecuta `yarn account`. No creará una nueva cuenta, leerá la clave privada guardada e imprimirá la dirección de cuenta correspondiente.

Truffle leerá esta clave privada para publicaciones de contrato.

Copia la dirección de tu cuenta (llave pública) y pégala en el [faucet de Alfajores](https://celo.org/developers/faucet) para agregar fondos a tu cuenta.

Puedes migrar el contrato `HelloWorld.sol` a la red de prueba alfajores con:

```bash
truffle migrate --network alfajores
```

Debes publicar el contrato `HelloWorld.sol` para trabajar en el ejercicio. Puede publicarlo usando el nodo remoto especificado en `truffle-config.js`. Es posible que obtenga un error sobre la conexión a un cliente RPC en ejecución. Si se encuentra con el error, intente ejecutar `truffle migrate --network alfajores` nuevamente.

Dado que estamos desarrollando esto en la red de prueba pública de Alfajores, podemos ver todas las cuentas, contratos y transacciones en el [explorador de bloques público de Alfajores](https://alfajores-blockscout.celo-testnet.org/).

Puede buscar la transacción de implementación del contrato en el explorador de bloques Alfajores a través del hash de transacción.

Truffle guardará la información de implementación en el artefacto Truffle ubicado en `client/contracts/HelloWorld.json`. Utilizará esta información de implementación para conectar tu aplicación React Native al contrato correcto.

## Desarrollando la aplicación móvil

Ten en cuenta que necesitarás una versión de Celo Wallet instalada en el dispositivo móvil con el que estás desarrollando la aplicación. Celo Wallet es el software de gestión de claves privadas con el que el usuario firmará transacciones.

Puedes instalar la billetera Celo en tu dispositivo físico con un código de invitación [acá.](https://celo.org/developers/wallet)

Puede crear la última versión de Celo Wallet y encontrar instrucciones sobre cómo ejecutar una compilación de desarrollo [aquí.](https://github.com/celo-org/celo-monorepo/tree/master/packages/mobile)

Una vez que tengas un dispositivo con la billetera Celo instalada, puede comenzar a trabajar en tu aplicación.

Para propósitos de introducción, hemos agregado un código para comenzar ubicado en App.js en el directorio `client`.

### Desarrollo de aplicaciones con Expo

En este proyecto, la aplicación React Native vive en el directorio `client`. `cd` en el directorio client y ejecuta `$ yarn` para instalar las dependencias.

[Expo](https://expo.io/) es una herramienta que facilita mucho el desarrollo de aplicaciones React Native. Usaremos Expo para una fácil configuración.

Instala con:

```
yarn global add expo-cli
# o
npm install --global expo-cli
```

Puede iniciar la aplicación desde el directorio cliente con:

```
expo start
```

Puedes utilizar tu dispositivo móvil físico o un emulador para desarrollar aplicaciones con Expo. Si deseas utilizar tu dispositivo físico, deberás [instalar el app Expo en tu dispositivo.](https://expo.io/learn)

Asegúrate de que la aplicación Celo Wallet esté abierta en tu dispositivo cuando estés usando tu dapp. Tu dapp solicitará información de Celo Wallet.

### Usando un emulador

Puede encontrar más información sobre la ejecución de un emulador Android [acá.](https://developer.android.com/studio/run/emulator-commandline)

## Ejemplos de Dapps en Celo

Mira la [galería de Celo DApps](https://docs.celo.org/developer-guide/celo-dapp-gallery) para más ejemplos.

## Resumiendo

Ahora deberías tener las habilidades necesarias para comenzar a desarrollar aplicaciones móviles en Celo.

Este no es un tutorial completo para las características y capacidades de Celo.

Por favor, [mira nuestra documentación](https://docs.celo.org/) para mayor información y siéntete libre de [contactarnos en Discord](https://discord.gg/745Qntv) si necesitas ayuda!
