import { AddEthereumChainParameter } from '@web3-react/types'

export const ETH_TEST_CHAIN_ID = 5
export const ETH_MAINNET_CHAIN_ID = 1

const goerliParams: AddEthereumChainParameter = {
  chainId: ETH_TEST_CHAIN_ID,
  rpcUrls: ['https://goerli.infura.io/v3/'],
  chainName: 'Goerli Network',
  nativeCurrency: {
    name: 'Goerli ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: [],
}

const ethParams: AddEthereumChainParameter = {
  chainId: ETH_MAINNET_CHAIN_ID,
  rpcUrls: ['https://mainnet.infura.io/v3/'],
  chainName: 'Ethereum Network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
}

export const LX_MFER_ADDRESS = '0x6Ae978e0C8466eB5371592b1870bACc36Bdbf163'

export const LX_STEP2_ADDRESS = '0x97a70f7102c89c772d18273ac35455a5b3945593'

export const isProd = ENV === 'prod'

export const CURRENT_NEED_NETWORK = isProd ? ETH_MAINNET_CHAIN_ID : ETH_TEST_CHAIN_ID

export const CURRENT_NEED_NETWORK_PARAMS = isProd ? ethParams : goerliParams
