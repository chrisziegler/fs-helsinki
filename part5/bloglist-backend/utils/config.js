require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
if (process.env.NODE_ENV === 'test-local') {
  MONGODB_URI = process.env.TEST_LOCAL_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
}
