export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'sportline_nestjs',
        synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
        logging: process.env.DB_LOGGING === 'true' || false,
    },
    // Puedes agregar más secciones según necesites
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
});