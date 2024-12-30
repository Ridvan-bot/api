import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { getToken, setId } from './dataStore';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Test User route API Calls', () => {
    let groupId = 0;
  it('Get /groups', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/groups')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Post /group', async () => {
    const token = getToken();
    const response = await request(app).post('/api/v1/group')
        .send({
            name: 'TestGroup',
            // Below is a future implementation
            // user: {
            //   connect: { id: 114 },
            // },
        })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    groupId = response.body.group.id;
    setId('groupId', groupId,);
  });
  it('Put /group/:group', async () => {
    const token = getToken();
    const response = await request(app).put(`/api/v1/group/${groupId}`)
    .send({
        name: 'Updated name',
        // Below is a future implementation
        // user: {
        //   connect: { id: 163 },
        // },
    })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
