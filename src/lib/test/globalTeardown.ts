import request from 'supertest';
import express from 'express';
import router from '../../routes/index';
import { 
  getToken, 
  deleteTokenFile, 
  getId, 
  deleteIdFile,
  deleteTempDir
} from './dataStore';

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use('/api/v1', router);


const globalTeardown = async () => {
  const token = getToken();
  const id = getId('id');
  // Delete the test user
  await request(app)
    .delete('/api/v1/user/testuser')
    .set('Authorization', `Bearer ${token}`);

  await request(app)
    .delete('/api/v1/role/')
    .send({ name: 'newtest' })
    .set('Authorization', `Bearer ${token}`);

    await request(app)
    .delete('/api/v1/profile/')
    .send({ id: id })
    .set('Authorization', `Bearer ${token}`);

    const groupId = getId('groupId');
    await request(app)
    .delete('/api/v1/group/')
    .send({ id: groupId })
    .set('Authorization', `Bearer ${token}`);

    const userGroupId = getId('userGroupId');
    await request(app)
    .delete('/api/v1/usergroup/')
    .send({ id: userGroupId })
    .set('Authorization', `Bearer ${token}`);    
    // Delete the token file
    deleteTokenFile();
    deleteIdFile();
    deleteTempDir();
};

export default globalTeardown;