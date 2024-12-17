import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { getToken } from './tokenManager';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Test User route API Calls', () => {
  it('Get /users', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Get /users/profiles', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/users/profiles')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Get /users/profile/:username', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/users/profile/testuser')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Put /users/profile/:username', async () => {
    const token = getToken();
    const response = await request(app).put('/api/v1/users/profile/testuser')
      .send({
        name: 'Updated Test User',
        email: 'updatetestuser@pohlmanprotean.se'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
