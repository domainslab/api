const ENV = process.env.NODE_ENV || 'development';

export const isDev = (): boolean => {
  return ENV === 'development';
};

export const isProd = (): boolean => {
  return ENV === 'production';
};
