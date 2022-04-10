const { Thought, User } = require('../models');


const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  //add reaction
  addNewReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, {$push: {reactions: body}}, { new: true, runValidators: true })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({message: 'No thought exists'});
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err))
  },
  //delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, {$pull: {reactions: {reactionId: params.reactionId}}}, { new : true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({message: 'No thought exists'});
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
}
};

module.exports = thoughtController;
