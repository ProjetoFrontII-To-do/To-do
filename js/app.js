const $body = document.querySelector("body");
const $toggle = document.querySelector(".toggle");
const $ulTarefasPendentes = document.querySelector(".tarefas-pendentes");
const $ulTarefasConcluidas = document.querySelector(
  "ul[class=titulo-concluida]"
);
const $inputNovaTarefa = document.querySelector("#input-nova-tarefa");
const $formNovaTarefa = document.querySelector(".nova-tarefa");
const $formNovaTarefaLabel = document.querySelector(
  ".mensagem-erro-caracteres"
);
const $dataConclusaoMsg = document.querySelector(".mensagem-erro");
const $btnAddTarefa = document.querySelector(".btn-add-tarefa");
const $dataConclusao = document.querySelector(".data-conclusao");
const $modalFundo = document.querySelector("#modal");
const $btnDeletar = document.querySelector("#btn-deletar");
const $btnCancelar = document.querySelector("#btn-cancelar");
const $checkbox = document.querySelector(".checkbox");
const today = new Date().toLocaleDateString("pt-BR");
const $cardNovaTarefa = document.querySelector(".nova-tarefa");
const buttonAPI = document.querySelector(".api");
// const dataM = moment($dataConclusao.value)
// let dateFormat = moment($dataConclusao.value).format('DD/MM/YYYY')
// const dataMoment = moment(dataM, 'DD/MM/YYYY')

let data = new Date().toLocaleDateString("en").split("/");
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

let arrayIdLi = [];
const fecharModal = (e) => {
  if (e.target.id === "modal") {
    $modalFundo.style.cssText = `display: none`;
  }
};
const btnDeletarTarefa = (e) => {
  deletarTarefa(arrayIdLi[0]);
  $modalFundo.style.cssText = `display: none`;
};
const btnCancelarTarefa = (e) => {
  $modalFundo.style.cssText = `display: none`;
  $btnDeletar.removeEventListener("click", btnDeletarTarefa);
  $btnCancelar.removeEventListener("click", btnCancelarTarefa);
};

const abrirModal = (id) => {
  arrayIdLi = [];
  arrayIdLi.push(id);
  $modalFundo.addEventListener("click", fecharModal);
  $modalFundo.style.cssText = `display: block`;
  $btnDeletar.addEventListener("click", btnDeletarTarefa);
  $btnCancelar.addEventListener("click", btnCancelarTarefa);
};

let countId = 0;
/**
 * * Adiciona uma nova tarefa na "ul" de tarefas pendentes do HTML. No final, acrescenta mais 1 à variável "countId", para que o id de cada tarefa seja dinâmico.
 */
const addTarefa = async () => {
  if ($inputNovaTarefa.value.length < 10) {
    $formNovaTarefaLabel.textContent = "*Mínimo 10 caracteres";
    $formNovaTarefa.style.cssText = `
    border: 1px solid red;
    `;
    $btnAddTarefa.setAttribute("disabled");
  } else if ($dataConclusao.value == "") {
    $formNovaTarefaLabel.textContent = "";
    $dataConclusaoMsg.textContent = "*Data obrigatória";
    $dataConclusao.style.cssText = `
        border: 1px solid red;
        `;
  } else {
    let dataConclusaoArray = $dataConclusao.value.split("-");
    let dataConclusaoTratada =
      dataConclusaoArray[2] +
      "/" +
      dataConclusaoArray[1] +
      "/" +
      dataConclusaoArray[0];
    $formNovaTarefa.style.cssText = `
    border: none;
    `;
    $formNovaTarefaLabel.textContent = "";
    $dataConclusaoMsg.textContent = "";
    $dataConclusao.style.cssText = `
    border: none;
    `;
    $ulTarefasPendentes.insertAdjacentHTML(
      "afterbegin",
      `
            <li class="tarefa" id='li${countId}'>
                <input id='a${countId}' type='checkbox' class='checkbox'>
                <label onclick='marcarCheckbox(a${countId})' for='a${countId}' class="not-done label-tarefas-pendentes"></label>
                <div class="descripcion">
                        <p class="nome">${$inputNovaTarefa.value}</p>
                    <div class='datas-e-btn'>
                        <p class="timestamp">Criada em: ${today}</p>
                        <p class="timestamp">Data final: ${dataConclusaoTratada}</p>
                        <button onclick='abrirModal(li${countId})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
                    </div>
                </div>
            </li>
        `
    );
    // TODO:SUGESTÃO

    // const button = document.querySelector('.btn-deletar-tarefa');
    // const div = document.querySelector('.datas-e-btn');
    // const paragrafo = document.createElement('p');
    // paragrafo.classList.add('timestamp')

    // $dataConclusao.value == ""?(paragrafo.textContent='Data final: indefinida', div.insertBefore(paragrafo, button)) : (paragrafo.textContent=`Data final: ${$dataConclusao.value}`, div.insertBefore(paragrafo, button))
  }
  countId++;
};

