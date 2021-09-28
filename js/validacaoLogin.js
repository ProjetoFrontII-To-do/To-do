const password = document.getElementById("password")
const $nome = document.getElementById("nome")
const confirm_password = document.getElementById("confirm_password");
const $btnCadastro = document.querySelector('#btn-cadastro')
const $form = document.querySelector('form')

//Limpa o localstorage toda vez que o usuário abrir a tela de cadastrar-se.
if(localStorage.getItem('usuario')!= null){
  localStorage.removeItem('usuario')
  localStorage.removeItem('senha')
}

/**
 * Faz a validação das senhas, verificando se as duas senhas digitadas são iguais.
 */
function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Senhas diferentes!");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


//Quando o formulário é submetido, os campos de usuário e senha são armazenados no localstorage (apenas para fins didáticos), para que possamos acessar tais dados na tela de login e na tela de tarefas.
document.formulario.addEventListener('submit',e=>{

  e.preventDefault();
  let usuario = document.formulario.nome.value;
  let senha = document.formulario.password.value;
  localStorage.setItem('usuario', usuario);
  localStorage.setItem('senha', senha)

  let url='../login.html'
  window.location.assign(url);

})
