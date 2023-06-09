import { renderAllValues, renderInputValues, renderOutputValues } from "./index.js";
import { insertedValues } from "./valuesData.js";

export function closeModal() {
  const closeButton = document.querySelector('.btn-close-modal');
  const cancelButton = document.querySelector('.btn-cancel');
  const modalController = document.querySelector('.modal__controller');
  closeButton.addEventListener('click', () => {
    modalController.close();
  })

  cancelButton.addEventListener('click', (event) => {
    modalController.close();
  })
}

export function createNewRecord(valuesList) {
  const buttonInsertValue = document.querySelector('.btn-insert-value');
  const recordValue = document.querySelector('.input-record-value');
  const modalController = document.querySelector('.modal__controller')

  buttonInsertValue.addEventListener('click', (event) => {
    event.preventDefault();
    const recordType = document.querySelector('input[type="radio"]:checked');

    let newRecord = {
      id: valuesList[valuesList.length - 1].id + 1,
      value: parseFloat(recordValue.value).toFixed(2),
      categoryID: Number(recordType.value)
    }

    valuesList.push(newRecord);

    const buttonAllValues = document.querySelector('.btn-all');
    const buttonInputValues = document.querySelector('.btn-incomes');
    const buttonOutputValues = document.querySelector('.btn-expenses');

    if(buttonAllValues.classList.contains('selected')){
      renderAllValues(valuesList);
    } else if (buttonInputValues.classList.contains('selected')){
      renderInputValues(valuesList);
    }  else if (buttonOutputValues.classList.contains('selected')){
      renderOutputValues(valuesList);
    } else {
      alert("Selecione alguma aba para visualizar os novos valores adicionados instantâneamente!")
    }

    // fechar modal ao renderizar
    modalController.close();
    // console.log(valuesList);
  })
}
createNewRecord(insertedValues)