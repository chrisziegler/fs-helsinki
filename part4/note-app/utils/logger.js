const info = (...params) => {
  if (
    process.env.NODE_ENV !== 'test' &&
    process.env.NODE_ENV !== 'test-local'
  ) {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
}
