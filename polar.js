export function drawPolar(technos) {
    const data = Object.values(technos).map(techno => techno.amount);
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"];

    const svg = document.getElementById("polarAreaChart");
    if (!svg) {
        console.error("SVG element not found");
        return;
    }

    const width = 500, height = 500;
    const centerX = width / 2, centerY = height / 2;
    const maxRadius = 200;
    const scaleFactor = maxRadius;

    const toRadians = (angle) => (angle - 90) * (Math.PI / 180);

    let startAngle = 0;
    const segmentAngle = 360 / data.length;
    const labels = Object.keys(technos);

    data.forEach((value, index) => {
        if (value <= 0) return;

        const endAngle = startAngle + segmentAngle;
        const radius = value * scaleFactor;

        const x1 = centerX + radius * Math.cos(toRadians(startAngle));
        const y1 = centerY + radius * Math.sin(toRadians(startAngle));
        const x2 = centerX + radius * Math.cos(toRadians(endAngle));
        const y2 = centerY + radius * Math.sin(toRadians(endAngle));

        const pathData = `
            M ${centerX},${centerY}
            L ${x1},${y1}
            A ${radius},${radius} 0 0 1 ${x2},${y2}
            Z
        `;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", colors[index % colors.length]);
        svg.appendChild(path);

        startAngle = endAngle;
    });

    startAngle = 0;
    data.forEach((value, index) => {
        if (value <= 0) return;

        const midAngle = startAngle - segmentAngle / 2;
        const radius = maxRadius + 30;
        const x = centerX + radius * Math.cos(toRadians(midAngle));
        const y = centerY + radius * Math.sin(toRadians(midAngle));

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "12");
        text.textContent = labels[index].replace(/^skill_/, '');
        svg.appendChild(text);

        startAngle += segmentAngle;
    });
}
