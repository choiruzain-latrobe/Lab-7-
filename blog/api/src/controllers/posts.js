const express = require('express');
const _ = require('lodash');
const models = require('../models');
const router = express.Router();

// Selects only the fields that are allowed to be set by users
function postFilter(obj) {
  return _.pick(obj, ['title', 'content']);
}

// Index
router.get('/', (req, res) => {
  // Return a list of the five most recent posts
  const queryOptions = {
    order: [['createdAt', 'DESC']],
    limit: 5
  };
  models.Post.findAll(queryOptions)
      .then(posts => res.json(posts))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Create
router.post('/', (req, res) => {
  // Create a new post record in the database
  models.Post.create(postFilter(req.body))
      .then(post => res.json(post))
      .catch(err => res.status(422).json({ error: err.message }));
});

// Show
router.get('/:postId', (req, res) => {
  // Return the specified post record from the database
  models.Post.findById(req.params.postId)
      .then(post => res.json(post))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:postId', (req, res) => {
  // Delete the specified post record from the database
  models.Post.destroy({ where: { id: req.params.postId } })
      .then(() => res.json({}))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Update
// TODO: Implement the update action here
router.put('/:postId', (req, res) => {
  // Update the specified post record in the database
  models.Post.findById(req.params.postId)
      .then(post => post.update(postFilter(req.body)))
      .then(post => res.json(post))
      .catch(err => res.status(422).json({ error: err.message }));
});
module.exports = router;