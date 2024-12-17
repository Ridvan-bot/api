import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { getToken, deleteTokenFile } from './tokenManager';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

const globalTeardown = async () => {
  const token = getToken();
  // Delete the test user
  await request(app)
    .delete('/api/v1/user/testuser')
    .set('Authorization', `Bearer ${token}`);

  await request(app)
    .delete('/api/v1/roles/')
    .send({ name: 'newtest' })
    .set('Authorization', `Bearer ${token}`);
  // Delete the token file
  deleteTokenFile();
};

export default globalTeardown;