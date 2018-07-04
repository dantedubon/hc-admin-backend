module.exports = function(sequelize: any, DataTypes: any) {
  const New = sequelize.define('new', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.BLOB, allowNull: true },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  });
  return New;
};
