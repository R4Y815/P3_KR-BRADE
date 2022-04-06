import { Op } from 'sequelize';

/*
 * ========================================================
 * ========================================================
 * ========================================================
 * ========================================================
 *
 *                  Card Deck Functions
 *
 * ========================================================
 * ========================================================
 * ========================================================
 */


/* GLOBAL VARIABLES */

let mainDeck;
let removedAce = [];
let aceDeck = [];
let riderData = null;
let undeadData = null;
let riderHand = [];

/* to track whose turn it is */;

/* Turn Combo - for STUN, BIND effects */

// get a random index from an array given it's size
const getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

/* HELPER FN: SHUFFLE CARDS*/
const shuffleCards = function (cards) {
  let currentIndex = 0;

  // loop over the entire cards array
  while (currentIndex < cards.length) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;

    currentIndex += 1;
  }

  // give back the shuffled deck
  return cards;
};

/* HELPER FN: MAKE CARDS */
const makeDeck = function () {
  // create the empty deck at the beginning
  const deck = [];

  const suits = ['spades'];
 /*  , 'hearts', 'diamonds', 'clubs'
 */
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    let rankCounter = 1;
    while (rankCounter <= 13) {
      let cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName === 1) {
        cardName = 'ace';
      } else if (cardName === 11) {
        cardName = 'jack';
      } else if (cardName === 12) {
        cardName = 'queen';
      } else if (cardName === 13) {
        cardName = 'king';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }

  return deck;
};


/* REMOVE ALL ACES: cardDeck */
const removeAces = (cards) => { 
let ace;
for (let i = 0; i < cards.length; i += 1) {
  if(cards[i].rank === 1) {
    ace = cards.splice(`${i}`,1)
    aceDeck.push(ace[0]);
  }
}
console.log('aceDeck b4 matching=', aceDeck);
console.log('riderData.suit =', riderData.suit);

  for(let j = 0; j < aceDeck.length; j += 1){
    if(aceDeck[j].suit === riderData.suit) {
      let aceKept = aceDeck.splice(`${j}`,1);
      removedAce.push(aceKept[0]);
    }
  }
 console.log('final aceDeck =', aceDeck);
 console.log('removed Ace =', removedAce);

};



/* RETURN ALL UN-SELECTED ACES TO CARDDECK */
const returnAces = (deck48) => {
  if (aceDeck.length >= 2) {
    aceDeck.forEach((ace) => {
      deck48.push(ace);
    });
  } else if (aceDeck.length < 2){
    console.log('ERROR WITH ACE DECK')
    return null;
  }
} 




/*
 * ========================================================
 * ========================================================
 * ========================================================
 * ========================================================
 *
 *                  Game Logic Functions
 *
 * ========================================================
 * ========================================================
 * ========================================================
 */
   /* RIDER ACTION FN GRP */

   /* **** MINI-FN: Rider atk modifies Undead's image */
   const riderAtk = (riderData, undeadData) => {
    const finalDmgOut = riderData.bAtk * (undeadData.udDef / 100);
    undeadData.hp -= Math.round(finalDmgOut);
   };




   /* UNDEAD AI ACTION GRP */

  /* **** MINI-FN: Undead atk on the rider  */
const undeadAtk = (undeadData, riderData) => {
  const finalDmgOut = undeadData.udAtk * (riderData.def / 100);
  riderData.hp -= Math.round(finalDmgOut);
};


/*
 * ========================================================
 * ========================================================
 * ========================================================
 * ========================================================
 *
 *                  Controller Functions
 *
 * ========================================================
 * ========================================================
 * ========================================================
 */


