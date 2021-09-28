const password = document.getElementById("password")
const $nome = document.getElementById("nomeLogin")
const $btnLogar = document.querySelector('#logar')


//Verifica se o nome de usuário e a senha digitadas são iguais ao nome e senha armazenados no localstorage (que a pessoa armazenou quando efetuou o cadastro).
$btnLogar.addEventListener('click',e=>{

  let usuario = $nome.value;
  let senha = password.value;
  e.preventDefault();
  if(localStorage.getItem('usuario')==usuario && localStorage.getItem('senha')==senha ){
    location.href='../../To-do/lista-tarefas.html'
  } else{
    document.querySelector('span').textContent = "Verifique o seu usuário e senha e tente novamente."
  }
})
