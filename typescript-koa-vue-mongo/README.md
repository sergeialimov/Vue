## Description
Fullstack app based on [Vue.js](https://vuejs.org/), [Koa.js](https://koajs.com/), and [mongoose.js](https://mongoosejs.com/).<br>
The project consists of two independent parts – `server` and `client`.<br>
The author is aware of the benefits of monolith architecture, but to speed up the development process and simplify maintenance, keeps those parts separate.
The database is running on cloud.mongodb.com.

## Business logic
The prototype of a widget, allowing take payments from users. It is possible to input values both from presets and manually. Users could select a currency from the list, the value converts by predefined rate. After clicking on the `Donate` button, the `POST` request is sent to the server and stored in the database. The frontend part includes its validation of the user's input. Apart from that, the server and database handle possible errors on their levels. After donation, the user receives a notification about the status of the operation.

## Installation

Tested with latest stable Node.js, version `16.10`. Compatibility issues could appear with lower versions

### Client
```bash
$ cd client
$ yarn install
```

### Server

```bash
$ cd server
$ yarn install
$ cp config/default-dev.ts config/development.ts
```
Specify actual `username` and `password`

## Running the app
### Client

```bash
# development
$ yarn serve
```

The app is available on http://localhost:8080/

### Server

```bash
# development
$ yarn start

# watch mode
$ yarn watch
```

### Access database
The database is up and running on https://cloud.mongodb.com/. Access is possible by connection URL <br>
```
mongodb://<username>:<password>@sergeialimov-shard-00-00.pjzv3.mongodb.net:27017,sergeialimov-shard-00-01.pjzv3.mongodb.net:27017,sergeialimov-shard-00-02.pjzv3.mongodb.net:27017/fund?ssl=true&replicaSet=atlas-ux5fqx-shard-0&authSource=admin&retryWrites=true&w=majority"
```
Note: replace `username` and `password` in URL with real data
## Tests
### Client
```bash
$ yarn test
```

### Server
```bash
$ cd server
$ yarn install
$ cp config/default-test.ts config/test.ts
```
Specify actual `username` and `password`

```bash
$ yarn test
```

## API documentation
http://localhost:3003/swagger-html

## Issues in progress
https://trello.com/b/v67Dke49/vue-koa
