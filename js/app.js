const $ulTarefasPendentes = document.querySelector('.tarefas-pendentes');
const $ulTarefasConcluidas = document.querySelector('ul[class=titulo-concluida]');
const $inputNovaTarefa = document.querySelector('#input-nova-tarefa');
const $btnAddTarefa = document.querySelector('.btn-add-tarefa');
const $dataConclusao = document.querySelector('.data-conclusao');
const $modalFundo = document.querySelector('#modal');
const $btnDeletar = document.querySelector('#btn-deletar');
const $btnCancelar = document.querySelector('#btn-cancelar');
const $checkbox = document.querySelector('.checkbox');
const today = new Date().toLocaleDateString('pt-BR');
// const dataM = moment($dataConclusao.value)
// let dateFormat = moment($dataConclusao.value).format('DD/MM/YYYY')
// const dataMoment = moment(dataM, 'DD/MM/YYYY')

let data = new Date().toLocaleDateString('en').split('/');
let dataTratada;
if (data[0] < 10 && data[1] < 10) {
  dataTratada = `${data[2]}-0${data[0]}-0${data[1]}`;
} else if (data[0] < 10 && data[1] > 10) {
  dataTratada = `${data[2]}-0${data[0]}-${data[1]}`;
} else if (data[0] > 10 && data[1] < 10) {
  dataTratada = `${data[2]}-${data[0]}-0${data[1]}`;
} else {
  dataTratada = `${data[2]}-${data[0]}-${data[1]}`;
}

$dataConclusao.min = dataTratada;


let arrayIdLi=[]
const fecharModal=e=>{
    if(e.target.id === 'modal'){
        $modalFundo.style.cssText=`display: none`
    }
}
const btnDeletarTarefa=e=>{
    deletarTarefa(arrayIdLi[0])
    $modalFundo.style.cssText=`display: none`
}
const btnCancelarTarefa=e=>{
    $modalFundo.style.cssText=`display: none`
    $btnDeletar.removeEventListener('click', btnDeletarTarefa)
    $btnCancelar.removeEventListener('click', btnCancelarTarefa)
}

const abrirModal=id=>{  
    arrayIdLi=[]
    arrayIdLi.push(id)
    $modalFundo.addEventListener('click', fecharModal)
    $modalFundo.style.cssText=`display: block`
    $btnDeletar.addEventListener('click', btnDeletarTarefa)
    $btnCancelar.addEventListener('click', btnCancelarTarefa)
}

let countId = 0;
/**
 * Adiciona uma nova tarefa na "ul" de tarefas pendentes do HTML. No final, acrescenta mais 1 à variável "countId", para que o id de cada tarefa seja dinâmico.
 */

const addTarefa = () => {
  if ($inputNovaTarefa.value.length < 10) {
    document.querySelector(".nova-tarefa").style.cssText = `
    border: 2px solid red;
    `; // ! falta tirar o vermelho dps que add a task
    $btnAddTarefa.setAttribute("disabled");
  } else {
    $ulTarefasPendentes.insertAdjacentHTML(
      "afterbegin",
      `
    <li class="tarefa" id='li${countId}'>
        <input id='a${countId}' type='checkbox' class='checkbox'>
        <label onclick='marcarCheckbox(a${countId})' for='a${countId}' class="not-done label-tarefas-pendentes"></label>
        <div class="descripcion">
                <p class="nome">${$inputNovaTarefa.value}</p>
            <div>
                <p class="timestamp">Data da criação: ${today}</p>
                <p class="timestamp">Data final: ${$dataConclusao.value}</p>
                <button onclick='abrirModal(li${countId})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
            </div>
        </div>
    </li>
    `)
    countId++;
    // document.querySelector('.btn-deletar-tarefa').addEventListener('click', e=>{
    //     abrirModal(e.target.parentNode.parentNode.parentNode.parentNode.id)
    // })      
}
}

//Esses arrays armazenarão os objetos "tarefas" que vierem do endpoint "https://jsonplaceholder.typicode.com/todos/". Cada objeto conterá um "id" e um "title".
let listaTarefasPendentes=[];
let listaTarefasConcluidas=[];

// $btnAddTarefa.addEventListener('click', e=>{
//     addTarefa();
//     e.preventDefault();
// })

$btnAddTarefa.addEventListener("click", (e) => {
  addTarefa();
  e.preventDefault();
});

/**
 * Deleta a tarefa da aplicação.
 * @param {*} id
 */
const deletarTarefa=id=>{
   console.log(id.id)
    const el = document.querySelector(`#${id.id}`);
    el.parentNode.removeChild(el);
}

const marcarCheckbox=(id)=>{
    let el = document.querySelector(`#${id.id}`)
    if(!el.checked){
        console.log(el.parentNode)
        console.log(el.parentElement)
        $ulTarefasConcluidas.appendChild(el.parentNode)
    }
}

/**
 * Recupera e trata os dados da Fake API "jsonplaceholder".
 */
(async()=>{
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    let jsonData = await response.json()

    jsonData.forEach((el, i)=>{
        
        if(el.completed){
            listaTarefasConcluidas.push({
                id: el.id,
                title: el.title
            })
        } else {
            listaTarefasPendentes.push({
                id: el.id,
                title: el.title
            })
        }
    })

})()
