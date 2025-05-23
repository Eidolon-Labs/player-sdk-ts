# @eidolon-labs/player-sdk

## About the SDK
- This is for [Eidolon's](https://eidolon.gg) Player API
- The Player API is an invisible access layer for blockchain gaming
- It is not designed or built for monetary purposes
- It is designed to be used from a server

For examples of how to use the SDK, head over to https://github.com/Eidolon-Labs/player-api-examples

## Installation

```shell
# NPM
npm add @eidolon-labs/player-sdk

# Yarn
yarn add @eidolon-labs/player-sdk

# PNPM
pnpm add @eidolon-labs/player-sdk

# Bun
bun add @eidolon-labs/player-sdk
```

## Using the SDK

### Setup

```ts
import { PlayerApi } from "@eidolon-labs/player-sdk";

const api = new PlayerApi({
    region: "us-east-2", // US East 2 is the default active region during Beta
    apiKey: "xxx-xxx-xxx"
});
```

### Create Player

```ts
...

const player = await api.createPlayer({
    chainName: "nebula-testnet", // or nebula-mainnet
    suppliedId: "xxxx-xxxx-xxxx" // some id of yours in case you lose the Eidolon Id
});

console.log(player);
/*
{
    note: string;
    message: string;
    data: {
        accountId: string;
        player: {
            id: string;
            addresses: {
                evm: `0x${string}`;
            }
        }
    }
}
*/
```

### Send Transaction

```ts
...

const tx = await playerApi.sendTransaction({
    chainName: "nebula-testnet",    // or nebula-mainnet
    playerId: "xxx-xxx-xxx",        // player id
    data: "0x...",                  // encoded function data for EVM
    to: "0x16378Cb38F5D153f63019C1Bd2297b585dE0f44C"
});

console.log(tx);
/*
{
    message: string;
    data: {
        transactionHash: string;
    }
}
*/
```

**Encoding Function Data**
- With [Viem](https://viem.sh/docs/contract/encodeFunctionData.html)
- With [Ethers v5](https://docs.ethers.org/v5/api/utils/abi/interface/#Interface--encoding)
- With [Ethers v6](https://docs.ethers.org/v6/api/abi/#Interface-encodeFunctionData)
- With [Web3.js](https://docs.web3js.org/api/web3-eth-abi/function/encodeFunctionCall)

### Get Player

```ts
...
const player = await playerApi.getPlayer({
    playerId: "xxx-xxx-xxx"
});

console.log(player);
/*
{
    message: string;
    data: {
        player: {
            id: string;
            address: string;
            status: string;
        }
    }
}
*/
```

### Notice

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.