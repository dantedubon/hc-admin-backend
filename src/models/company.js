module.exports = function(sequelize: any, DataTypes: any) {
  const Company = sequelize.define('company', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    sector: { type: DataTypes.INTEGER, allowNull: false },
    products: { type: DataTypes.STRING, allowNull: false },
    capitalPercentage: { type: DataTypes.INTEGER, allowNull: false },
    employeesPercentage: { type: DataTypes.INTEGER, allowNull: false },
    productivityPercentage: { type: DataTypes.INTEGER, allowNull: false },
    province: { type: DataTypes.INTEGER, allowNull: true },
    city: { type: DataTypes.INTEGER, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    branches: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    primaryPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    isPrimaryPhoneNumberInWhatsapp: { type: DataTypes.BOOLEAN, allowNull: false },
    secondaryPhoneNumber: { type: DataTypes.STRING, allowNull: true },
    isSecondaryPhoneNumberInWhatsapp: { type: DataTypes.BOOLEAN, allowNull: false },
    facebook: { type: DataTypes.STRING, allowNull: true },
    instagram: { type: DataTypes.STRING, allowNull: true },
    website: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.BLOB, allowNull: true },
    isAccepted: { type: DataTypes.BOOLEAN, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false },
  });

  return Company;
};
