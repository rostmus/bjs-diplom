
class LogoutButton {
  constructor() {
    [this.logoutBtn] = document.getElementsByClassName('logout');//объект кнопки выхода
    this.action = (f) => f;//действие, которое будет вызываться по клику и выполнять нужные действия
    this.logoutBtn.addEventListener('click', this.logoutClick.bind(this));
  }

  logoutClick(event) {
    event.preventDefault();
    this.action();
  }
}
