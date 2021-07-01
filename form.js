const createForm = () => {
  const myForm = document.createElement('form');
  myForm.setAttribute('id', 'form');
  myForm.setAttribute('class', 'forme-user-name');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name-input');
  nameInput.setAttribute('placeholder', 'Your name here!');

  myForm.appendChild(nameInput);

  const button = document.createElement('button');
  button.setAttribute('id', 'submit-name');
  button.setAttribute('class', 'btn btn-primary');
  button.innerHTML = 'Save';

  myForm.appendChild(button);

  return myForm;
};

module.exports = createForm;