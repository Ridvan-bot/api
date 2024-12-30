import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { getToken, setId } from './dataStore';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Test User route API Calls', () => {
  let userGroupId = 0;
  it('Get /userGroups', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/userGroups')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Get /userGroup/:userGroupId', async () => {
    const token = getToken();
    const response = await request(app).get('/api/v1/usergroup/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
    it('Post /userGroup', async () => {
      const token = getToken();
      const response = await request(app).post('/api/v1/usergroup')
          .send({
              user: {
                  connect: {
                      id: "154"
                  }
              },
              group: {
                  "connect":{ "id": 1}
              }
          
          })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(201);
      userGroupId = response.body.userGroup.id;
      setId('userGroupId', userGroupId);
    });
  it('Put /userGroup/:userGroupId', async () => {
    const token = getToken();
    const response = await request(app).put(`/api/v1/userGroup/${userGroupId}`)
      .send({
        user: {
            connect: {
                id: "163"
            }
        },
        group: {
          connect: {
              id: 26
          }
        }
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
