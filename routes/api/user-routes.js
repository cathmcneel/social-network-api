const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend
} = require('../../controllers/users-controller');

// api/users
 router
        .route('/')
        .get(getAllUsers)
        .post(createUser);

// api/users/:id
router
        .route('/:id')
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser)
        .put(addFriend)

module.exports = router;

//BONUS: Remove a users associated thoughts when deleted

//api/users/:userId/friends/:friendId
        // POST to add a new friend to a user's friend list
        // DELETE to remove a friend from a user's friend list

// api/thoughts
        // GET to get all thoughts
        // GET to a single thought by its _id
        // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
        // PUT to update a thought by its _id
        // DELETE to remove a thought by its _id

// api/thoughts/:thoughtId/reactions
        // POST to create a reaction stored in a single thought's reactions array field
        // DELETE to pull and remove a reaction by the reaction's reactionId value



