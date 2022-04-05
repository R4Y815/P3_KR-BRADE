export default function initUsersController(db) {
   const authUser = async (request, response) => {
    try {
      console.log('request.body =', request.body);

      const userDetails = await db.User.findOne({
        where: {
          email: request.body.email,
        },
      });
      console.log('userDetails =', userDetails);
      if (userDetails === null) {
        console.log('Backend Auth = FAILURE');
        response.send('boot');
      } else if (userDetails.password === request.body.password) {
        console.log('Backend Auth = SUCCESS');
        response.cookie('loggedIn', true);
        response.cookie('userId', userDetails.id);
        response.send('entrance');
      } else {
        console.log('Backend Auth = FAILURE');
        response.send('boot');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (request, response) => {
    try {
      console.log('request.body =', request.body);

      const user = {
        email: request.body.email,
        password: request.body.password,
      };
      console.log('user =', user);
      await db.User.create(user);
      response.send('BackEnd: Added new user to database!');
    } catch (error) {
      console.log(error);
      response.send('error with creating new user');
    }
  };
  return {
    createUser,
    authUser,
  };
}
