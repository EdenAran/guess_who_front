import { storageService } from "./storage.service";


export const userService = {
    getUser,
    signup,
    logout
}


function getUser() {
    const user = storageService.load('user');
    if (user) return user;
    return null;
}

function signup(username) {
    const user = {
        username,
        tilesLeft: 0,
        id: _makeid()
    }
    storageService.store('user', user);
    return user;
}
function logout() {
    storageService.store('user', null);
}

function updateUser(user) {
    storageService.store('user', user)
}


function _makeid(length = 10) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
}