import { resolve } from 'path';
import db from './models/index.mjs';
import initGamesController from './controllers/games.mjs';
import initUsersController from './controllers/users.mjs'

export default function bindRoutes(app) {
  const GamesController = initGamesController(db);
  const UsersController = initUsersController(db);

  
  /* createUser/Login Page */
  app.get('/', (request, response) => {
    response.render('login');
  });
  app.post('/createAcct', UsersController.createUser);
  app.post('/userAuth', UsersController.authUser);

  /* Login failure page */
  app.get('/boot', (request, response) => {
    response.render('forbidden');
  });


  //DATA routes


  //PAGE routes
  app.get('/facePage', (request, response) => {

    /* cookie authentication here */
    console.dir(request.cookies);
    if (request.cookies.loggedIn === undefined) {
      response.render('forbidden');
    } else if (request.cookies.loggedIn === 'true') {
       response.sendFile(resolve('dist', 'main.html'));;
    }
   /*  response.sendFile(resolve('dist', 'main.html')); */
  });

  // route for user's Rider choice to head to backend
  app.post('/sendRiderChoice', GamesController.selectRider);


  // test route to load unDead
  app.get('/rouseUndead', GamesController.loadUndead);


  // main page
  app.get('/entrance', GamesController.index);


  // create a fightInstance
  app.post('/games', GamesController.create);

  // get RiderImageData from the GameState based on Game ID
  app.post('/games/:id', GamesController.refreshStatsDisp);
  
  // modify the gameState using Rider Actions
  app.put('/games/:id/deal', GamesController.riderAction);
}
