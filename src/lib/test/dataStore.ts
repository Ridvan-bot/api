import fs from 'fs';
import path from 'path';

const tempDir = path.join(__dirname, 'temp');
const idFilePath = path.join(tempDir, 'id.json');
const tokenFilePath = path.join(__dirname, 'token.json');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const setId = (newId: number) => {
  fs.writeFileSync(idFilePath, JSON.stringify({ id: newId }));
};

export const getId = () => {
  if (fs.existsSync(idFilePath)) {
    const data = fs.readFileSync(idFilePath, 'utf8');
    const { id } = JSON.parse(data);
    return id;
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