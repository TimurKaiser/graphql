document.getElementById('loginForm').addEventListener('submit', function(event) {
    // empeche rechargement de la page + me donne le controle
    event.preventDefault();

    //sans value on accede a l'element html et non la valeur qu'elle contient
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    console.log("username is", username);
    console.log("password is", password);


})

