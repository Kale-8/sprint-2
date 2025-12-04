// test/auth.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Login', () => {
    it('POST /auth/login - success', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@nike.com', password: '123456' })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('POST /auth/login - invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'wrong@nike.com', password: '123456' })
        .expect(401);
    });
  });

  describe('Protected route', () => {
    let accessToken: string;

    beforeAll(async () => {
      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@nike.com', password: '123456' });

      accessToken = loginRes.body.accessToken;
    });

    it('GET /auth/protected - success with JWT', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/protected')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('message', 'Ruta protegida');
      expect(res.body.user).toHaveProperty('email', 'admin@nike.com');
    });

    it('GET /auth/protected - fail without JWT', async () => {
      await request(app.getHttpServer())
        .get('/auth/protected')
        .expect(401);
    });
  });
});
