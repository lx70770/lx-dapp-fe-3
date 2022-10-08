interface Option {
  omission?: string
  start?: number // 地址前半部分位数
  end?: number // 地址后半部分位数
}
export default function sliceAddress(address: string = '', options: Option = {}) {
  const { omission = '...', start = 6, end = 4 } = options
  const startStr = address.slice(0, start)
  const endStr = address.slice(address.length - end)
  return `${startStr}${omission}${endStr}`
}
