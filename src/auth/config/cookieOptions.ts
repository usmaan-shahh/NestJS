export const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict' as const,
  maxAge: 60 * 60 * 1000,
};
