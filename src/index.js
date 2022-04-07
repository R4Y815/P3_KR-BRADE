import regeneratorRuntime from 'regenerator-runtime';
/* may not be able to import pg? */
import axios from 'axios';
import './main.scss'; /* for stylesheet */

/* BELOW: Test examples for importing modules to front-end */
import { arrow } from './arrowFn.js';
import 'core-js/es/function';

/* ============================================================================================================ */  



/* card deck Global Variables */


let selectedAceId;
let currentGame;

/* Create Element to register User's choice on which card is picked */
const createAceChoiceSection = () => {
const aceContainer = document.createElement('div');
document.body.appendChild(aceContainer);
for (let i = 0; i < 4; i += 1) {
  const radioInputEl = document.createElement('input');
  radioInputEl.setAttribute('type', 'radio');
  radioInputEl.setAttribute('id', `aceCard${i + 1}`);
  radioInputEl.setAttribute('name', 'aceCardId');
  radioInputEl.setAttribute('value', `${i + 1}`);
  aceContainer.appendChild(radioInputEl);
  const radioInputLabel = document.createElement('label');
  radioInputLabel.setAttribute('for', `aceCard${i + 1}`);
  radioInputLabel.setAttribute('id', `aceCardLabel${i + 1}`);
  radioInputLabel.innerText = `Card ${i + 1} `;
  aceContainer.appendChild(radioInputLabel);
}

const aceSubmit = document.createElement('button');
aceSubmit.setAttribute('type', 'button');
aceSubmit.setAttribute('id', 'aceSubmit');
aceSubmit.innerText = 'Transform';
document.body.appendChild(aceSubmit);

aceSubmit.addEventListener('click', () => {
  const aceNmbrElements = document.getElementsByName('aceCardId');
  for( let i = 0; i < aceNmbrElements.length; i += 1) {
    if (aceNmbrElements[i].checked) {
      selectedAceId = Number(aceNmbrElements[i].value);
    }
  }
  console.log('selectedAceId =', selectedAceId);
  const requestBody = {};
  requestBody.riderAceId = selectedAceId;

  axios
    .post('/sendRiderChoice', requestBody)
    .then((response) => {
      console.log('Done sending selected rider ID to backend');
      /* can put msg confirmation element mechanics here */;
    })
     .catch((error) => {
    console.log(error);
    });
  });
};


/*  ROUSE UNDEAD WORKs BUTTON for Maintenance packed into function */
const rouseUndead = () => {
  const rouseButtonEl = document.createElement('button');
  rouseButtonEl.setAttribute('type', 'button');
  rouseButtonEl.setAttribute('id', 'rouseButtonEl');
  rouseButtonEl.innerText = 'Gen Monster';
  document.body.appendChild(rouseButtonEl);

  rouseButtonEl.addEventListener('click', () =>{
    axios
      .get('/rouseUndead')
      .then((response) => {
        console.log('Turning Over 1 Card from MainDeck');
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

/* CREATE FIGHT INSTANCE (GEN GAMESTATE) */
const instanceGen = () => {
  const instanceGenButtonEl = document.createElement('button');
  instanceGenButtonEl.setAttribute('type', 'button');
  instanceGenButtonEl.setAttribute('id', 'instanceGenButtonEl');
  instanceGenButtonEl.innerText = 'Dive into Battle';
  document.body.appendChild(instanceGenButtonEl);

  instanceGenButtonEl.addEventListener('click', () =>{
    axios
      .post('/games')
      .then((response) => {
        console.log('Lining up Fighters and Artefacts in Fight Instance Arena');

        // set the global value to the new game.
        currentGame = response.data;
        console.log(currentGame);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};


createAceChoiceSection();
rouseUndead();
instanceGen();


/* NEED TO PULL UP THE CORRECT GAME/TURN ID!! */
/* GET RIDER & UNDEAD DATA FROM BACK-END */
const statBody = document.createElement('div');

/* Message Centre */
const MsgCentreEl = document.createElement('div');


const dispGameInfo = () => {
  const riderHpEl = document.createElement('div');
  document.body.appendChild(riderHpEl);
  const dispImageDataEl = document.createElement('button');
  dispImageDataEl.setAttribute('type', 'button');
  dispImageDataEl.setAttribute('id', 'dispImageDataEl');
  dispImageDataEl.innerText = 'Show/Refresh GameData Display';
  document.body.appendChild(dispImageDataEl);

  dispImageDataEl.addEventListener('click', () => {
    axios
    .post(`/games/${currentGame.id}`)
    .then((response) => {
      statBody.innerText = "";
      MsgCentreEl.innerText = "";
      const showStats = response.data;
      console.log('response =', response);
      console.log('response.data =', response.data);

        /* create & append HTML elements for stat display */

        const riderStatsDisp = document.createElement('div');
        riderStatsDisp.innerText = `\n <${showStats.riderName}> \n HP: ${showStats.riderHp} \n DEF: ${showStats.riderDef}% \n ATK: ${showStats.riderbAtk} `;
        statBody.appendChild(riderStatsDisp);
        document.body.appendChild(statBody);

        let rankDisp = showStats.undeadRank;
        if(showStats.undeadRank === 11) {
          rankDisp = 'JACK';
        } else if (showStats.undeadRank === 12){
          rankDisp = 'QUEEN';
        } else if (showStats.undeadRank === 13){
          rankDisp = 'KING';
        } 
        const undeadStatsDisp = document.createElement('div');
        undeadStatsDisp.innerText = `\n <${showStats.undeadName} Undead> \n Category ${rankDisp} \n HP: ${showStats.undeadHp} \n DEF: ${showStats.undeadDef}% \n ATK: ${showStats.undeadbAtk} `;
        statBody.appendChild(undeadStatsDisp);
        document.body.appendChild(statBody);
        document.body.appendChild(MsgCentreEl);

        /* Update Message Centre */
        MsgCentreEl.innerText = `${showStats.msg}`;
        
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  });
};

const riderAttack = () => {
  const riderActionEl = document.createElement('div');
  document.body.appendChild(riderActionEl);
  const riderAtkEl = document.createElement('button');
  riderAtkEl.setAttribute('type', 'button');
  riderAtkEl.setAttribute('id', 'riderAtkEl');
  riderAtkEl.innerText = 'Attack';
  document.body.appendChild(riderAtkEl);

  riderAtkEl.addEventListener('click', () => {
    axios
    .put(`/games/${currentGame.id}/deal`)
    .then((response) => {
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  });
};



dispGameInfo();
riderAttack();


