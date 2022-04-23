module.exports={
  port: process.env.PORT,
  origin: process.env.LOCAL_APP_URL,
  mongodbUrl: process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.LOCAL_MONGO_URI
}