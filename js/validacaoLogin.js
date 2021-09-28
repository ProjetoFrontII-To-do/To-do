const password = document.getElementById("password")
const $nome = document.getElementById("nome")
const confirm_password = document.getElementById("confirm_password");
const $btnCadastro = document.querySelector('#btn-cadastro')

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

$btnCadastro.addEventListener('click',e=>{

  let usuario = $nome.value;
  let senha = password.value;
      
  localStorage.setItem('usuario', usuario);
  localStorage.setItem('senha', senha);
  location.href='../login.html'
    e.preventDefault();
})
