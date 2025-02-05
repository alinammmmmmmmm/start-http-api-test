import supertest from 'supertest';
import config from '../config';

const {url} = config;
let token = '';

//контроллер user
const user =  {
  //функция авторизации
  login: (payload) => {
    return supertest(url)
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send(payload);
  },
  async getAuthToken() {
    const payload = config.credentials;
    const res = await this.login(payload);
    return res.body.token;
  },
  async getAuthTokenWithCache() {
    if (token) {
      return token;
    }
    token = await this.getAuthToken();
    return token;
  },

  user:(token) => {
    return supertest(url)
    .get('/api/v1/user')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
  }
};

export default user;