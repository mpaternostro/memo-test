const $tablero = document.querySelector('#tablero');
const $imagenes = Array.from($tablero.querySelectorAll('.imagen'));
let imagenElegida = [];
let segundos = 0;
let imagenesRandom = '';
const cuadradoPregunta = 'img/cuadrado-pregunta.png';
const cantidadIntentos = document.querySelector('#cantidad-intentos');
let contadorIntentos = 0;
contadorIntentos.textContent = `Intentos: ${cantidadIntentos}`;
let aciertos = 0;
let contadorTiempo = '';

document.querySelector('#jugar').onclick = (() => {
    comenzarJuego();
    imagenesRandom = mezclar();
    contadorTiempo = setInterval(actualizarContadorTiempo, 1000);
    desbloquearInputUsuario();
});

function comenzarJuego() {
    document.querySelector('#pantalla-inicio').classList.add('d-none');
    document.querySelector('#juego').classList.remove('d-none');
}

function mezclar() {
    const imagenes = Array.from(document.querySelectorAll('.frutas'));
    const imagenesDuplicado = imagenes.concat(imagenes);
    const largoImagenes = imagenesDuplicado.length;
    const nuevoArrImagenes = [];
    for (let i = 0; i < largoImagenes; i++) {
        const numeroRandom = Math.floor(Math.random() * imagenesDuplicado.length);
        nuevoArrImagenes[i] = imagenesDuplicado[numeroRandom];
        imagenesDuplicado.splice(numeroRandom, 1);
    }
    return nuevoArrImagenes;
}

function elegirImagen(e) {
    imagen = e.target;
    if (!imagen.classList.contains('imagen')) { return; };
    posicion = $imagenes.indexOf(imagen);
    if (imagen !== imagenElegida[0]) {
        imagen.src = imagenesRandom[posicion].src;
        imagenElegida.push(imagen);
        if (imagenElegida.length === 2) { comprobarAcierto() };
    }
}

function comprobarAcierto() {
    bloquearInputUsuario();
    aumentarIntentos();
    if (imagenElegida[0].src === imagenElegida[1].src) {
        setTimeout(() => {
            imagenElegida[0].classList.add('invisible');
            imagenElegida[1].classList.add('invisible');
            imagenElegida = [];
            aciertos++;
            if (aciertos === 8) { finJuego(); }
            desbloquearInputUsuario();
        }, 1150);
    } else {
        setTimeout(() => {
            imagenElegida[0].src = cuadradoPregunta;
            imagenElegida[1].src = cuadradoPregunta;
            imagenElegida = [];
            desbloquearInputUsuario();
        }, 1250);
    }
}

function bloquearInputUsuario() {
    $tablero.onclick = (() => { });
}

function desbloquearInputUsuario() {
    $tablero.onclick = elegirImagen;
}

function aumentarIntentos() {
    contadorIntentos++;
    cantidadIntentos.textContent = `Intentos: ${contadorIntentos}`;
}

function actualizarContadorTiempo() {
    const tiempo = document.querySelector('#contador-tiempo');
    segundos++;
    tiempo.textContent = `Tiempo transcurrido: ${segundos} segundos`;
}

function finJuego() {
    document.querySelector('#juego').classList.add('d-none');
    const resultados = document.querySelector('#resultados');
    resultados.textContent = `Tardaste ${segundos} segundos y tuviste un total de ${contadorIntentos} intentos.`;
    document.querySelector('#fin-del-juego').classList.remove('d-none');
    clearInterval(contadorTiempo);
}
