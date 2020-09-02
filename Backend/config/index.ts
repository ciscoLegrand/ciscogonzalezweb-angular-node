if(process.env.NODE_ENV !== 'production') 
  require ('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI_PROD: process.env.MONGO_URI_PROD,
  MONGO_URI_DEV: process.env.MONGO_URI_DEV
}