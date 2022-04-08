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
  const number = i + 1;
  if( number === 1 ) {
    radioInputLabel.innerHTML = "&nbsp; ♠ &nbsp;&nbsp;";
  } else if (number === 2) {
    radioInputLabel.innerHTML = "&nbsp; ♥ &nbsp;&nbsp;";
  } else if (number === 3) {
    radioInputLabel.innerHTML = "&nbsp; ♦ &nbsp;&nbsp;";
  } else if (number === 4) {
    radioInputLabel.innerHTML = "&nbsp; ♣ &nbsp;&nbsp;";
  }
  
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
  /* Release Monster from Card Deck / Gen Monster */
  const rouseButtonEl = document.createElement('button');
  rouseButtonEl.setAttribute('type', 'button');
  rouseButtonEl.setAttribute('id', 'rouseButtonEl');
  rouseButtonEl.innerText = 'Get to Undead location';
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
  instanceGenButtonEl.innerText = 'Engage Fighting Position';
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


/* GET RIDER & UNDEAD DATA FROM BACK-END */
/* Message Centre */
const MsgCentreEl = document.createElement('div');
const MsgBar = document.getElementById('msgCtr')
MsgBar.appendChild(MsgCentreEl);

/* Create the Pic Holder Elements */
const undeadPicHolder = document.getElementById('undeadJpgHolder');
const riderPicHolder = document.getElementById('riderJpgHolder');


/* Reposition Refresh Button */
const riderButtonCont = document.getElementById('riderButtonGrp');

/* REFRESH and Show Data, images */
const dispGameInfo = () => {
  const riderHpEl = document.createElement('div');
  document.body.appendChild(riderHpEl);
  const dispImageDataEl = document.createElement('button');
  dispImageDataEl.setAttribute('type', 'button');
  dispImageDataEl.setAttribute('id', 'dispImageDataEl');
  dispImageDataEl.innerText = 'Refresh';
  
  riderButtonCont.appendChild(dispImageDataEl);

  dispImageDataEl.addEventListener('click', () => {
    axios
    .post(`/games/${currentGame.id}`)
    .then((response) => {
      const riderInfo = document.getElementById('riderInfo');
      const undeadInfo = document.getElementById('undeadInfo');  
      riderInfo.innerText = "";
      undeadInfo.innerText = "";
      undeadPicHolder.innerText = "";
      riderPicHolder.innerText = "";
      MsgCentreEl.innerText = "";
      const showStats = response.data;
      console.log('response =', response);
      console.log('response.data =', response.data);

        /* create & append HTML elements for Rider Info Display */
        const riderStatsDisp = document.createElement('div');
        riderStatsDisp.innerText = `\n HP: ${showStats.riderHp} \n DEF: ${showStats.riderDef}% \n ATK: ${showStats.riderbAtk} `;
        
        const riderLabel = document.getElementById('riderNameBar');
        riderLabel.innerText = `${showStats.riderName}`;
        riderInfo.appendChild(riderStatsDisp)

        /* RIDER Portrait holder element */
        const riderJpg = new Image();
        riderJpg.src = `./riders/${showStats.riderName}.jpg`;
        riderJpg.setAttribute('id', 'riderPhoto');
        riderPicHolder.appendChild(riderJpg); 


        /* create & append HTML elements for Undead Info Display */
        let rankDisp = showStats.undeadRank;
        if(showStats.undeadRank === 11) {
          rankDisp = 'JACK';
        } else if (showStats.undeadRank === 12){
          rankDisp = 'QUEEN';
        } else if (showStats.undeadRank === 13){
          rankDisp = 'KING';
        } 
        const undeadStatsDisp = document.createElement('div');
        undeadStatsDisp.innerText = `\n HP: ${showStats.undeadHp} \n DEF: ${showStats.undeadDef}% \n ATK: ${showStats.undeadbAtk}  \n\n\n Category ${rankDisp} `;
        undeadInfo.appendChild(undeadStatsDisp);

        const undeadLabel = document.getElementById('undeadNameBar');
        undeadLabel.innerText = `${showStats.undeadName} Undead`;

        /* UNDEAD Portrait holder element */
        const undeadJpg = new Image();
        undeadJpg.src = `./undeads/${showStats.undeadName}.jpg`;
        undeadJpg.setAttribute('id', 'undeadPhoto');
        undeadPicHolder.appendChild(undeadJpg); 


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
/*   const riderButtonCont = document.getElementById('riderButtonGrp'); */
  riderButtonCont.appendChild(riderAtkEl);

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


