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



let pokerCardDeck = null;
let aceDeck = null;


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

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
  cards.forEach((card) =>{
    /* is there a better way to do this? */
    if (card.rank == 1) {
      aceDeck.push(card);
    }
  });
};

/* RETURN ALL UN-SELECTED ACES TO CARDDECK */
const return3Aces = (deck48) => {
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

  // create a new game. Insert a new row in the DB.
  // also show 4 aces, covered to the user. 
  const create = async (request, response) => {

  /* create clean deck, keeping the order */
    const ordered52cards = makeDeck();
  /* remove aces from ordered deck and separate the 2 decks*/
    removeAces(ordered52cards);

  /* Shuffle the remaining deck
    * it will be used to generate undeads */
   const cardDeck = shuffleCards(ordered52cards)

   const cardOfMonster = cardDeck.pop();
  
  /* WE NOW HAVE MONSTER'S CARD GENERATED, WHAT ABOUT THE RIDER'S CARD? */
    const newGame = {
      gameState: {
        cardDeck,
        playerHand,
      },
    };

    try {
      // run the DB INSERT query
      const game = await db.Game.create(newGame);

      // send the new game back to the user.
      // dont include the deck so the user can't cheat
      response.send({
        id: game.id,
        playerHand: game.gameState.playerHand,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  // deal two new cards from the deck.
  const deal = async (request, response) => {
    try {
      // get the game by the ID passed in the request
      const game = await db.Game.findByPk(request.params.id);

      // make changes to the object
      const playerHand = [game.gameState.cardDeck.pop(), game.gameState.cardDeck.pop()];

      // update the game with the new info
      await game.update({
        gameState: {
          cardDeck: game.gameState.cardDeck,
          playerHand,
        },

      });

      // send the updated game back to the user.
      // dont include the deck so the user can't cheat
      response.send({
        id: game.id,
        playerHand: game.gameState.playerHand,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    deal,
    create,
    index,
  };
}