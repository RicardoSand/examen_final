function aSexagesimales(rad) {
    return (rad * 180) / Math.PI;
}
  
// Función para calcular los ángulos de un triángulo en grados sexagesimales
function calculateAngles(a, b, c) {
  let angleA = aSexagesimales(Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)));
  let angleB = aSexagesimales(Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c)));
  const angleC = 180 - angleA - angleB;

  return [angleA.toFixed(2), angleB.toFixed(2), angleC.toFixed(2)];
}

// Función para calcular las medianas de un triángulo
function calculateMediana(a, b, c) {
  return [
    Math.sqrt((2 * Math.pow(b, 2) + 2 * Math.pow(c, 2) - Math.pow(a, 2)) / 4).toFixed(2),
    Math.sqrt((2 * Math.pow(a, 2) + 2 * Math.pow(c, 2) - Math.pow(b, 2)) / 4).toFixed(2),
    Math.sqrt((2 * Math.pow(a, 2) + 2 * Math.pow(b, 2) - Math.pow(c, 2)) / 4).toFixed(2),
  ];
}

// Función para calcular las bisectrices de un triángulo
function calculateBisectriz(a, b, c) {
  const p = (a + b + c) / 2;
  return [
    ((2 / (b + c)) * Math.sqrt(b * c * p * (p - a))).toFixed(2),
    ((2 / (a + c)) * Math.sqrt(a * c * p * (p - b))).toFixed(2),
    ((2 / (a + b)) * Math.sqrt(a * b * p * (p - c))).toFixed(2),
  ];
}

function calculateArea(a, b, c) {
  const perimeter = a + b + c;
  const s = perimeter / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Función para calcular las alturas de un triángulo
function calculateAltura(a, b, c) {
  const area = calculateArea(a, b, c);
  return [
    ((2 * area) / a).toFixed(2),
    ((2 * area) / b).toFixed(2),
    ((2 * area) / c).toFixed(2),
  ];
}

// Función para calcular el perímetro y el área de un triángulo
function calculatePerimeterArea(a, b, c) {
  const perimeter = a + b + c;
  const area = calculateArea(a, b, c);
  return { perimeter: perimeter.toFixed(2), area: area.toFixed(2) };
}

// Función principal para manejar el evento de clic en "Calcular"
document.getElementById("calculate-btn").addEventListener("click", () => {
  const a = parseFloat(document.getElementById("lado-a").value);
  const b = parseFloat(document.getElementById("lado-b").value);
  const c = parseFloat(document.getElementById("lado-c").value);

  if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
    alert("Por favor, ingrese valores válidos para los lados.");
    return;
  }

  if (a + b <= c || a + c <= b || b + c <= a) {
    alert("Los valores ingresados no forman un triángulo válido.");
    return;
  }

  // Cálculos
  const angles = calculateAngles(a, b, c);
  const medians = calculateMediana(a, b, c);
  const bisectors = calculateBisectriz(a, b, c);
  const heights = calculateAltura(a, b, c);
  const { perimeter, area } = calculatePerimeterArea(a, b, c);

  // Mostrar resultados
  document.getElementById("angles").innerText = 
      `Ángulos:
      \nÁngulo (a): ${angles[0]}°
      \nÁngulo (b): ${angles[1]}°
      \nÁngulo (c): ${angles[2]}°`;
  
  document.getElementById("medians").innerText = 
      `Medianas:
      \nMediana ma: ${medians[0]}
      \nMediana mb: ${medians[1]}
      \nMediana mc: ${medians[2]}`;
  
  document.getElementById("bisectors").innerText = 
      `Bisectrices:
      \nBisectriz ba: ${bisectors[0]}
      \nBisectriz bb: ${bisectors[1]}
      \nBisectriz bc: ${bisectors[2]}`;
  
  document.getElementById("heights").innerText = 
      `Alturas:
      \nAltura ha: ${heights[0]}
      \nAltura hb: ${heights[1]}
      \nAltura hc: ${heights[2]}`;
  
  document.getElementById("perimeter-area").innerText = 
      `Perímetro y Área:
      \nPerímetro: ${perimeter}
      \nÁrea: ${area}`;
});