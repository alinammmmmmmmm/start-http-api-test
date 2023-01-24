import config from '../../framework/config/config';
import user,{userID,token,isBN,} from '../../framework/services/user';
import { book } from '../../framework/services/user';


describe('GET /account/v1/user/{UUID}', () => {
  test.only('Получение информации о пользователе', async () => {
    const userId = await user.userIdCache();
    const token = await user.tokenCache();
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

describe('POST /bookstore/v1/books', () => {
  test.only('Создание книги', async () => {
    const res = await book.create_book(
      {userId: userID,
      collectionOfIsbns: [{isbn: config.isbn}]});
      
console.log(userID);
console.log(res.body);
console.log(res.message);
expect(res.status).toEqual(201);
  });
});

describe('PUT /bookstore/v1/books/{ISBN}', () => {
  test.skip('Обновление книги', async () => {
    const res = await book.update_book({
      // userId:'81f93739-e123-4ea8-b319-d086f3a55f8d',
  userId: userID,
  isbn: '9781449325862'
});
console.log(userID);
console.log(res.body);
console.log(res.message);
expect(res.status).toEqual(200);
  });
});
