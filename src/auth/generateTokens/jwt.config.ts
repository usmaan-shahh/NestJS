export default () => (
{
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET!,
    accessExpires: process.env.ACCESS_TOKEN_EXPIRES!,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
    refreshExpires: process.env.REFRESH_TOKEN_EXPIRES!,
  },
}
);
