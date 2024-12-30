import fs from 'fs';
import path from 'path';
import { IdData } from 'types/types';

const tempDir = path.join(__dirname, 'temp');
const idFilePath = path.join(tempDir, 'id.json');
const tokenFilePath = path.join(tempDir, 'token.json');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const setId = (name: string, newId: number) => {
  let data: IdData = {};
  if (fs.existsSync(idFilePath)) {
    data = JSON.parse(fs.readFileSync(idFilePath, 'utf8')) as IdData;
  }
  data[name] = newId;
  fs.writeFileSync(idFilePath, JSON.stringify(data, null, 2));
};

export const getId = (idInput: string) => {
  if (fs.existsSync(idFilePath)) {
    const data = fs.readFileSync(idFilePath, 'utf8');
    if (idInput === 'groupId') {
      const { groupId } = JSON.parse(data);
      return groupId;
    }
    if (idInput === 'userGroupId') {
      const { userGroupId } = JSON.parse(data);
      return userGroupId;
    }
    else {
    const { id } = JSON.parse(data);
    return id;
    }
  }
  return null;
};

export const deleteIdFile = () => {
  if (fs.existsSync(idFilePath)) {
    fs.unlinkSync(idFilePath);
  }
};

export const setToken = (newToken: string) => {
  fs.writeFileSync(tokenFilePath, JSON.stringify({ token: newToken }));
};

export const getToken = () => {
  if (fs.existsSync(tokenFilePath)) {
    const data = fs.readFileSync(tokenFilePath, 'utf8');
    const { token } = JSON.parse(data);
    return token;
  }
  return '';
};

export const deleteTokenFile = () => {
  if (fs.existsSync(tokenFilePath)) {
    fs.unlinkSync(tokenFilePath);
  }
};

export const deleteTempDir = () => {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
};