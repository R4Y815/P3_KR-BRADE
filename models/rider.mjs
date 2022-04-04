export default function riderModel(sequelize, DataTypes) {
  return sequelize.define('rider', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    suite: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rank: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    }, 
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    bAtk: {
      allowNull: false,
      type: DataTypes.STRING,
    },    
    def: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
