import { closeModal, createNewRecord } from "./modal.js";
import { insertedValues, valuesCategory } from "./valuesData.js";
import { renderAllValues, renderInputValues, renderOutputValues } from "./render.js";

export function handleModal() {
  const button = document.querySelector('.header .btn-register-finance');
  const modalController = document.querySelector('.modal__controller');

  button.addEventListener('click', () => {
    modalController.showModal();
    closeModal();
  })
}

export function createRecordCard(recordItem) {
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
  trashButton.src = "./src/assets/trash-icon.svg";
  trashButton.alt = 'ícone de lixeira'
  trashButton.dataset.trashId = recordItem.id;

  trashButton.addEventListener('click', (event) => {
    const trashId = event.target.dataset.trashId;
    console.log('trashId', trashId);

    function manualIndexOf(insertedValues, trashId) {
      for (let i = 0; i < insertedValues.length; i++) {
        if (insertedValues[i].id == trashId) {
          return i;
        }
      }
      return -1;
    }
    const index = manualIndexOf(insertedValues, trashId);
    console.log("index", index);
    insertedValues.splice(index, 1);
    console.log("insertedValues", insertedValues);
    verifySelectedButton(insertedValues)
  })

  boxIcons.append(recordType, trashButton);
  record.append(value, boxIcons);
  return record;
}

function verifySelectedButton(valuesList) {
  const buttonAllValues = document.querySelector('.btn-all');
  const buttonInputValues = document.querySelector('.btn-incomes');
  const buttonOutputValues = document.querySelector('.btn-expenses');

  if (buttonAllValues.classList.contains('selected')) {
    renderAllValues(valuesList);
  } else if (buttonInputValues.classList.contains('selected')) {
    renderInputValues(valuesList);
  } else if (buttonOutputValues.classList.contains('selected')) {
    renderOutputValues(valuesList);
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
createNewRecord(insertedValues);


