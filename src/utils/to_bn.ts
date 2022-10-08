import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export function toBN(n: BigNumberish | undefined | null | '') {
  if (!n) return BigNumber.from(0)
  return BigNumber.from(n)
}
