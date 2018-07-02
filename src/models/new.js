module.exports = function(sequelize: any, DataTypes: any) {
  const New = sequelize.define(
    "new",
    {
      companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "companies",
            key: "id"
        }
      },
      title:  { type: DataTypes.STRING, allowNull: false },
      author:  { type: DataTypes.STRING, allowNull: false },
      content:  { type: DataTypes.STRING, allowNull: false },
      image:  { type: DataTypes.BLOB, allowNull: true },
      isAccepted: { type: DataTypes.BOOLEAN, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
      createdAt:  { type: DataTypes.DATE, allowNull: true },
      updatedAt:  { type: DataTypes.DATE, allowNull: true },
    },
    {
      classMethods: {
        associate(models) {
          this.belongsTo(models.company);
        }
      }
    }
  );
  return New;
};
