const ENV = process.env.NODE_ENV || 'development';

export const isDev = (): boolean => {
  return ENV === 'development';
};
