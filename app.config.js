const base = require('./app.json')

module.exports = {
  ...base.expo,
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
  },
}
