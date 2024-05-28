const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sMarca = document.querySelector('#m-marca')
const sModelo = document.querySelector('#m-modelo')
const sPlaca = document.querySelector('#m-placa')
const sAno = document.querySelector('#m-ano')
const sRenavam = document.querySelector('#m-renavam')
const save = document.querySelector('#save')

let itens
let id

function abrir_modal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sMarca.value = itens[index].marca
    sModelo.value = itens[index].modelo
    sPlaca.value = itens[index].placa
    sAno.value = itens[index].ano
    sRenavam.valeu = itens[index].renavam
    id = index
  } else {
    sMarca.value = ''
    sModelo.value = ''
    sPlaca.value = ''
    sAno.value = ''
    sRenavam.value =''
  }
  
}

function editItem(index) {

  abrir_modal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.marca}</td>
    <td>${item.modelo}</td>
    <td>${item.placa}</td>
    <td>${item.ano}</td>
    <td>${item.renavam}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class="fa-solid fa-pen" style="color: #0d2fd9;"></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash" style="color: #ed0202;"></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

save.onclick = e => {
  
  if (sMarca.value == '' || sModelo.value == '' || sPlaca.value == '' || sAno.value=='' || sRenavam == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].marca = sMarca.value
    itens[id].modelo = sModelo.value
    itens[id].placa = sPlaca.value
    itens[id].ano = sAno.value
    itens[id].renavam = sRenavam.value
  } else {
    itens.push({'marca': sMarca.value, 'modelo': sModelo.value, 'placa': sPlaca.value, 'ano': sAno.value, 'renavam': sRenavam.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()