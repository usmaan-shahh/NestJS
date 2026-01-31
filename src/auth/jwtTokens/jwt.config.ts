export default () => ({
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessExpires: process.env.ACCESS_TOKEN_EXPIRES_IN
  }});
