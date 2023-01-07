import supertest from 'supertest';
import config from '../../framework/config/config';

const { url } = config;

//контроллеры user
const user = {
  //функция создания юзера
  create_user: (payload) => {
    return supertest(url).post('/account/v1/user').send(payload);
  },
  //функция создания токена
  create_token: (payload) => {
    return supertest(url).post('/account/v1/generatetoken').send(payload);
  },

  //функция авторизации
  login: (payload) => {
    return supertest(url).post('/account/v1/authorized').send(payload);
  },
  //   получение userId
  async getUserId() {
    const payload = config.credentials;
    const res = await this.create_user(payload);
    return res.body.userID;
  },
  //получение токена
  async getToken() {
    const payload = config.credentials;
    const res = await this.create_token(payload);
    return res.body.token;
  },
  //функция получения инфы о юзере с передачей {UUID} и токена
  info: (token, userID) => {
    return supertest(url)
      .get(`/account/v1/user/${userID}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  },
  //функция удаления юзера
  delete: (token,userID) => {
    return supertest(url)
      .delete(`/account/v1/user/${userID}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  },
};
export default user;
