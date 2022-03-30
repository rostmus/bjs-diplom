class MoneyManager {
  constructor() {//создает объект
    this.addMoneyForm = document.getElementById('addMoney');//объект формы добавления денег
    this.conversionMoneyForm = document.getElementById('conversionMoney');//объект формы конвертирования денег
    this.sendMoneyForm = document.getElementById('sendMoney');//объект формы перевода денег

    this.addMoneyForm.querySelector('.button').addEventListener('click', this.addMoneyAction.bind(this));
    this.conversionMoneyForm.querySelector('.button').addEventListener('click', this.conversionMoneyAction.bind(this));
    this.sendMoneyForm.querySelector('.button').addEventListener('click', this.sendMoneyAction.bind(this));

    this.errorMessageBlock = document.getElementById('moneyMessageBox');//объект окна вывода сообщения
    this.errorMessageBlock.style.display = 'none';

    this.addMoneyCallback = (f) => f;//действие, которое будет выполняться при добавлении денег
    this.conversionMoneyCallback = (f) => f;//действие, которое будет выполняться при конвертировании денег
    this.sendMoneyCallback = (f) => f;//действие, которое будет выполняться при переводе денег
  }

  addMoneyAction() {//обработчик события отправки формы добавления денег
    const amount = this.addMoneyForm.querySelector('[placeholder="Сумма"]').value;
    const currency = this.addMoneyForm.getElementsByTagName('select')[0].value;
    this.addMoneyCallback({ currency, amount });
    this.addMoneyForm.reset();
    const select = this.addMoneyForm.querySelector('.text');
    select.innerText = 'Валюта';
    select.classList.add('default');
  }

  conversionMoneyAction() {//обработчик события отправки формы конвертации денег
    const fromAmount = this.conversionMoneyForm.querySelector('[placeholder="Сумма"]').value;
    const fromCurrency = this.conversionMoneyForm.getElementsByTagName('select')[0].value;
    const targetCurrency = this.conversionMoneyForm.getElementsByTagName('select')[1].value;
    this.conversionMoneyCallback({ fromCurrency, targetCurrency, fromAmount });
    this.conversionMoneyForm.reset();
    const selects = this.conversionMoneyForm.querySelectorAll('.text');
    selects[0].innerText = 'Из';
    selects[0].classList.add('default');
    selects[1].innerText = 'В';
    selects[1].classList.add('default');
  }

  sendMoneyAction() {//обработчик события отправки формы перевода денег
    const amount = this.sendMoneyForm.querySelector('[placeholder="Сумма"]').value;
    const to = +this.sendMoneyForm.getElementsByTagName('select')[0].value;
    const currency = this.sendMoneyForm.getElementsByTagName('select')[1].value;
    this.sendMoneyCallback({ to, amount, currency });

    this.sendMoneyForm.reset();
    const selects = this.sendMoneyForm.querySelectorAll('.text');
    selects[0].innerText = 'Выберите пользователя';
    selects[0].classList.add('default');
    selects[1].innerText = 'Валюта';
    selects[1].classList.add('default');
  }

  setMessage(isSuccess, message) {//метод отображает сообщение (ошибку или успешность) в окне с информацией
    if (isSuccess) {
      this.errorMessageBlock.className = 'ui message fluid success';
    } else {
      this.errorMessageBlock.className = 'ui message fluid error';
    }

    this.errorMessageBlock.innerText = message;
    this.errorMessageBlock.style.display = 'block';
    setTimeout(() => { this.errorMessageBlock.style.display = 'none'; }, 5000);
  }

  // обновляет выпадающий список пользователей
  updateUsersList(data) {//обновляет выпадающий список пользователей
    const select = this.sendMoneyForm.querySelector('.ui.dropdown select');
    select.innerHTML = '<option value="">Выберите пользователя</option>';
    Object.keys(data).forEach((key) => {
      const element = data[key];
      select.innerHTML += `<option value="${+key}">${element}</option>`;
    });
  }
}
