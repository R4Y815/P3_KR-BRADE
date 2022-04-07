const { fa } = require("faker/lib/locales");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      game_state: {
        // JSON allows us to store non-relational data easily.
        // Non-relational data refers to data that we may not query across records.
        // For the purposes of this project, where the focus is AJAX, let's store
        // all game state (e.g. cardDeck, playerHand) in the gameState JSON column.
        type: Sequelize.JSON,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

/*     await queryInterface.createTable('gameusers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'games',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); */

  await queryInterface.createTable('riders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      suit: {
        allowNull: false, 
        type: Sequelize.STRING,
      },
      rank: {
        allowNull: false,
        type: Sequelize.INTEGER, 
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hp: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      b_atk: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      def:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('undeads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      suit:{
        allowNull: true,
        type: Sequelize.STRING,
      },
      rank: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      prefix: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ud_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      }, 
      hp: {
        allowNull: false, 
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ud_def: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ud_atk: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },            
      ud_eft: {
        allowNull: true, 
        type: Sequelize.STRING,
      },
      quota: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      s_atk: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      s_def: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      s_mod: {
        allowNull: true, 
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    
    await queryInterface.createTable('combos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rider: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cardranks: {
        allowNull: false, 
        type: Sequelize.STRING,
      },
      s_atk: {
        allowNull: true, 
        type: Sequelize.INTEGER,
      },      
      s_def: {
        allowNull: true, 
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false, 
        type: Sequelize.STRING,
      },
      s_eft: {
        allowNull: true, 
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },


  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
/*     await queryInterface.dropTable('gameusers'); */
    await queryInterface.dropTable('games');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('riders');
    await queryInterface.dropTable('undeads');
    await queryInterface.dropTable('combos');
    
  },
};