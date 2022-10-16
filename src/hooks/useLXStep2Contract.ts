import { etherToWei } from '@/utils/format_bignumber'
import { useEffect, useState } from 'react'
import { makeLXMFERContract, makeStep2Contract } from '../utils/make_contract'
import { ContractTransaction } from 'ethers'
import useNotify from './useNotify'
import useWallet from './useWallet'

export function useLXStep2Info() {
  const { provider, account } = useWallet()
  const [loading, setLoading] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const [balance, setBalance] = useState('0')
  const [totalSupply, setTotalSupply] = useState('0')
  const { error } = useNotify()

  async function getLXStapOneInfo() {
    try {
      setLoading(true)
      const contract = makeStep2Contract(provider!, account)

      const balance = await contract.balanceOf(account)
      const totalSupply = await contract.totalSupply()
      setBalance(balance.toString())
      setTotalSupply(totalSupply.toString())
      console.log(balance.toString())
      console.log(totalSupply.toString())
    } catch (e: any) {
      console.error('get info failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account && provider) {
      getLXStapOneInfo()
    }
  }, [account, provider])

  useEffect(() => {
    if (!(account && provider)) return

    const contract = makeStep2Contract(provider, account)
    const fromMe = contract.filters.Transfer(null, account)

    contract.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|mint', { from, to, amount, event })
      getLXStapOneInfo()
    })
    return () => {
      contract.removeAllListeners(fromMe)
    }
  }, [account, provider])

  async function mint(address: string) {
    try {
      setMintLoading(true)
      const contract = makeStep2Contract(provider!, account)
      const contract1 = makeLXMFERContract(provider!, account)
      error('Start mint, please wait a moment.')
      const pgBalance = (await contract1.balanceOf(account)).toNumber()
      console.log('pgBalance:', pgBalance)
      console.log('balance:', balance)

      let tx: ContractTransaction
      if (pgBalance <= 0) {
        tx = await contract.mint(address, {
          value: etherToWei('0.006'),
        })
      } else if (pgBalance > 0 && Number(balance) >= 1) {
        tx = await contract.mint(address, {
          value: etherToWei('0.006'),
        })
      } else {
        tx = await contract.mint(address, {
          value: etherToWei('0'),
        })
      }

      const result = await tx.wait()
      error(`mint successfully`)
    } catch (e: any) {
      error(e.message)
      console.error('mint failed', e.message)
    } finally {
      setMintLoading(false)
    }
  }

  return {
    balance,
    totalSupply,
    loading,
    mintLoading,
    mint,
    refresh: getLXStapOneInfo,
  }
}
