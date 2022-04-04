export default function comboModel(sequelize, DataTypes) {
  return sequelize.define('combo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    rider: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cardranks: {
      allowNull: false, 
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false, 
      type: DataTypes.STRING,
    },
    sAtk: {
      allowNull: true, 
      type: DataTypes.INTEGER,
    },      
    sDef: {
      allowNull: true, 
      type: DataTypes.INTEGER,
    },
    sEft: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
  }, { underscored: true });
}
