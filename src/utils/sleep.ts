export default () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}
