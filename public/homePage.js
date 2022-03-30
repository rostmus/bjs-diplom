const logoutButton = new LogoutButton()
logoutButton.action = but => {
ApiConnector.logout(response => {
    if(response.success === true) {
        location.reload()
    }
})
}

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data)
    }
})

const ratesBoard = new RatesBoard()
ApiConnector.getStocks(response => {

    if (response.success === true) {
        ratesBoard.clearTable
        ratesBoard.fillTable(response.data)
    }
})

const moneyManager = new MoneyManager()
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(response.success === true) {
                    ProfileWidget.showProfile(response.data)
        } else {
            alert(response.error)
        }
    })

}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
} else {
    alert(response.error)
}
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
} else {
    alert(response.error)
}
    })
}


const favoritesWidget = new FavoritesWidget()
ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable(response.data)
        moneyManager.updateUsersList(response.data)
    }
})

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success === true) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
        } else {
            alert(response.error)
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data,response => {
        if(response.success === true) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
        } else {
            alert(response.error)
        }
    })
}
