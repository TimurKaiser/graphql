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

  document.body.innerHTML = main;
  drawRadar();

  const event = new CustomEvent('tokenReady', {detail: token});
  window.dispatchEvent(event);
})

.catch(error => {
  console.error('Erreur dans sign:', error);
});
 
});

function drawRadar() {
  const svgNS = "http://www.w3.org/2000/svg";
  const centerX = 200;
  const centerY = 200;
  const radius = 100;
  const dataPoint = 7;
  const angleStep = 360 / dataPoint;
  const data = [0.5, 0.3, 0.4, 0.9, 0.5, 0.4, 0.3];


  
  function polarToCartesian(angle, radius) {
      const rad = (angle - 90) * Math.PI / 180.0;
      return {
          x: centerX + (radius * Math.cos(rad)),
          y: centerY + (radius * Math.sin(rad))
      };
  }



  function drawRadarChart() {
      const points = [];
      
      for (let i = 0; i < dataPoint; i++) {
          const angle = angleStep * i;
          const { x, y } = polarToCartesian(angle, radius);
          const line = document.createElementNS(svgNS, "line");
          line.setAttribute("x1", centerX);
          line.setAttribute("y1", centerY);
          line.setAttribute("x2", x);
          line.setAttribute("y2", y);
          line.setAttribute("stroke", "#ccc");
          line.setAttribute("stroke-width", "1");
          document.getElementById("radarChart").appendChild(line);
      }

      data.forEach((value, i) => {
          const angle = angleStep * i;
          const { x, y } = polarToCartesian(angle, value * radius);
          points.push(`${x},${y}`);
          
          const point = document.createElementNS(svgNS, "circle");
          point.setAttribute("cx", x);
          point.setAttribute("cy", y);
          point.setAttribute("r", 5);
          point.setAttribute("class", "data-point");
          document.getElementById("radarChart").appendChild(point);
      });

      const dataLine = document.createElementNS(svgNS, "polygon");
      dataLine.setAttribute("points", points.join(" "));
      dataLine.setAttribute("class", "data-line");
      document.getElementById("radarChart").appendChild(dataLine);
  }

  drawRadarChart();
}

const main = `
<svg id="radarChart" width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <style>
        .grid-line {
            stroke: #ccc;
            stroke-width: 1;
        }
        .data-line {
            stroke: #ff6600;
            stroke-width: 2;
            fill: rgba(255, 102, 0, 0.2);
        }
        .data-point {
            fill: #ff6600;
            stroke: none;
        }
    </style>

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
`;