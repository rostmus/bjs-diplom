
class RatesBoard {
  constructor() {//создает объект
    this.tableBody = document.querySelector('table.table.rates tbody');//объект тела таблицы данных
  }

  fillTable(data) { //принимает объект и заполняет таблицу данными
    Object.keys(data).forEach((key) => {
      const element = data[key];
      this.tableBody.innerHTML += `
      <tr>
        <td>${key}</td>
        <td data-eur-ntc='${element}'>${element}</td>
      </tr>`;
    });
  }

  clearTable() {// очищает таблицу
    this.tableBody.innerHTML = '';
  }
}
