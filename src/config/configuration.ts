export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',

  PORT: parseInt(process.env.PORT ?? '3000', 10),

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'riwi_dev',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'changeme',
    expiresIn: process.env.JWT_EXPIRATION || process.env.JWT_EXPIRE_IN || '900s',
    refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'changeme_refresh',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
  },
});
