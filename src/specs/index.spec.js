import config from '../../framework/config/config';
import { user, book } from '../../framework/services/user';
//есть библиотека преобразования в json-schema https://www.npmjs.com/package/joi-to-json-schema
//подключение библиотеки https://www.npmjs.com/package/jest-json-schema для валидации json-schema
import { matchers } from 'jest-json-schema';
import { reporters } from '../../jest.local';
expect.extend(matchers);
import { describe, test } from '@jest/globals';
// import { allureReporter } from 'jasmine-allure-reporter/src/Jasmine2AllureReporter';
import {
  Severity,
  Status,
  Reporter,
} from '../../node_modules/jest-allure/dist/Reporter';
import each from 'jest-each';

// const reporter = new Reporter;

beforeEach(() => {
  reporter.addEnvironment('URL', config.url);
  // reporter.addAttachment('res.body',res.body);
});

describe('POST /bookstore/v1/books', () => {
  //будут передаваться в test suit allure

  beforeEach(() => {
    //выполнение кода для каждого теста внутри describe
    reporter.epic('epic');
    reporter.feature('create and update book');
    reporter.description('Feature should work cool');
  });

  test('Создание книги', async () => {
    reporter.story('create user of API https://bookstore.demoqa.com');
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
});

describe('PUT /bookstore/v1/books/{ISBN}', () => {
  test('Обновление книги', async () => {
    reporter.startStep('step_name');
    const res = await book.update_book({
      userId: config.userID,
      isbn: config.new_isbn,
    });
    reporter.endStep('step_name');
    // jest.retryTimes(3);
    expect(res.body.books[0].isbn).toBe('9781449325862');
    expect(res.status).toEqual(200);
  });
});

describe('DELETE /bookstore/v1/book', () => {
  test('Удаление книги', async () => {
    const res = await book.delete_book({
      isbn: config.new_isbn,
      userId: config.userID,
    });
    expect(res.status).toEqual(204);
  });
});

describe('пааметризированный тест', () => {
test.concurrent.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add (%i,%i)', async (a, b, expected) => {
  expect(a + b).toBe(expected);
});
});