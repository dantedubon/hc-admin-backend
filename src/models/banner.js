module.exports = function (sequelize: any, DataTypes: any) {
  const Banner = sequelize.define('banner', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.BLOB, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
  });

  return Banner;
};
