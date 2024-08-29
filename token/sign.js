import { setToken } from "../module.js";


const url = "https://zone01normandie.org/api/auth/signin";


window.addEventListener('formReady', function(event) {
const { username, password } = event.detail;
const credentials = btoa(`${username}:${password}`)

const tokenQuery = ``;

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // bearer or basic auth
    "Authorization": `Basic ${credentials}`
  },
  body: JSON.stringify({ query: tokenQuery })
})

.then(response => response.json())
.then(token => {
  console.log(JSON.stringify(token));
  setToken(token);

  const event = new CustomEvent('tokenReady', {detail: token});
  window.dispatchEvent(event);
})

.catch(error => {
  console.error('Erreur dans sign:', error);
});
 
});

