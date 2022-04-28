const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router 
    .route('/:UserId/:thoughtsId')
    .put(addReaction)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtsId>/<reactionId>
router.route('/:userId/:thoughtsId/:reactionId').delete(removeReaction);

module.exports = router;