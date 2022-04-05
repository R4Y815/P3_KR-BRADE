import regeneratorRuntime from 'regenerator-runtime';
/* may not be able to import pg? */
import axios from 'axios';
import './main.scss'; /* for stylesheet */

/* BELOW: Test examples for importing modules to front-end */
import { arrow } from './arrowFn.js';
import 'core-js/es/function';


console.log('This is from index.js');

const obj = {
  a: 'apple',
  b: 'buffalo',
};

const newObj = { ...obj, c: 'cheetah' };
console.log('new obj', newObj);

const result = arrow();
console.log('result', result);
/* ABOVE: Test examples for importing modules to front-end */


// Test Example: Make a request for all the items
/* axios.get('/items')
  .then((response) => {

    console.log(response.data.items);

    const itemCont = document.createElement('div');

    response.data.items.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.innerText = JSON.stringify(item);
      itemEl.classList.add('item');
      document.body.appendChild(itemEl);
    });

    document.body.appendChild(itemCont);
  })
  .catch((error) => {

    console.log(error);
  }); */

/* ============================================================================================================ */
/* ============================================================================================================ */  



/* Global Variables per turn */

/* Rider Global Variables */
/** Can we put the following into an object? */
let rider;
let riderHp;
let riderType;
let riderDef;
let riderbAtk;
let riderStatus;


/* summoned Card Global Variables */
/** Can we put the following into an object? */
let sCard;
let sCardAtk;
let sCardDef;
let sCardMod;



/* Undead Global Variables */
/** Can we put the following into an object? */
let undead;
let undeadHp;
let undeadAtk;
let undeadDef;
let undeadType;
let undeadStatus;



/* card deck Global Variables */
let userDeck = [];
