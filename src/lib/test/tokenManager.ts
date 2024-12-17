import fs from 'fs';
import path from 'path';

const tokenFilePath = path.join(__dirname, 'token.json');

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