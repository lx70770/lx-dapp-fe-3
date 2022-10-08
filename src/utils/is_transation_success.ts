import { ContractReceipt } from '@ethersproject/contracts'

export default function isTransationSuccess(result: ContractReceipt) {
  return result.status === 1
}
