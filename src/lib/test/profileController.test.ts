import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { getToken, setId } from './dataStore';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Test User route API Calls', () => {
    let id = 0;
  it('Get /profiles', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Post /profile', async () => {
    const token = getToken();
    const response = await request(app).post('/api/v1/profile')
        .send({
            bio: 'The very First Bio',
            avatarUrl: 'The very First Avatar',
            user: {
              connect: { id: 114 },
            },
        })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    id = response.body.profile.id;
    setId('id', id);
  });
  it('Put /profile/:profile', async () => {
    const token = getToken();
    const response = await request(app).put(`/api/v1/profile/${id}`)
    .send({
        bio: 'Updated Bio',
        avatarUrl: 'Updated Avatar',
        user: {
          connect: { id: 163 },
        },
    })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
