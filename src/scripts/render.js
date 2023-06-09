import { createRecordCard } from "./index.js";
import { insertedValues } from "./valuesData.js";

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
  if(valuesList.length != 0){
    const sumValuesList = valuesList.map(elem => parseFloat(elem.value));
    const total = sumValuesList.reduce((acumulator, currentValue) => acumulator += currentValue);
    return total;
  }
  return 0.00;
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