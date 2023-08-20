import CryptoJS from 'crypto-js';

export const encrypt = (message: string, key: string): string =>
  CryptoJS.AES.encrypt(message, key).toString();

export const decrypt = (hash: string, key: string): string =>
  CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8);
