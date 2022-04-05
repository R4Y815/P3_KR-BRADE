import db from './models/index.mjs';

import initGamesController from './controllers/games.mjs';
import initUsersController from './controllers/users.mjs'

export default function bindRoutes(app) {
  const GamesController = initGamesController(db);
  const UsersController = initUsersController(db);
  /* createUser/Login Page */
/*   app.get('/login', (request, response) => {
    response.render('login');
  });
  app.post('/createAcct', UsersController.createUser);
  app.post('/userAuth', UsersController.authUser); */

  /* Login failure page */
/*   app.get('/boot', (request, response) => {
    response.render('forbidden');
  }); */


/* TO GET THE MAIN GAME PAGE YOU NEED */
 /*  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
} */


  // main page
  app.get('/entrance', GamesController.index);


  // create a new game
  app.post('/games', GamesController.create);

  // update a game with new cards
  app.put('/games/:id/deal', GamesController.deal);
}
