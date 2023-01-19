const $cuadros = [
	document.querySelector("#cuadro-0"),
	document.querySelector("#cuadro-1"),
	document.querySelector("#cuadro-2"),
	document.querySelector("#cuadro-3"),
];
const $contenedorPrincipal = document.querySelector("#contenedor-principal");
document.querySelector("#boton-empezar").onclick = comenzarJuego;

var rondaN = 0;
var secuenciaUsuario = [];
var secuenciaMaquina = [];

function reiniciarEstado() {
	rondaN = 0;
	secuenciaUsuario = [];
	secuenciaMaquina = [];
	document.querySelector("#ronda").innerText = "RONDA #-";

}

function cuadroRandom() {
	return Math.floor(Math.random() * 4);
}

function pasarRonda() {
	rondaN += 1;
	document.querySelector("#ronda").innerText = "RONDA #" + rondaN;

	console.log("ronda numero" + rondaN);
}

function manejarEstado(texto, mal = "") {
	document.querySelector("#estado").innerText = texto;

	mal
		? (document.querySelector("#estado").className = "alert alert-danger")
		: (document.querySelector("#estado").className = "alert alert-warning");
}

function resaltarCuadro($cuadro) {
	$cuadros[$cuadro].style.opacity = "1";

	setTimeout(function () {
		$cuadros[$cuadro].style.opacity = "0.4";
	}, 1000);
}

function bloquearInputUsuario() {
	$contenedorPrincipal.onclick = function () {};
}

function turnoUsuario() {
	delayJugador = (secuenciaMaquina.length + 1) * 1250;
	setTimeout(function () {
		manejarEstado("TU TURNO DALE");
		
		document.querySelectorAll(".cuadro").forEach(function($cuadro){

			$cuadro.onclick = manejarTurnoUsuario;

		})

	}, delayJugador);
}
function manejarTurnoUsuario(e) {
	if (e.target.id) {
		var $cuadroUsuario = Number(e.target.id.at(-1));
		console.log("el jugador toco el " + $cuadroUsuario);
		secuenciaUsuario.push($cuadroUsuario);
		resaltarCuadro($cuadroUsuario);
	}

	if (secuenciaMaquina.length === secuenciaUsuario.length) {
		validarInputUsuario();

	}
}
function validarInputUsuario() {
	for (let i = 0; i < secuenciaMaquina.length; i++) {
		if (secuenciaMaquina[i] !== secuenciaUsuario[i]) {
			manejarEstado("PERDISTE JAJAJA", true);
			reiniciarEstado()
			return;
		}
	}
	setTimeout(function () {
		siguienteRonda();
	}, 1500);
}

function comenzarJuego() {
	reiniciarEstado();
	siguienteRonda();
}

function pintarSecuenciaMaquina() {
	secuenciaMaquina.forEach(function ($cuadro, i) {
		delay = 1500 * i;
		setTimeout(function () {
			resaltarCuadro($cuadro);
		}, delay);
	});
}

function siguienteRonda() {
	bloquearInputUsuario();
	secuenciaUsuario = [];

	manejarEstado("PRESTÁ ATENCIÓN PAPÁ");

	nuevoCuadro = cuadroRandom();
	secuenciaMaquina.push(nuevoCuadro);
	pintarSecuenciaMaquina();

	turnoUsuario();

	pasarRonda();
	console.log(secuenciaMaquina);
}

function cambiarModo() {
	document.querySelector("body").classList.toggle("modo-oscuro");
}

flexSwitchCheckDefault.onchange = cambiarModo;
