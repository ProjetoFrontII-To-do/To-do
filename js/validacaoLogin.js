const password = document.getElementById("password")
const $nome = document.getElementById("nome")
const confirm_password = document.getElementById("confirm_password");
const $btnCadastro = document.querySelector('#btn-cadastro')
const $form = document.querySelector('form')

if(localStorage.getItem('usuario')!= null){
  localStorage.removeItem('usuario')
  localStorage.removeItem('senha')
}

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Senhas diferentes!");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


document.formulario.addEventListener('submit',e=>{

  e.preventDefault();
  let usuario = document.formulario.nome.value;
  let senha = document.formulario.password.value;
  localStorage.setItem('usuario', usuario);
  localStorage.setItem('senha', senha)

  let url='../login.html'
  window.location.assign(url);

})
