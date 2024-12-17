declare global {
  var token: string;
}

// store the token in a global variable
globalThis.token = '';

export const setToken = (newToken: string) => {
  globalThis.token = newToken;
};

export const getToken = () => {
  return globalThis.token;
};