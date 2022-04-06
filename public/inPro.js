/* script0.js /inPro.js called by login.ejs */


/* Create Input Row Container */
const inputContainer = document.createElement('div');
document.body.appendChild(inputContainer);

/* Crete Button Row Container */
const buttonContainer = document.createElement('div');
document.body.appendChild(buttonContainer);

/* Create Email Input field */
const inputEmail = document.createElement('input');
inputEmail.type = 'text';
inputEmail.placeholder = 'Enter Email Here';
inputContainer.appendChild(inputEmail);

/* Create Password Input field */
const inputPassword = document.createElement('input');
inputPassword.type = 'password';
inputPassword.placeholder = 'key in password here';
inputContainer.appendChild(inputPassword);

/* Create Password Button */
const createUserBtn = document.createElement('button');
createUserBtn.type = 'button';
createUserBtn.innerText = 'Create New User Account';
buttonContainer.appendChild(createUserBtn);
createUserBtn.addEventListener('click', () => {
  const requestBody = {};
  requestBody.email = inputEmail.value;
  requestBody.password = inputPassword.value;
  axios
    .post('/createAcct', requestBody)
    .then((response) => {
      const loginMsg = document.createElement('div');
      loginMsg.innerText = response.data;
      document.body.appendChild(loginMsg);
      console.log('New User added to data bases successfully');
      document.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
});

/* LOGIN BUTTON */
const loginButton = document.createElement('button');
loginButton.innerText = 'LOGIN';
buttonContainer.appendChild(loginButton);
loginButton.addEventListener('click', () => {
  const requestBody = {};
  requestBody.email = inputEmail.value;
  requestBody.password = inputPassword.value;
  console.log('requestBody', requestBody);
  axios
    .post('/userAuth', requestBody)
    .then((response) => {
      console.log('returned response.data =', response.data);
      window.location.replace(`${response.data}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

