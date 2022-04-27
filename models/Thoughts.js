const { Schema, model, Types } = require('mongoose');


const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      // 280 character maximum
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use getter method to timestamp the query
    
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtsSchema = new Schema(
  {
    thoughText: {
      type: String,
      required: true,
      // make it to be between 1 and 280 characters
      trim: true, 
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use getter method to format timestamp on query
  
    },
    // use ReplySchema to validate data for a reply
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;