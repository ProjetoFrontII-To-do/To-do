/* <li class="tarefa">
<div class="not-done"></div>
<div class="descripcion">
  <p class="nome">Minha bela tarefa</p>
  <p class="timestamp">Criada: 19/04/20</p>
</div>
</li> */
const $ulTarefasPendentes = document.querySelector('.tarefas-pendentes');
const $ulTarefasConcluidas = document.querySelector('ul[class=titulo-concluida]');
const $inputNovaTarefa = document.querySelector('#input-nova-tarefa');
const $btnAddTarefa = document.querySelector('.btn-add-tarefa');


let countId = 0;
/**
 * Adiciona uma nova tarefa na "ul" de tarefas pendentes do HTML. No final, acrescenta mais 1 à variável "countId", para que o id de cada tarefa seja dinâmico.
 */
const addTarefa = ()=>{
    $ulTarefasPendentes.insertAdjacentHTML('afterbegin', 
    `
    <li class="tarefa" id='li${countId}'>
        <input id='${countId}' type='checkbox' class='checkbox'>
        <label for='${countId}' class="not-done"></label>
        <div class="descripcion">

                <p class="nome">${$inputNovaTarefa.value}</p>
            <div>
                <p class="timestamp">Criada: ${new Date().toLocaleDateString('pt-BR')}</p>

                <button onclick='deletarTarefa(li${countId})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
            </div>
        </div>
    </li>
    `)
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
