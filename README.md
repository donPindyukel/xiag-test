# Xiag test task

### System requirements

  - Nodejs > 8
  - Mongo DB 4.0.10 or current actual version

### Describe:
This is test task application. There are 2 parts:
 - Server part (NodeJs + Express + MongoDb + socketIo)
 - Front part(React + socketIo), front part doesn't have Redux, because logic and bussines logic of test task is very simple

## Installation instructions

Application requires [Node.js](https://nodejs.org/) v8+ to run and install and run [MongoDB](https://www.mongodb.com/). You can edit config file in source code if you want reassign ports on localhost. You can find config file of server part `xiag-test/server/src/config/index.js`

### Launch server part

You have to launch MongoDB and go to server part directory:
```sh
$ sudo service mongod start
$ cd server
$ npm install
```

After installation dependencies you have to:
```sh
$ npm run start
```

### Launch front part

You have to go to front part directory:
```sh
$ cd front
$ npm install
```
After installation dependencies you you can launch app on dev server in `http://localhost:8080`:
```sh
$ npm run start
```

Application will be available from browser on `http://localhost:8080`
