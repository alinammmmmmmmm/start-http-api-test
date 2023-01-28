import supertest from 'supertest';
import config from '../../framework/config/config';
//установка https://github.com/faker-js/faker (в каталоге проекта с package.json) и импорт библиотеки генерации фейковых данных
// import { faker } from '@faker-js/faker';
// пример генерации пароля console.log(faker.internet.password(32,false,/[a-zA-Z0-9!@#*]/));

const { url } = config; //быстрый способ создания одноимённой пременной
export let token = ''; //переменная для временного хранения значения при выполнении цепочки запросов

//контроллеры user
export const user = {
  //функция создания токена
  create_token: (payload) => {
    return supertest(url)
      .post('/account/v1/generatetoken')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload);
  },
  //функция получения токена из тела ответа при создания токена
  async getToken() {
    const payload = config.credentials;
    const res = await this.create_token(payload);
    return res.body.token;
  },
  //функция передачи токена из переменной let
  async tokenCache() {
    if (token) {
      return token;
    }
    token = await this.getToken();
    return token;
  },
};

//контроллеры book
export const book = {
  //функция создания книги
  create_book: (payload, token) => {
    return supertest(url)
      .post(`/bookstore/v1/books`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
  },
  //функция обновления данных о книге
  update_book: (payload) => {
    return supertest(url)
      .put(`/bookstore/v1/books/${config.isbn}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
  },
  //функция получения информации о книге
  info_book: () => {
    return supertest(url)
      .get(`/bookstore/v1/book`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .query('ISBN=9781449325862')
      .send();
  },
  //функция удаления книги
  delete_book: (payload) => {
    return supertest(url)
      .delete(`/bookstore/v1/book/`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
  },
};
