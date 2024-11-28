export function drawPolar(technos) {
const data = Object.values(technos).map(techno => techno.amount);
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"]; // Palette de couleurs

const svg = document.getElementById("polarAreaChart");
const width = 500, height = 500;
const centerX = width / 2, centerY = height / 2;
const maxRadius = 200;
const total = data.reduce((sum, val) => sum + val, 0);

const toRadians = (angle) => (angle - 90) * (Math.PI / 180);

let startAngle = 0;
data.forEach((value, index) => {
    const proportion = value / total;
    const segmentAngle = proportion * 360;
    const endAngle = startAngle + segmentAngle;
    const radius = (value / Math.max(...data)) * maxRadius;

    const x1 = centerX + radius * Math.cos(toRadians(startAngle));
    const y1 = centerY + radius * Math.sin(toRadians(startAngle));
    const x2 = centerX + radius * Math.cos(toRadians(endAngle));
    const y2 = centerY + radius * Math.sin(toRadians(endAngle));

    const largeArcFlag = segmentAngle > 180 ? 1 : 0;
    const pathData = `
        M ${centerX},${centerY}
        L ${x1},${y1}
        A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}
        Z
    `;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", colors[index % colors.length]);
    svg.appendChild(path);

    startAngle = endAngle;
});

}
