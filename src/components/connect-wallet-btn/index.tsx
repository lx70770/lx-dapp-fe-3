import useWallet from '@/hooks/useWallet'
import MetaMaskOnboarding from '@metamask/onboarding'
import React, { MouseEventHandler } from 'react'
import SpanBox from '../span'
import styles from './styles.less'

const ConnectWalletBtn: React.FC = () => {
  const { isActive, isActiviting, shortAccountAddress, isNetworkNotSupport, connect, disconnect } = useWallet()

  const gen_btn = (value: string | React.ReactNode, onclick?: MouseEventHandler) => {
    return (
      <div onClick={onclick} className={styles.button}>
        <SpanBox />
        <SpanBox />
        <div className={styles.content}>{value}</div>
        <SpanBox />
        <SpanBox />
      </div>
    )
  }

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connect()
    } else {
      new MetaMaskOnboarding().startOnboarding()
    }
  }

  if (isActiviting) {
    return gen_btn('connecting', () => {})
  }

  if (isNetworkNotSupport) {
    return gen_btn('network error', () => connectWallet())
  }

  if (isActive) {
    return gen_btn(shortAccountAddress)
  }

  return gen_btn('connect wallet', () => connectWallet())
}

export default ConnectWalletBtn
