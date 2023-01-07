import config from '../../framework/config/config';
import user from '../../framework/services/user';

describe('GET /account/v1/user/{UUID}', () => {
  test('Получение информации о пользователе', async () => {
    const userId = await user.getUserId();
    const token = await user.getToken();
    const res = await user.info(token, userId);

    console.log(userId, token);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.books).toEqual('object');
  });
});

describe('POST /account/v1/authorized', () => {
  test('Авторизация пользователя', async () => {
    const res = await user.login(config.credentials);

    expect(res.status).toEqual(200);
    expect(typeof res.body).toEqual('boolean');
    expect(typeof res.body).toBeTruthy();
  });
});

describe('DELETE /account/v1/user/{UUID}', () => {
  test('Удаление пользователя', async () => {
    const create_user = await user.create_user({
      userName: 'samanta.presly',
      password: 'Administrator6666%!',
    });
    const userID = create_user.body.userID;
    const create_token = await user.create_token({
      userName: 'samanta.presly',
      password: 'Administrator6666%!',
    });
    const token = create_token.body.token;
    console.log(userID, token);
    const res = await user.delete(token, userID);

    expect(res.status).toEqual(204);
  });
});