export default function initGamesController(db) {
  // Rendering main start create games page from public/games.
  const index = (request, response) => {
    response.render('games/index'); /* used to be rendering from public/games/index */
  };

  /* LOAD Rider based on Ace card drawn */
  const selectRider = async(request, response) => {
    try {
      const riderId = request.body.riderAceId;
      console.log('BackEnd: RiderId =', riderId);

      /* const riderDbQuery = await db.Rider.findByPk(riderId); */
      const riderDbQuery  = await db.Rider.findAll({
        where: {
          id: riderId,
        },
      });
      riderData = JSON.parse(JSON.stringify(riderDbQuery))[0];
     /*  console.log('riderDbquery =', riderDbQuery); */
      console.log('riderData =', riderData);
    } catch (error) {
      console.log(error);
    }
  };



  /* RELEASE Undead from cardDeck based on card drawn */
  /* need to work with the unused cards */
  const loadCombos = async(request, response) => {
    try{

    } catch (error) {
      console.log(error);
    }

  };

  const loadUndead = async(request, response) => {
    try {
      /* Clear aceDecks for Use */
      aceDeck = [];
      removedAce = [];
      /* generate unDead */

      /* create clean deck, keeping the order */
      mainDeck = shuffleCards(makeDeck());
      console.log('MainDeck =', mainDeck);
      
      /* remove aces from deck after rider is picked */
      removeAces(mainDeck);  
      /* PokerCard to generate UNDEAD Monster */
      const undeadCard = mainDeck.pop(); 
     
      /* GET MONSTER STATS */
      const undeadDbQuery = await db.Undead.findAll({
        where: {
          [Op.and]: [{suit: undeadCard.suit}, {rank: undeadCard.rank}],
        },
      });
      undeadData = JSON.parse(JSON.stringify(undeadDbQuery))[0];

      console.log('undeadCard =', undeadCard);
      console.log('undeadData =', undeadData);
      console.log('no. of undeads locked in Cards =', mainDeck.length);
     
      /* SET UP MONSTER IMAGE FOR GAMESTATE INSTANCE */

    } catch (error) {
      console.log(error);
    }
  };




  // CREATE A NEW GAME. Insert a new row in the DB. 
  const create = async (request, response) => {
    const newGame = {
      gameState: {
        mainDeck,
        riderData,
        undeadData,
        aceDeck,
        removedAce,
        riderHand,
      },
    };

    try {
      // run the DB INSERT query
      const game = await db.Game.create(newGame); 

      // send the new game back to the user.
      // dont include the deck so the user can't cheat
      response.send({
        id: game.id,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /* For FrontEnd to get RiderData Display */
  const getRiderImage = async (request, response) => {
    try {
      /* get gameId of current gamestate pushed from front-end*/
      const game = await db.Game.findByPk(request.params.id)
      
      /* and send back the gameState/image data found by id */
      response.send({ 
        id: request.params.id,
        riderName: game.gameState.riderData.name, 
        riderHp: game.gameState.riderData.hp, 
        riderDef: game.gameState.riderData.def,
        riderbAtk: game.gameState.riderData.bAtk,
        undeadName: game.gameState.undeadData.udName,
        undeadRank:game.gameState.undeadData.rank,
        undeadHp: game.gameState.undeadData.hp,
        undeadDef: game.gameState.undeadData.udDef,
        undeadbAtk: game.gameState.undeadData.udAtk,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  
/* NEED TO PULL UP THE CORRECT GAME/TURN ID!! */
  // deal two new cards from the deck.
  const riderAction = async (request, response) => {
    try {
      // get the game by the ID passed in the request
      const game = await db.Game.findByPk(request.params.id);

      console.log('riderData =', riderData);
      console.log('undeadData B4 Atk =', undeadData);

      riderAtk(riderData, undeadData);
      undeadAtk(undeadData, riderData);
      console.log('undeadData after being attacked =', undeadData);
      // make changes to the object
      // update the game with the new info
       await game.update({
        gameState: {
          riderData: riderData,
          undeadData: undeadData,
        }, 

      });
      // send the updated game back to the user.
      // dont include the deck so the user can't cheat
 /*      response.send({
        id: game.id, 
  
      });*/
    } catch (error) {
      response.status(500).send(error);
    }
  };

  // GET Undead Data based on Card popped from Deck of 48


  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    riderAction,
    create,
    index,
    selectRider,
    loadUndead,
    loadCombos,
    getRiderImage,
  };
}


/* Based on user id return the game id and allow for loading of previous saved Game Id */


/* Effects idea
* 1) Place a status object for RiderImage
* 2) Start an effect Timer Counter, if status object is blank, counter is inactive
  3) counter takes value if undead applies relevant effect 
  4) decrement counter on undead action side
  5) As Long as counter is active, effect persists on riderAction side and or image */

