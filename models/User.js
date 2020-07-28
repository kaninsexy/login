module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      username: { unique: true, allownNull: false, type: DataTypes.STRING },
      password: { allownNull: false, type: DataTypes.STRING },
    },

    { tableName: 'users' }
  );
  User.associate = (models) => {
    User.hasMany(models.todo, { foreignKey: 'user_id' });
  };
  return User;
};
