import request from 'supertest';
import express from 'express';
import router from '../../routes/index';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Test Welcome route API Calls', () => {
  it('Get /welcome', async () => {
    const response = await request(app).get('/api/v1/welcome');
    expect(response.status).toBe(200);
  });
});