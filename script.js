const lienzo = document.getElementById("lienzo");
const ctx = lienzo.getContext("2d");
const btnIniciar = document.getElementById("botonIniciar");
const btnParar = document.getElementById("botonParar");

const inputMasa1 = document.getElementById("inputMasa1");
const inputMasa2 = document.getElementById("inputMasa2");
const inputK1 = document.getElementById("rangoK1");
const valorK1 = document.getElementById("valorK1");
const inputK2 = document.getElementById("rangoK2");
const valorK2 = document.getElementById("valorK2");
const inputK3 = document.getElementById("rangoK3");
const valorK3 = document.getElementById("valorK3");
// Graficas
const canvasGraficaAngulo = document.getElementById("graficaAnguloTiempo");
const ctxGraficaAngulo = canvasGraficaAngulo.getContext("2d");

let animacionActiva = false;

// Actualización de valores
inputK1.oninput = function () {
  valorK1.textContent = parseFloat(this.value);
  dibujarSistema();
};

inputK2.oninput = function () {
  valorK2.textContent = parseFloat(this.value);
  dibujarSistema();
};

inputK3.oninput = function () {
  valorK3.textContent = parseFloat(this.value);
  dibujarSistema();
};

// Botón iniciar simulación
btnIniciar.addEventListener("click", function () {
  if (!animacionActiva) {
    animacionActiva = true;
    dibujarSistema();
  }
});

// Botón parar simulación
btnParar.addEventListener("click", function () {
  animacionActiva = false;
});

// Función para limpiar el lienzo en cada cuadro de animación
function limpiarLienzo() {
  ctx.clearRect(0, 0, lienzo.width, lienzo.height);
}

// Función para dibujar el sistema de resortes
function dibujarSistema() {
  limpiarLienzo();

  const k1 = parseFloat(inputK1.value);
  const k2 = parseFloat(inputK2.value);
  const k3 = parseFloat(inputK3.value);

  // Ajustar las posiciones de las masas en función de k1, k2 y k3
  const masa1X = 100 + k1; // La posición de masa1 depende de K1
  const masa2X = 200 + k2; // La posición de masa2 depende de masa1X y K2

  ctx.fillStyle = "blue";
  ctx.fillRect(masa1X - 20, lienzo.height / 2 - 20, 40, 40); // Dibuja la masa 1 como un cuadrado

  ctx.fillStyle = "red";
  ctx.fillRect(masa2X - 20, lienzo.height / 2 - 20, 40, 40); // Dibuja la masa 2 como un cuadrado

  // Dibujar resortes
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  // Resorte 1 (izquierda)
  ctx.beginPath();
  ctx.moveTo(0, lienzo.height / 2);
  ctx.lineTo(masa1X - 20, lienzo.height / 2);
  ctx.stroke();

  // Resorte 2 (centro)
  ctx.beginPath();
  ctx.moveTo(masa1X + 20, lienzo.height / 2);
  ctx.lineTo(masa2X - 20, lienzo.height / 2);
  ctx.stroke();

  // Resorte 3 (derecha)
  ctx.beginPath();
  ctx.moveTo(masa2X + 20, lienzo.height / 2);
  ctx.lineTo(lienzo.width, lienzo.height / 2);
  ctx.stroke();
}

// Iniciar la animación si el valor de K cambia
inputK1.addEventListener("input", dibujarSistema);
inputK2.addEventListener("input", dibujarSistema);
inputK3.addEventListener("input", dibujarSistema);
