import { closeModal } from "./modal.js";
import { insertedValues, valuesCategory } from "./valuesData.js";


function handleModal() {
  const button = document.querySelector('.header .btn-register-finance');
  const modalController = document.querySelector('.modal__controller');

  button.addEventListener('click', () => {
    console.log("Clicado")
    modalController.showModal();
    closeModal();
  })
}

function createRecordCard(recordItem) {
  const record = document.createElement('li');
  const value = document.createElement('p');
  const boxIcons = document.createElement('div');
  const recordType = document.createElement('p');
  const trashButton = document.createElement('img');

  record.classList.add('render-values__item');
  value.classList.add('item__value', 'text1');
  boxIcons.classList.add('item__btn-container');
  recordType.classList.add('item__record-type', 'text2');
  trashButton.classList.add('item__trash-icon');

  value.innerText = 'R$ ' + recordItem.value;
  recordType.innerText = valuesCategory[recordItem.categoryID];
  trashButton.src = "../../src/assets/trash-icon.svg";
  trashButton.alt = 'ícone de lixeira'
  trashButton.dataset.trashId = recordItem.id;

  boxIcons.append(recordType, trashButton);
  record.append(value, boxIcons);
  return record;
}

function removeRecord(valuesList) {
  const allTrashIcons = document.querySelectorAll('.item__trash-icon');
  // valuesList.forEach((value, index))

  allTrashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener('click', (event) => {
      const trashId = event.target.dataset.trashId;
      console.log(trashId);

      function manualIndexOf(valuesList, trashId) {
        for (let i = 0; i < valuesList.length; i++) {
          if (valuesList[i].id == trashId) {
            return i;
          }
        }
        return -1;
      }
      const index = manualIndexOf(valuesList, trashId);
      console.log(index)
      // valuesList.splice(index, 1);
      console.log(valuesList);

      const typeToRemove = verifySelectedButton(insertedValues);
      // if(typeToRemove === 'all'){
      //   renderAllValues(valuesList);
      // }
    })
  })
}


export function renderAllValues(valuesList) {
  const renderValuesContainer = document.querySelector('.render-values__container');
  const total = document.querySelector('.render-values__sum > p');
  renderValuesContainer.innerHTML = '';

  valuesList.forEach(elem => {
    const record = createRecordCard(elem);
    renderValuesContainer.appendChild(record);
    
  });
  total.innerText = 'R$ ' + renderValuesSum(valuesList).toFixed(2);
}

export function renderValuesSum(valuesList) {
  const sumValuesList = valuesList.map(elem => parseFloat(elem.value));
  const total = sumValuesList.reduce((acumulator, currentValue) => acumulator += currentValue);
  return total;
}

export function renderInputValues(valuesList) {
  const renderValuesContainer = document.querySelector('.render-values__container');
  const total = document.querySelector('.render-values__sum > p');
  renderValuesContainer.innerHTML = '';
  total.innerHTML = '';

  let inputList = valuesList.filter(elem => elem.categoryID === 0);
  inputList.forEach(elem => {
    const inputRecord = createRecordCard(elem);
    renderValuesContainer.appendChild(inputRecord);
  })
  renderValuesSum(inputList);
  total.innerText = 'R$ ' + renderValuesSum(inputList).toFixed(2);
}

export function renderOutputValues(valuesList) {
  const renderValuesContainer = document.querySelector('.render-values__container');
  const total = document.querySelector('.render-values__sum > p');
  renderValuesContainer.innerHTML = '';
  total.innerHTML = '';

  let outputList = valuesList.filter(elem => elem.categoryID === 1);
  outputList.forEach(elem => {
    const outputRecord = createRecordCard(elem);
    renderValuesContainer.appendChild(outputRecord);
  })
  renderValuesSum(outputList);
  total.innerText = 'R$ ' + renderValuesSum(outputList).toFixed(2);
}

function verifySelectedButton(valuesList) {
  const buttonAllValues = document.querySelector('.btn-all');
  const buttonInputValues = document.querySelector('.btn-incomes');
  const buttonOutputValues = document.querySelector('.btn-expenses');

  if (buttonAllValues.classList.contains('selected')) {
    renderAllValues(valuesList);
    return 'all';
  } else if (buttonInputValues.classList.contains('selected')) {
    renderInputValues(valuesList);
    return 'input';
  } else if (buttonOutputValues.classList.contains('selected')) {
    renderOutputValues(valuesList);
    return 'output';
  }
}

function buttonTriggers(valuesList) {
  const buttonAllValues = document.querySelector('.btn-all');
  const buttonInputValues = document.querySelector('.btn-incomes');
  const buttonOutputValues = document.querySelector('.btn-expenses');

  buttonAllValues.addEventListener('click', () => {
    if (buttonInputValues.classList.contains('selected')) {
      buttonInputValues.classList.remove('selected');
    } else if (buttonOutputValues.classList.contains('selected')) {
      buttonOutputValues.classList.remove('selected');
    }
    buttonAllValues.classList.add('selected');
    renderAllValues(valuesList);
  })

  buttonInputValues.addEventListener('click', () => {
    if (buttonAllValues.classList.contains('selected')) {
      buttonAllValues.classList.remove('selected');
    } else if (buttonOutputValues.classList.contains('selected')) {
      buttonOutputValues.classList.remove('selected');
    }
    buttonInputValues.classList.add('selected');
    renderInputValues(valuesList);
  })

  buttonOutputValues.addEventListener('click', () => {
    if (buttonAllValues.classList.contains('selected')) {
      buttonAllValues.classList.remove('selected');
    } else if (buttonInputValues.classList.contains('selected')) {
      buttonInputValues.classList.remove('selected');
    }
    buttonOutputValues.classList.add('selected');
    renderOutputValues(valuesList);

  })
}

handleModal();
buttonTriggers(insertedValues);
verifySelectedButton(insertedValues);
removeRecord(insertedValues);


