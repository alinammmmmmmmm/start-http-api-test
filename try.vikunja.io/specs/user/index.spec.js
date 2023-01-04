import supertest from 'supertest';
import config from '../config';
import user from '../helper/user';

describe('user', () => {
  describe('POST /api/v1/login', () => {
    test('Метод должен существовать', async () => {
      const res = await supertest('https://try.vikunja.io')
        .post('/api/v1/login')
        .send({});

      expect(res.status).not.toEqual(404);
    });

    test('Авторизация должна проходить успешно с правильным логином и паролем', async () => {
      // const res = await user.login({ username: 'demo', password: 'demo' });
      const res = await user.login(config.credentials);
      // const res = await supertest('https://try.vikunja.io')
      //     .post('/api/v1/login')
      //     .set('Accept', 'application/json')
      //     .send({username: 'demo', password: 'demo'})

      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual('string');
    });

    test('Авторизация должна возвращать статус с кодом ошибки если логин неверный', async () => {
      const res = await user.login({ username: 'demoN', password: 'demo' });
      // const res = await supertest('https://try.vikunja.io')
      //     .post('/api/v1/login')
      //     .set('Accept', 'application/json')
      //     .send({username: 'demo4', password: 'demo'})

      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011);
    });

    test('Авторизация должна возвращать статус с кодом ошибки если пароль неверный', async () => {
      const res = await user.login({ username: 'demo', password: 'demo3' });
      // const res = await supertest('https://try.vikunja.io')
      //   .post('/api/v1/login')
      //   .set('Accept', 'application/json')
      //   .send({ username: 'demo', password: 'demo3' });

      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011);
    });
  });

  describe('GET /api/v1/user', () => {
    test('Отдаёт инфу о пользователе', async () => {
      const token = await user.getAuthToken();
      const res = await user.user(token);
      expect(res.status).toEqual(200);
    });
  });
});
