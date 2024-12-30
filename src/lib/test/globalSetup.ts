import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { setToken } from './dataStore';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

const setupUserAndToken = async () => {
  try {
    // Create a test user
    const registerResponse = await request(app).post('/api/v1/user/register')
      .send({
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@pohlmanprotean.se',
        password: 'losenordet',
      })
      .set('Content-Type', 'application/json');
    if (registerResponse.status !== 201) {
      throw new Error(`Failed to register user: ${registerResponse.status}`);
    }

    // Get a token for the test user
    const loginResponse = await request(app).post('/api/v1/auth/login')
      .send({
        username: 'testuser',
        password: 'losenordet',
      })
      .set('Content-Type', 'application/json');
    if (loginResponse.status !== 200) {
      throw new Error(`Failed to login user: ${loginResponse.status}`);
    }
    const token = loginResponse.body.token;
    setToken(token); // Set the token in the tokenManager
  } catch (error) {
    console.error('Error during setup:', error);
    throw error;
  }
};

const globalSetup = async () => {
  await setupUserAndToken();
};

export default globalSetup;