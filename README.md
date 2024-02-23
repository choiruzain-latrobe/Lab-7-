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
```
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