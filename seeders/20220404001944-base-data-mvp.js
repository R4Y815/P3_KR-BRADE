module.exports = {
  async up(queryInterface, __) {
    const userData = [
      {
        email: 'a@a.com',
        password: 'a',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'b@b.com',
        password: 'b',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    /* Insert user data into table */
    await queryInterface.bulkInsert(
      'users',
      userData,
      { returning: true },
    );

    /*DEFINE RIDER DATA */
    const riderData = [
      {
        suite: 'spades',
        rank: 1,
        name: 'Blade',
        b_atk: 480,
        type: 'ground',
        def: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'hearts',
        rank: 1,
        name: 'Chalice',
        b_atk: 530,
        type: 'ground',
        def: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'diamonds',
        rank: 1,
        name: 'Garren',
        b_atk: 450,
        type: 'ground',
        def: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'clubs',
        rank: 1,
        name: 'Leangle',
        b_atk: 490,
        type: 'ground',
        def: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    /* Insert Rider data */
    await queryInterface.bulkInsert(
      'riders',
      riderData,
      { returning: true },
    );

    /* DEFINE UNDEAD DATA */
    const undeadData = [
      {
        suite: 'spades',
        rank: 2,
        prefix: 'Slash',
        ud_name: 'Lizard',
        hp: 1000,
        type: 'ground',
        ud_def: 10,
        ud_atk: 800,
        ud_eft: null,
        quota: 400,
        s_atk: 800,
        s_def: null,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 3,
        prefix: 'Beat',
        ud_name: 'Lion',
        hp: 1500,
        type: 'ground',
        ud_def: 15,
        ud_atk: 950,
        ud_eft: null,
        quota: 600,
        s_atk: 1000,
        s_def: null,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 4,
        prefix: 'Tackle',
        ud_name: 'Boar',
        hp: 1800,
        type: 'ground',
        ud_def: 10,
        ud_atk: 750,
        ud_eft: null,
        quota: 800,
        s_atk: 1200,
        s_def: null,
        s_mod: 'Grab', 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 5,
        prefix: 'Kick ',
        ud_name: 'Locust',
        hp: 1200,
        type: 'ground',
        ud_def: 10,
        ud_atk: 850,
        ud_eft: null,
        quota: 1000,
        s_atk: 1200,
        s_def: null,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 6,
        prefix: 'Thunder',
        ud_name: 'Deer',
        hp: 2250,
        type: 'ground',
        ud_def: 10,
        ud_atk: 1000,
        ud_eft: 'E-Shock',
        quota: 1200,
        s_atk: 2400,
        s_def: null,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 7,
        prefix: 'Metal',
        ud_name: 'Trilobite',
        hp: 3320,
        type: 'ground',
        ud_def: 50,
        ud_atk: 859,
        ud_eft: null,
        quota: 1200,
        s_atk: null,
        s_def: 90,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 8,
        prefix: 'Magnet',
        ud_name: 'Buffalo',
        hp: 3870,
        type: 'ground',
        ud_def: 30,
        ud_atk: 950,
        ud_eft: null,
        quota: 1400,
        s_atk: 2400,
        s_def: null,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 9,
        prefix: 'Mach',
        ud_name: 'Jaguar',
        hp: 4420,
        type: 'ground',
        ud_def: 30,
        ud_atk: 1400,
        ud_eft: null,
        quota: 1600,
        s_atk: 800,
        s_def: null,
        s_mod: 'Sonic5', 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 10,
        prefix: 'Time',
        ud_name: 'Scarab',
        hp: 1400,
        type: 'ground',
        ud_def: 10,
        ud_atk: 600,
        ud_eft: 'Delay1',
        quota: 1800,
        s_atk: null,
        s_def: null,
        s_mod: 'Delay1', 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 11,
        prefix: 'Fusion',
        ud_name: 'Eagle',
        hp: 5000,
        type: 'ground',
        ud_def: 30,
        ud_atk: 3500,
        ud_eft: null,
        quota: 2400,
        s_atk: 4000,
        s_def: 70,
        s_mod: 'Flight, B.AtkUp, DefUp', 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 12,
        prefix: 'Absorb',
        ud_name: 'Capricorn',
        hp: 3320,
        type: 'ground',
        ud_def: 10,
        ud_atk: 600,
        ud_eft: 'FormCpy',
        quota: 2000,
        s_atk: null,
        s_def: null,
        s_mod: null, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        suite: 'spades',
        rank: 13,
        prefix: 'Evolution',
        ud_name: 'Caucasus',
        hp: 12720,
        type: 'ground',
        ud_def: 60,
        ud_atk: 5000,
        ud_eft: 'taunt',
        quota: 4600,
        s_atk: 100000,
        s_def: 99,
        s_mod: 'B.AtkMax, DefMax, TDmg', 
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    /* Insert Undead data */
    await queryInterface.bulkInsert(
      'undeads',
      undeadData,
      { returning: true },
    );

    /* DEFINE COMBO DATA */
    const comboData = [
      {
        rider: 'Blade',
        name: 'Lightning Blast',
        cardranks: '2,6',
        type: 'ground',
        s_atk: 3000,
        s_def: null,
        s_eft: 'E-Shock',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        rider: 'Blade',
        name: 'Lightning Slash',
        cardranks: '2,6',
        type: 'ground',
        s_atk: 4200,
        s_def: null,
        s_eft: 'TDmg, E-Shock, Stun',
        created_at: new Date(),
        updated_at: new Date(),        
      },
      {
        rider: 'Blade',
        name: 'Lightning Sonic',
        cardranks: '5,6,9',
        type: 'aerial',
        s_atk: 4200,
        s_def: null,
        s_eft: null,
        created_at: new Date(),
        updated_at: new Date(),        
      },
      {
        rider: 'Blade',
        name: 'Mach-Slash',
        cardranks: '2,9',
        type: 'ground',
        s_atk: 3400,
        s_def: null,
        s_eft: null,
        created_at: new Date(),
        updated_at: new Date(),        
      },
      {
        rider: 'Blade',
        name: 'Beat-Metal',
        cardranks: '2,7',
        type: 'ground',
        s_atk: 1200,
        s_def: 90,
        s_eft: 'DefUp',
        created_at: new Date(),
        updated_at: new Date(),        
      },
    ];
      /* Insert combos data */
    await queryInterface.bulkInsert(
      'combos',
      comboData,
      { returning: true },
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('riders', null, {});
    await queryInterface.bulkDelete('undeads', null, {});    
    await queryInterface.bulkDelete('combos', null, {});
  },
};