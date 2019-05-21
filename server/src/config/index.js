global.__DEV__ = true;
// __STAGE__
global.__PROD__ = false;


export default {
  name: 'Your super app',
  port: 3000,
  db: {
    url: 'mongodb://localhost/newDB:27017',
  },
  jwt: {
    secret: 'YOUR_SECRET',
  },
};
