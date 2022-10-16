import ConnectWalletBtn from '@/components/connect-wallet-btn'
import { useLXStep2Info } from '@/hooks/useLXStep2Contract'
import useWallet from '@/hooks/useWallet'
import MetaMaskOnboarding from '@metamask/onboarding'
import { message } from 'antd'
import React from 'react'
import Human from '@/assets/human.png'
import styles from './styles.less'
import useNotify from '@/hooks/useNotify'

const App: React.FC = () => {
  const { account, isActive, isActiviting, connect, isNetworkNotSupport } = useWallet()
  const { loading, mintLoading, mint, balance, totalSupply } = useLXStep2Info()
  const { error } = useNotify()

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connect()
    } else {
      new MetaMaskOnboarding().startOnboarding()
    }
  }

  const firstButton = () => {
    if (isActiviting || loading || mintLoading) {
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

    if (Number(totalSupply) >= 899) {
      error('Sold out.')
      return
    }

    if (Number(balance) >= 5) {
      error('Each wallet can only mint 5 times.')
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
            Prophet Gamma Game Cards <br />
            are game character cards that come with <br />
            Prophet gamma nfts, containing a total of <br />
            899 cards created by the great Cthulhu artists. <br />
            They are a harbinger of the future of mankind.
          </div>
        </div>
        <img className={styles.human} src={Human}></img>
        <div className={styles.price}>holder of Prophetgamma: freemint || public sale: 0.006eth</div>
        <div className={styles.mint}>
          <div className={styles.span}></div>
          <div className={styles.span}></div>
          <div className={styles.button} onClick={firstButton}>
            <div className={styles.borL}></div>
            mint
            <div className={styles.borR}></div>
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
