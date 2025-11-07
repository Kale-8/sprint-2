import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT ?? '3003', 10),
    database: {
        url: process.env.DATABASE_URL,
    },
    jwtSecret: process.env.JWT_SECRET || 'changeme123',
}));

