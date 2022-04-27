const { User } = require('./models')

const Userscontroller = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1 })
            .then(UserData => res.json(UserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by ID
   getUserById({ params }, res) {
       User.findOne({ _id: params.id })
       .populate({
           path: 'thoughts',
           select: '-__v'
       })
       .select('-__v')
       .then(UserData => res.json(UserData))
       .catch(err => {
           console.log(err);
           res.sendStatus(400);
       });
   },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(UserData => res.json(UserData))
        .catch(Err => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(UserData => {
            if (UserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(UserData);
        })
        .catch(err => res.json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(UserData => res.json(UserData))
        .catch(err => res.json(err));
    }
};

module.exports = Userscontroller;