let user = null;
let pass = null;

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
