const { Thoughts, Users } = require('../models');


const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'Thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id:-1 })
        .then(UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
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
        Thoughts.findOneAndDelete({ _id: params.thoughtsId })
        .then(deletedThoughts => {
            if (!deletedThoughts) {
                return res.status(404).json({ message: 'No Thought Found with this Id! '});
            }
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtsId } },
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
            { $pull: { reaction: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(UserData => res.json(UserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;