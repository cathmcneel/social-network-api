const { Thoughts, Users } = require('../models');
const User = require('../models/Users');

const thoughtsController = {
    //add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { comments: _id } },
                { new: true }
            );
        })
        .then(UserData => {
            if (UserData) {
                res.status(404).json({ message: 'No user found with this ID! '});
                return;
            }
            res.json(UserData);
        })
        .catch(err => res.json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, { $push: { reactions: body } }, {new: true })
        .then(UserData => {
            if(!UserData) {
            res.status(404).json({ message: 'No User found with this ID!' });
            return;
        }
        res.json(UserData);
    })
    .catch(err => res.json(err));
    },

    // remove thought
    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.commentId })
        .then(deletedThoughts => {
            if (!deletedThoughts) {
                return res.status(404).json({ message: 'No Thought Found with this Id! '});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { comments: params.thoughtsId } },
                { new: true }
            );
        })
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({ message: 'No User found with this id! '});
                return;
            }
            res.json(UserData);
        })
        .catch(err => res.json(err));
    },

    // remove reaction
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(UserData => res.json(UserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;