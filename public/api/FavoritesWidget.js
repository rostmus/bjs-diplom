class FavoritesWidget {
  constructor() {//создает объект
    this.favoritesTableBody = document.querySelector('table.table.addresses tbody');//объект таблицы избранного
    this.addUserToFavoritesForm = document.getElementById('addUser');//объект формы дл добавления пользователя в избранное
    this.favoritesMessageBox = document.getElementById('favoritesMessageBox');//объект формы для добавления пользователя в избранное
    this.favoritesMessageBox.style.display = 'none';

    this.addUserCallback = (f) => f;//функция, которая будет выполняться при добавлении пользователя в избранное
    this.removeUserCallback = (f) => f;//функция, которая будет запускаться при попытке удаления пользователя из избранного

    this.addUserToFavoritesForm.querySelector('.button')
      .addEventListener('click', () => {
        this.addUserCallback(this.getData());
        this.addUserToFavoritesForm.reset();
      });

    this.favoritesTableBody.addEventListener('click', (event) => {
      if (event.target.closest('button')) {
        const userId = event.target.closest('tr').children[0].textContent;
        this.removeUserCallback(userId);
      }
    });
  }

  fillTable(data) {//принимает объект и заполняет таблицу данными
    Object.keys(data).forEach((key) => {
      const element = data[key];
      this.favoritesTableBody.innerHTML += `
        <tr>
          <td data-addressee-id='${key}'>${key.length > 15 ? `${key.slice(0, 15)}...` : key}</td>
          <td data-addressee-name='${element}'>${element}</td>
          <td>
            <button class='ui purple icon button mini'>
            <i class='trash icon'></i>
            </button>
          </td>
        </tr>`;
    });
  }

  clearTable() {//очищает таблицу
    this.favoritesTableBody.innerHTML = '';
  }

  getData() {//метод получения данных из формы добавления пользователя
    const id = this.addUserToFavoritesForm.querySelector("[placeholder='ID']").value;
    const name = this.addUserToFavoritesForm.querySelector("[placeholder='Имя']").value;
    return { id, name };
  }

  setMessage(isSuccess, message) {//метод отображает сообщение (ошибку или успешность) в окне с информацией
    if (isSuccess) {
      this.favoritesMessageBox.className = 'ui message fluid success';
    } else {
      this.favoritesMessageBox.className = 'ui message fluid error';
    }

    this.favoritesMessageBox.innerText = message;
    this.favoritesMessageBox.style.display = 'block';
    setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
  }
}
