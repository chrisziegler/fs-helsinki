const info = (...params) => {
  if (
    process.env.NODE_ENV !== 'test' &&
    process.env.NODE_ENV !== 'test-local'
  ) {
    console.log(...params)
  }
}

const error = (...params) => {
  if (
    process.env.NODE_ENV !== 'test' &&
    process.env.NODE_ENV !== 'test-local'
  ) {
    console.error(...params)
  }
}

module.exports = {
  info,
  error,
}
