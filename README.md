# blog-api

This repository contains the RESTful API for accessing the blog database.
## clone

```
git clone https://github.com/choiruzain-latrobe/Lab-7-.git
```


## mock-rest-server
```
cd mock-rest-server
docker compose up --build
```

then, call the localhost 

[http:localhost:3000](http://localhost:3000/)

## blog
```
cd blog
docker compose up --build
```
## solutions

### change the routes.js 
so that it can look as follows

```javascript
const index = require('../controllers/index');
const posts = require('../controllers/posts');
const routes = {};
// Connect our controllers to specific base paths.
// For example, actions defined in our posts controller should be available at
// paths beginning with /posts.
routes.connect = (app) => {
// Use the index controller for /
app.use('/', index);
// TODO: Use the posts controller for /posts
app.use('/posts', posts) // <-- Insert this line
};
module.exports = routes;
```

Try to use HTTPie to send a request to the index endpoint (GET /posts) as follows;
```
http GET localhost:3001/posts 
```

### change the posts.js
you can create post and put http method 
```javascript
const express = require('express');
const router = express.Router();
// Index: GET /posts/
router.get('/', (req, res) => {
    res.json({ todo: 'List posts' });
});

// Show: GET /posts/:postId/
//
// Note that the path contains a variable (the :postId part). This will be
// made available as a property of the req.params object.
router.get('/:postId', (req, res) => {
    res.json({ todo: 'Show post with ID=' + req.params.postId });
});

// Destroy: DELETE /posts/:postId/
//
// Note that the path is the same as the "Show" action, but the HTTP method
// is different (we are using router.delete instead of router.get).
router.delete('/:postId', (req, res) => {
    res.json({ todo: 'Delete post with ID=' + req.params.postId });
});

// Create: POST /posts/
// TODO: Add a "Create" action
router.post('/', (req, res) => {
    res.json({ todo: 'create post with ID auto generated'});
});


// Update: PUT /posts/:postId/
// TODO: Add an "Update" action
router.put('/:postId', (req, res) => {
    res.json({ todo: 'Update post with ID=' + req.params.postId });
});
module.exports = router;
```

Then, try to call http method **post** and **put**

```
http post localhost:3001/posts/
```
and
```
http put localhost:3001/posts/2
```
# Environment variable configuration
Stop docker 

```
docker compose down
```
Create a new folder in the blog/ project directory root called **env.**
Inside this folder create a file called **mysql.env.** 
Generate password and other details (as per document guidelines), so that in the **blog/env/mysql.env** the code will look like:
```
MYSQL_USER=admin
MYSQL_PASS=b763027d3193dd897147da2c96c9417ee5d42a433f49fdd2
MYSQL_REMOTE_HOST=db
MYSQL_REMOTE_PORT=3306
```
## New Service (edit docker-compose.yml)
Modify the file as follows:
```
version: "2"
services:
  api:
    build: api
    volumes:
      - "./api:/app"
    env_file: 
      - ./env/mysql.env
    ports:
      - "3001:3000"
    links:
      - db
  db:
    image: tutum/mysql:5.6
    environment: 
      - ON_CREATE_DB=development_db 
    env_file: 
      - ./env/mysql.env 
volumes: 
  blog-db-data:
    external: false

```
## Create new file 
Create a new file, **blog/api/src/config/database.js**, so that it will look like
```javascript
// Discover Node environment (default to development)
const nodeEnv = process.env.NODE_ENV || 'development';

// Put database configuration properties into an object
const config = {
database: nodeEnv + '_db',
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASS,
host: process.env.MYSQL_REMOTE_HOST,
port: process.env.MYSQL_REMOTE_PORT,
dialect: 'mysql'
};
module.exports = config;
```


Create a new file, **blog/.sequelizerc.**, so that it will look like

```
const path = require('path');
const dbConfig = require('./src/config/database');

// Build the connection URL string
const connectionUrl = 'mysql://' +
dbConfig.user + ':' + dbConfig.password + '@' +
dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database;

// Export settings for the Sequelize command line tool
module.exports = {
'url': connectionUrl,
'migrations-path': path.resolve('src', 'migrations'),
'models-path': path.resolve('src', 'models'),
'seeders-path': path.resolve('src', 'seeders')
};
```
## Create sub directories
Under the **blog/api** folder, create three directories, as follows;
```
mkdir -p src/{models,migrations,seeders}
```

# Creating model

Run this command, under **blog** directory
```
docker compose run --rm api sequelize model:create name Post --attributes title:string,content:text
```



