const userForm = new UserForm()
let sasa
userForm.loginFormCallback = data => {
    ApiConnector.login(data,response => {
    if(response.success === false) {
        alert(response.error)
    } else {
        location.reload()
    }
})
}
userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if(response.success === false) {
            alert(response.error)
        } else {
            alert('Регистрация прошла успешно')
        }
})
}