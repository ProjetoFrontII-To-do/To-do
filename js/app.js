/* <li class="tarefa">
<div class="not-done"></div>
<div class="descripcion">
  <p class="nome">Minha bela tarefa</p>
  <p class="timestamp">Criada: 19/04/20</p>
</div>
</li> */

// let DateFormat = moment().format('DD/MM/YYYY');

const $ulTarefasPendentes = document.querySelector('.tarefas-pendentes');
const $ulTarefasConcluidas = document.querySelector('ul[class=titulo-concluida]');
const $inputNovaTarefa = document.querySelector('#input-nova-tarefa');
const $btnAddTarefa = document.querySelector('.btn-add-tarefa');
const today = new Date().toLocaleDateString('pt-BR')
const $dataConclusao = document.querySelector('.data-conclusao')



// const dataMoment = moment(data, 'DD/MM/YYYY')
// const calendario = document.querySelector('.data-conclusao'); 
// const data = moment(calendario.value)
// let dateFormat = moment(calendario.value).format('DD/MM/YYYY')
// const dataMoment = moment(data, 'DD/MM/YYYY')
let data = new Date().toLocaleDateString('en').split('/');
let dataTratada;
if(data[0]<10 && data[1]<10){
   dataTratada=`${data[2]}-0${data[0]}-0${data[1]}`
}else if(data[0]<10 && data[1]>10){
    dataTratada=`${data[2]}-0${data[0]}-${data[1]}`
}else if(data[0]>10 && data[1]<10){
    dataTratada=`${data[2]}-${data[0]}-0${data[1]}`
}else{
    dataTratada=`${data[2]}-${data[0]}-${data[1]}`
}

$dataConclusao.min=dataTratada

let countId = 0;
/**
 * Adiciona uma nova tarefa na "ul" de tarefas pendentes do HTML. No final, acrescenta mais 1 à variável "countId", para que o id de cada tarefa seja dinâmico.
 */

const abrirModal=id=>{
    document.querySelector('#modal').style.cssText=
    `
        display: block;
    `
    document.querySelector('#btn-deletar').addEventListener('click', e=>{
        deletarTarefa(id)
        document.querySelector('#modal').style.cssText=
        `
            display: none;
        `
    })
    
}
const addTarefa = ()=>{
    $ulTarefasPendentes.insertAdjacentHTML('afterbegin',
    `
    <li class="tarefa" id='li${countId}'>
        <input id='${countId}' type='checkbox' class='checkbox'>
        <label for='${countId}' class="not-done"></label>
        <div class="descripcion">
                <p class="nome">${$inputNovaTarefa.value}</p>
            <div>
                <p class="timestamp">Criada: ${today}</p>
                <p class="timestamp">Conclusão: ${$dataConclusao.value}</p>
                <button onclick='abrirModal(li${countId})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
            </div>
        </div>
    </li>
    `)
    // <button onclick='deletarTarefa(li${countId})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
    countId++;
}

//Esses arrays armazenarão os objetos "tarefas" que vierem do endpoint "https://jsonplaceholder.typicode.com/todos/". Cada objeto conterá um "id" e um "title".
let listaTarefasPendentes=[];
let listaTarefasConcluidas=[];


$btnAddTarefa.addEventListener('click', e=>{
    addTarefa();
    e.preventDefault();
})


/**
 * Deleta a tarefa da aplicação.
 * @param {*} id 
 */
const deletarTarefa=id=>{
    const el = document.querySelector(`#${id.id}`);
    el.parentNode.removeChild(el);
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
