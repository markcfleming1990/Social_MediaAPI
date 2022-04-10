const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addNewReaction,
  deleteReaction
  
} = require('../../controller/thought-controller');


router
  .route('/')
  .get(getAllThought);


router
  .route('/:userId')
  .post(createThought);


router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(addNewReaction)


router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;