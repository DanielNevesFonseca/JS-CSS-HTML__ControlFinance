import { renderAllValues, renderInputValues, renderOutputValues } from "./render.js";

export function closeModal() {
  const closeButton = document.querySelector('.btn-close-modal');
  const cancelButton = document.querySelector('.btn-cancel');
  const modalController = document.querySelector('.modal__controller');
  const input = document.querySelector('.input-record-value');
  
  closeButton.addEventListener('click', () => {
    modalController.close();
    input.value = ''

  })

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    modalController.close();
    input.value = ''

  })
}

export function createNewRecord(valuesList) {
  const buttonInsertValue = document.querySelector('.btn-insert-value');
  const recordInput = document.querySelector('.input-record-value');
  const modalController = document.querySelector('.modal__controller')

  
  buttonInsertValue.addEventListener('click', (event) => {
    event.preventDefault();
    const recordType = document.querySelector('input[type="radio"]:checked');
    const recordTypeId = parseInt(recordType.value)
    const recordInputValue = parseFloat(recordInput.value).toFixed(2);
    
    if (recordInputValue == 'NaN'){
      alert('Digite um valor do tipo numérico!');
      modalController.close();
    } else {
      if (valuesList.length <= 0) {
        let newRecord = {
          id: 1,
          value: recordInputValue,
          categoryID: recordTypeId
        }
        valuesList.push(newRecord);
      } else {
        let newRecord = {
          id: valuesList[valuesList.length - 1].id + 1,
          value: recordInputValue,
          categoryID: recordTypeId
        }
        valuesList.push(newRecord);
      }
    }
    const buttonAllValues = document.querySelector('.btn-all');
    const buttonInputValues = document.querySelector('.btn-incomes');
    const buttonOutputValues = document.querySelector('.btn-expenses');

    if (buttonAllValues.classList.contains('selected')) {
      renderAllValues(valuesList);
    } else if (buttonInputValues.classList.contains('selected')) {
      renderInputValues(valuesList);
    } else if (buttonOutputValues.classList.contains('selected')) {
      renderOutputValues(valuesList);
    } else {
      alert("Selecione alguma aba para visualizar os novos valores adicionados instantâneamente!")
    }

    modalController.close();
  })
}
