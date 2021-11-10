export default {
  port: process.env.PORT || 5050,

  secretToken: process.env.SECRET_TOKEN,
  expiresToken: process.env.EXPIRES_TOKEN,

  qlikURL: process.env.QLIK_URL,
  qlikLogin: process.env.QLIK_LOGIN,
  qlikPassword: process.env.QLIK_PASSWORD
}
