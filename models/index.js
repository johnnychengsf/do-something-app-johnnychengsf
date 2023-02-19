const User = require('./User');
const Todo = require('./Todo');
const Note = require('./Note');

User.hasMany(Todo, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Note, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Todo.belongsTo(User, {
  foreignKey: 'user_id'
});

Note.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Note, Todo };
