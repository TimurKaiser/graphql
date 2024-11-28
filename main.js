import { setToken, getToken, setUsernameMod, setPasswordMod } from "./module.js";
import { drawPolar } from "./polar.js";
import { drawRadar } from "./radar.js";

const authUrl = "https://zone01normandie.org/api/auth/signin";
const graphqlUrl = "https://zone01normandie.org/api/graphql-engine/v1/graphql";

const queryData = `{
    user {
        firstName
        lastName
        id
    }
    transaction {
        type
        amount
    }
}`;

function initialize() {
    document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
    window.addEventListener('dataReady', handleDataReady);
    window.addEventListener('tokenReady', fetchGraphQLData);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    setUsernameMod(username);
    setPasswordMod(password);

    const credentials = btoa(`${username}:${password}`);
    
    fetch(authUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${credentials}`
        },
        body: JSON.stringify({ query: '' })
    })
    .then(response => response.json())
    .then(token => {
        setToken(token);
        window.dispatchEvent(new CustomEvent('tokenReady'));
    })
    .catch(error => console.error('Erreur dans sign:', error));
}

function fetchGraphQLData() {
    const token = getToken();
    fetch(graphqlUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ query: queryData })
    })
    .then(response => response.json())
    .then(myData => {
        sessionStorage.setItem('myData', JSON.stringify(myData));
        window.dispatchEvent(new CustomEvent('dataReady'));
    })
    .catch(error => console.error(error));
}

function handleDataReady() {
    const getData = sessionStorage.getItem('myData');
    if (getData) {
        const myData = JSON.parse(getData);
        const transactions = myData.data.transaction;
        const skillTransaction = transactions.filter(transaction => transaction.type.includes('skill_'));

        const groupedSkills = skillTransaction.reduce((acc, skill) => {
            if (!acc[skill.type] || skill.amount > acc[skill.type].amount) {
                acc[skill.type] = skill;
                skill.amount = skill.amount / 100;
            }
            return acc;
        }, {});

        const technoKeys = ['skill_go', 'skill_js', 'skill_html', 'skill_css', 'skill_unix', 'skill_docker'];
        let techno = {};
        let skills = {};

        Object.keys(groupedSkills).forEach(key => {
            if (technoKeys.includes(key)) {
                techno[key] = groupedSkills[key];
            } else {
                skills[key] = groupedSkills[key];
            }
        });

        console.log(skills);
        console.log(techno);

        document.body.innerHTML = mainTemplate;
        drawRadar(skills);
        drawPolar(techno);

        window.dispatchEvent(new CustomEvent('skillReady', { detail: skills }));
    } else {
        console.log("No data in filter");
    }
}

const mainTemplate = `
<svg id="radarChart" width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">

<defs>
    <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style="stop-color:rgba(255, 102, 0, 0.5); stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgba(255, 102, 0, 0); stop-opacity:1" />
    </radialGradient>
</defs>

<!-- Circles and grid lines -->
<circle cx="200" cy="200" r="100" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="90" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="80" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="70" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="60" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="50" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="40" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="30" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="20" stroke="#ccc" stroke-width="1" fill="none"/>
<circle cx="200" cy="200" r="10" stroke="#ccc" stroke-width="1" fill="none"/>

<!-- Gradient circles -->
<circle cx="200" cy="200" r="100" fill="url(#gradient)" fill-opacity="0.1"/>
<circle cx="200" cy="200" r="90" fill="url(#gradient)" fill-opacity="0.2"/>
<circle cx="200" cy="200" r="80" fill="url(#gradient)" fill-opacity="0.3"/>
<circle cx="200" cy="200" r="70" fill="url(#gradient)" fill-opacity="0.4"/>
<circle cx="200" cy="200" r="60" fill="url(#gradient)" fill-opacity="0.5"/>
<circle cx="200" cy="200" r="50" fill="url(#gradient)" fill-opacity="0.6"/>
<circle cx="200" cy="200" r="40" fill="url(#gradient)" fill-opacity="0.7"/>
<circle cx="200" cy="200" r="30" fill="url(#gradient)" fill-opacity="0.8"/>
<circle cx="200" cy="200" r="20" fill="url(#gradient)" fill-opacity="0.9"/>
<circle cx="200" cy="200" r="10" fill="url(#gradient)" fill-opacity="1"/>
</svg>


<svg id="polarAreaChart" width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <!-- Dégradé de couleur pour les cercles -->
    <defs>
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:rgba(255, 102, 0, 0.5); stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(255, 102, 0, 0); stop-opacity:1" />
        </radialGradient>
    </defs>

    <circle cx="250" cy="250" r="200" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="180" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="160" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="140" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="120" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="100" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="80" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="60" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="40" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="20" stroke="#ccc" stroke-width="1" fill="none"/>
    <circle cx="250" cy="250" r="10" stroke="#ccc" stroke-width="1" fill="none"/>
    
</svg>

`;

initialize();
