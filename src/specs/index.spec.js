import config from '../../framework/config/config';
import { user, book } from '../../framework/services/user';

describe('POST /bookstore/v1/books', () => {
  test('Создание книги', async () => {
    const token = await user.tokenCache();
    const res = await book.create_book(
      { userId: config.userID, collectionOfIsbns: [{ isbn: config.isbn }] },
      token
    );

    console.log(token);
    expect(typeof res.body).toBe('object');
    expect(res.status).toEqual(201);
  });
});

describe('GET /bookstore/v1/book', () => {
  test('Получении информации о книге', async () => {
    const res = await book.info_book();
    expect(typeof res.body).toBe('object');
    expect(res.status).toEqual(200);
  });
});

describe('PUT /bookstore/v1/books/{ISBN}', () => {
  test('Обновление книги', async () => {
    const res = await book.update_book({
      userId: config.userID,
      isbn: '9781449325862',
    });
    expect(res.body.books[0].isbn).toBe('9781449325862');
    expect(res.status).toEqual(200);
  });
});

describe('DELETE /bookstore/v1/book', () => {
  test('Удаление книги', async () => {
    const res = await book.delete_book({
      isbn: '9781449325862',
      userId: config.userID,
    });

    expect(res.status).toEqual(204);
  });
});
