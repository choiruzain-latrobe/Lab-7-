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


