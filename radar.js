export function drawRadar(skills) {
    const svgNS = "http://www.w3.org/2000/svg";
    const centerX = 250;
    const centerY = 250;
    const radius = 200;
    const dataPoint = 7;
    const angleStep = 360 / dataPoint;
    const data = Object.values(skills).map(skill => skill.amount);  
  
    
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
};