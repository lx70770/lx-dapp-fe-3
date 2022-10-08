import ConnectWalletBtn from '@/components/connect-wallet-btn'
import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
import useWallet from '@/hooks/useWallet'
import MetaMaskOnboarding from '@metamask/onboarding'
import { message } from 'antd'
import React from 'react'
import Human from '@/assets/human.png'
import styles from './styles.less'
import useNotify from '@/hooks/useNotify'

const App: React.FC = () => {
  const { account, isActive, isActiviting, connect, isNetworkNotSupport } = useWallet()
  const { loading, mintLoading, mint, balance, totalSupply } = useLXMFERInfo()
  const { error } = useNotify()

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connect()
    } else {
      new MetaMaskOnboarding().startOnboarding()
    }
  }

  const firstButton = () => {
    if (isActiviting || loading) {
      error('please wait a moment.')
      return
    }

    if (!account || !isActive) {
      connectWallet()
      return
    }

    if (isNetworkNotSupport) {
      connectWallet()
      error('Network error, you need switch network.')
      return
    }

    if (Number(balance) > 0) {
      error('You already own an NFT')
      return
    }
    mint(account)
  }

  return (
    <div className={styles.mint_wrap}>
      <div className={styles.bo}>
        <ConnectWalletBtn />
        <div className={styles.content}>
          <div className={styles.title}>prophet-&#947;</div>
          <div className={styles.tip}>
            prophet-gamma is a new colection of <br /> 999 nfts hand drawn by a athulhu artist, <br /> each one is aunipue and beautiful work of art.
          </div>
        </div>
        <img className={styles.human} src={Human}></img>
        <div className={styles.price}>1-400 free || 401-899: 0.006eth</div>
        <div className={styles.mint}>
          <div className={styles.span}></div>
          <div className={styles.span}></div>
          <div className={styles.button} onClick={firstButton}>
            mint
          </div>
          <div className={styles.span}></div>
          <div className={styles.span}></div>
        </div>
        <div className={styles.total}>{totalSupply}/899</div>
        <div className={styles.social}>
          <div className={styles.span}></div>
          <div className={styles.span}></div>
          <div
            className={styles.button}
            onClick={() => {
              window.open('https://twitter.com/Prophet__nft', '_blank')
            }}
          >
            twitter
          </div>
          <div className={styles.span}></div>
          <div className={styles.span}></div>
        </div>
      </div>
    </div>
  )
}

export default App
