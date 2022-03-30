class UserForm {
  constructor() {
    this.loginForm = document.getElementById('login');//объект формы авторизации
    this.registerForm = document.getElementById('register');//объект формы регистрации
    this.loginForm.querySelector('.button').addEventListener('click', this.loginFormAction.bind(this));
    this.registerForm.querySelector('.button').addEventListener('click', this.registerFormAction.bind(this));

    this.loginErrorMessageBox = this.loginForm.querySelector('.ui.message');//объект окна вывода сообщений на странице авторизации
    this.loginErrorMessageBox.style.display = 'none';
    this.registerErrorMessageBox = this.registerForm.querySelector('.ui.message');//объект окна вывода сообщений на странице регистрации
    this.registerErrorMessageBox.style.display = 'none';

    this.loginFormCallback = (f) => f;//функция, которая будет выполняться при попытке авторизации
    this.registerFormCallback = (f) => f;//функция, которая будет выполняться при попытке регистрации
  }

  setLoginErrorMessage(message) {//выводит сообщение с ошибкой при авторизации
    this.loginErrorMessageBox.innerText = message;
    this.loginErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.loginErrorMessageBox.style.display = 'none'; }, 5000);
  }

  setRegisterErrorMessage(message) {//выводит сообщение с ошибкой при регистрации
    this.registerErrorMessageBox.innerText = message;
    this.registerErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.registerErrorMessageBox.style.display = 'none'; }, 5000);
  }

  loginFormAction(event) {//обработчик события сабмита формы авторизации
    event.preventDefault();
    this.loginFormCallback(this.getData(this.loginForm));
    this.loginForm.reset();
  }

  registerFormAction(event) {//обработчик события сабмита формы регистрации
    event.preventDefault();
    this.registerFormCallback(this.getData(this.registerForm));
    this.registerForm.reset();
  }

  getData(form) {//метод получения данных из переданной формы
    const login = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;
    return { login, password };
  }
}
