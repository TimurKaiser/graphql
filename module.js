let user = null;
let pass = null;
let authToken = null;

export function setUsernameMod(username) {
    user = username;
    console.log("Username is okay", user)
}

export function getUsernameMod() {
    return user;
}


export function setPasswordMod(password) {
    pass = password;
    console.log("Password is ok",pass)
}

export function getPasswordMod() {
    return pass;
}

export function setToken(token) {
    authToken = token;
}


export function getToken() {
    return authToken;
}