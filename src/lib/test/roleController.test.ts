import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { getToken } from './dataStore';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Test User route API Calls', () => {
  it('Get /roles', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/roles')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Post /role', async () => {
    const token = getToken();
    const response = await request(app).post('/api/v1/role')
        .send({
            name: 'test'
        })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Put /role/:role', async () => {
    const token = getToken();
    const response = await request(app).put('/api/v1/role/test')
      .send({
        name: 'newtest',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
