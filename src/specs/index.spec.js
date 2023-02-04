import config from '../../framework/config/config';
import { user, book } from '../../framework/services/user';
//есть библиотека преобразования в json-schema https://www.npmjs.com/package/joi-to-json-schema
//подключение библиотеки https://www.npmjs.com/package/jest-json-schema для валидации json-schema
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

describe('POST /bookstore/v1/books', () => {
  test('Создание книги', async () => {
    const token = await user.tokenCache();
    const res = await book.create_book(
      { userId: config.userID, collectionOfIsbns: [{ isbn: config.isbn }] },
      token
    );
    expect(typeof token).toBe('string');
    expect(typeof res.body).toBe('object');
    expect(res.body).toMatchSchema(config.schema);
    expect(res.status).toEqual(201);
  });
});

describe('GET /bookstore/v1/book', () => {
  test('Получении информации о книге', async () => {
    const res = await book.info_book();
    expect(typeof res.body).toBe('object');
    expect(res.status).toEqual(200);

    //создание json снапшота ответа с помощью Jest,в аргументах можем проверить тип данных у динамических обьектов
    //обновление снапшота через npx jest --updateSnapshot имя_файла
    expect(res.body).toMatchSnapshot({
      pages: expect.any(Number),
    });
  });

  it.each([config.isbn, config.new_isbn])(
    `параметризированный тест c массивом данных`,
    async () => {
      const res = await book.info_book();
      expect(typeof res.body).toBe('object');
      expect(res.status).toEqual(200);
    }
  );
});

describe('PUT /bookstore/v1/books/{ISBN}', () => {
  test('Обновление книги', async () => {
    const res = await book.update_book({
      userId: config.userID,
      isbn: config.new_isbn,
    });
    expect(res.body.books[0].isbn).toBe('9781449325862');
    expect(res.status).toEqual(200);
  });
});

describe('DELETE /bookstore/v1/book', () => {
  test('Удаление книги parametric test', async () => {
    const res = await book.delete_book({
      isbn: config.new_isbn,
      userId: config.userID,
    });
    expect(res.status).toEqual(204);
  });
});
