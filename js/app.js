/* <li class="tarefa">
<div class="not-done"></div>
<div class="descripcion">
  <p class="nome">Minha bela tarefa</p>
  <p class="timestamp">Criada: 19/04/20</p>
</div>
</li> */
const ulTarefasPendentes = document.querySelector('.tarefas-pendentes');
const ulTarefasConcluidas = document.querySelector('ul[class=titulo-concluida]');
console.log(ulTarefasConcluidas)

let listaTarefasPendentes=[];
let listaTarefasConcluidas=[];


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

