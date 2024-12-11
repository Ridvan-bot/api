import request from 'supertest';
import express from 'express';
import router from '../../routes/index';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

let token: string;

describe('Test Welcome route API Calls', () => {
  it('Post /users/register', async () => {
    try {
      const response = await request(app).post(
        '/api/v1/users/register')
        .send({
          name: 'Test User',
          username: 'testuser',
          email: 'testuser@pohlmanprotean.se',
          password: 'losenordet',
        })
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Post /auth/login', async () => {
    try {
      const response = await request(app).post(
        '/api/v1/auth/login')
        .send({
          username: 'testuser',
          password: 'losenordet',
        })
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Get /users', async () => {
    try {
      const response = await request(app).get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Get /users/profiles', async () => {
    try {
      const response = await request(app).get('/api/v1/users/profiles')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Get /users/profile/:username', async () => {
    try {
      const response = await request(app).get('/api/v1/users/profile/testuser')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Put /users/profile/:username', async () => {  
    try {
      const response = await request(app).put('/api/v1/users/profile/testuser')
        .send({
          name: 'Updated Test User',
          email: 'updatetestuser@pohlmanprotean.se'
        })
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
  });
  it('Delete /users/profile/:username', async () => {
    try {
      const response = await request(app).delete('/api/v1/users/profile/testuser')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
});