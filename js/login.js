const password = document.getElementById("password")
const $nome = document.getElementById("nomeLogin")
// const confirm_password = document.getElementById("confirm_password");
const $btnLogar = document.querySelector('#logar')

// function validatePassword(){
//   if(password.value != confirm_password.value) {
//     confirm_password.setCustomValidity("Senhas diferentes!");
//   } else {
//     confirm_password.setCustomValidity('');
//   }
// }
    

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;

$btnLogar.addEventListener('click',e=>{

  let usuario = $nome.value;
  let senha = password.value;
  e.preventDefault();
  if(localStorage.getItem('usuario')==usuario && localStorage.getItem('senha')==senha ){
    location.href='../lista-tarefas.html'
  } else{
    document.querySelector('span').textContent = "Verifique o seu usuário e senha e tente novamente."
    // alert("Verifique o seu usuário e senha e tente novamente.")
  }
})
