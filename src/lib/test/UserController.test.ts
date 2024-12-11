import request from 'supertest';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
let token: string;

describe('Test API Calls', () => {
  it('Test welcome message', async () => {
    const response = await request('http://localhost:3000/api/v1/welcome').get('/');
    expect(response.status).toBe(200);
  });

  it('Create a test user', async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/register',
        {
          name: 'Test User',
          username: 'testuser',
          email: 'testuser@pohlmanprotean.se',
          password: 'losenordet',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('Get Token', async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        {
          username: 'testuser',
          password: 'losenordet',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
      token = response.data.token;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Get users', async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/users',
        {
          headers: {
            'Authorization' : 'Bearer ' + token,
          }
  }
      );
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  it('Get user by username', async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/users/profile/testuser',
        {
          headers: {
            'Authorization' : 'Bearer ' + token,
          }
        }
      );
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('Update user', async () => {
    try {
      const response = await axios.put(
        'http://localhost:3000/api/v1/users/profile/testuser',
        {
          name: 'Test User Updated',
          email: 'updatetestuser@pohlmanprotean.se'
        },
        {
          headers: {
            'Authorization' : 'Bearer ' + token,
          }
        }
      );
      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  );


  it('Delete user', async () => {
    try {
      const response = await axios.delete(
        'http://localhost:3000/api/v1/users/profile/testuser',
        {
          headers: {
            'Authorization' : 'Bearer ' + token,
          }
        }
      );
      expect(response.status).toBe(200);
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
)});