// * Esses arrays armazenarão os objetos "tarefas" que vierem do endpoint "https://jsonplaceholder.typicode.com/todos/". Cada objeto conterá um "id" e um "title".
let listaTarefasPendentes = [];
let listaTarefasConcluidas = [];

$btnAddTarefa.addEventListener("click", (e) => {
  addTarefa();
  e.preventDefault();
});

/**
 * * Deleta a tarefa da aplicação.
 * @param {*} id
 */
const deletarTarefa = (id) => {
  console.log(id.id);
  const el = document.querySelector(`#${id.id}`);
  el.parentNode.removeChild(el);
};

const marcarCheckbox = (id) => {
  let el = document.querySelector(`#${id.id}`);
  if (!el.checked) {
    el.parentElement.children[2].children[1].children[1].textContent =
      "Tarefa Finalizada";
    el.parentElement.children[2].children[1].children[0].remove();
    // console.log(el.parentElement.children[1].removeAttribute('onclick'))
    $ulTarefasConcluidas.prepend(el.parentElement);
  }
  // else {

  //     $ulTarefasPendentes.prepend((el.parentElement))
  // }
};

/**
 * * Recupera e trata os dados da Fake API "jsonplaceholder".
 */
async function api() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  let jsonData = await response.json();

  jsonData.forEach((el, i) => {
    if (el.completed) {
      listaTarefasConcluidas.push({
        id: el.id,
        title: el.title,
      });
    } else {
      listaTarefasPendentes.push({
        id: el.id,
        title: el.title,
      });
    }
  });

  // * Adiciona as tarefas da API concluídas

  listaTarefasConcluidas.forEach((obj) => {
    console.log(obj);
    $ulTarefasConcluidas.insertAdjacentHTML(
      "afterbegin",
      `
            <li class="tarefa" id='li2${obj.id}'>
                <input id='b${obj.id}'  class='checkbox'>
                <label for='b${obj.id}' class="not-done label-tarefas-pendentes"></label>
                <div class="descripcion">
                        <p class="nome">${obj.title}</p>
                    <div>
                        <p class="timestamp">Tarefa Finalizada</p>
                        <button onclick='abrirModal(li2${obj.id})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
                    </div>
                    
                </div>
            </li>
            `
    );
  });

  // ! Nader, tirei o type="checkbox" do input da tarefa concluída pq tava checkando de novo e dando um bugzinho, mas ainda ta dando depois que a tarefa sai das pendentes e vai pra concluída

  // * Adiciona as tarefas da API pendentes

  listaTarefasPendentes.forEach((obj) => {
    $ulTarefasPendentes.insertAdjacentHTML(
      "afterbegin",
      `
            <li class="tarefa" id='li3${obj.id}'>
                <input id='c${obj.id}' type='checkbox' class='checkbox'>
                <label onclick='marcarCheckbox(c${obj.id})' for='c${obj.id}' class="not-done label-tarefas-pendentes"></label>
                <div class="descripcion">
                        <p class="nome">${obj.title}</p>
                    <div>
                        <p class="timestamp">Criada em: ${today}</p>
                        <p class="timestamp">Data final: indefinida</p>
                        <button onclick='abrirModal(li3${obj.id})' class='btn-deletar-tarefa'><img src='../assets/highlight_off_black_24dp.svg' alt=''></button>
                    </div>

                </div>
            </li>
            `
      // <textarea id='textarea' name="" id="" cols="30" rows="10"></textarea>
      // <button id='btn-deletar2'>Deletar</button>
    );
  });
}

// * API

buttonAPI.addEventListener("click", function () {
  api();
  buttonAPI.style.background = "green";
  buttonAPI.style.color = "white";
});

// * Dark mode

$toggle.addEventListener("click", function () {
  $body.classList.toggle("dark");
});
