const $cuadros = [
	document.querySelector("#cuadro-1"),
	document.querySelector("#cuadro-2"),
	document.querySelector("#cuadro-3"),
	document.querySelector("#cuadro-4"),
];
const $contenedorPrincipal = document.querySelector("#contenedor-principal");

let turnoN;

function cuadroRandom() {
	return Math.floor(Math.random() * 4);
}

function pasarTurno() {
	document.querySelector("#turno").innerText = "TURNO #" + turnoN;
	turnoN += 1;
}
function manejarEstado(texto) {
	document.querySelector("#estado").innerText = texto;
}

//

function resaltarCuadro($cuadro) {

	$cuadros[$cuadro].style.opacity = "1";
	setTimeout(function () {
		$cuadros[$cuadro].style.opacity = "0.4";
	}, 1000);
}

function comenzarJuego() {
	let secuenciaUsuario = [];
	let secuenciaMaquina = [];
	let turnoN = 1;

	bloquearInputUsuario();

	for (let i = 0; i < turnoN; i++) {
		cuadroNumero = cuadroRandom();
		secuenciaMaquina.push(cuadroNumero);
		resaltarCuadro(cuadroNumero);
		pasarTurno;
	}
}

function bloquearInputUsuario() {
	$contenedorPrincipal.onclick = function () {};
}

function desbloquearInputUsuario() {
	$contenedorPrincipal.onclick = function (e) {
		return e.target.id;
	};
}

document.querySelector("#boton-empezar").onclick = comenzarJuego;
