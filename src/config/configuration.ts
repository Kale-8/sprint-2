export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',

  PORT: parseInt(process.env.PORT ?? '3000', 10),

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'sportline2',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'changeme',
    expiresIn: (process.env.JWT_EXPIRE_IN || '1d'),
  },
});
