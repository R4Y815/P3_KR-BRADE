export default function undeadModel(sequelize, DataTypes) {
  return sequelize.define('undead', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    suite: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    rank: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    prefix: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    udName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    hp: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    type: {
        allowNull: false,
        type: DataTypes.STRING,
      },        
    udDef: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    udAtk: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }, 
    udEft: {
      allowNull: true,
      type: DataTypes.STRING,
    }, 
    quota: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    sAtk: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }, 
    sDef: {
      allowNull: true,
      type: DataTypes.INTEGER,
      },
    sMod: {
      allowNull: true, 
      type: DataTypes.STRING,
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
