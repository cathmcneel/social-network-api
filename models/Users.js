const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const FriendSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    friendId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true
      //make this unique
    },
    email: {
      type: String,
      required: true,
      //make it unique
      //make it match a valid emial address (mongoose matching validation)
    },
    thoughts: [
      {
        //array of _id values referencing thoughts model
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
 //friends- an array of _id values referencing User model
  friends: [
   {
     //array
     type: Schema.Types.ObjectId,
     ref: 'Users'
   }
 ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of thoughts and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
      (total, friends) => total + friends.replies.length + 1,
      0
    );
  });

  // create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;