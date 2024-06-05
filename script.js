var img = document.getElementById("imgJuego");
var modalAhorcado = document.getElementById("modal");
var closeModalAhorcado = document.getElementById("closeModal");

img.onclick = function () {
  modalAhorcado.style.display = "block";
  juegoAhorcado();
};

document.addEventListener("DOMContentLoaded", (event) => {
  var closeModal = document.getElementById("closeModal");

  closeModal.onclick = function () {
    modal.style.display = "none";
  };
});

var PartidasGanadas = 0;
var PartidasPerdidas = 0;

function juegoAhorcado() {


  // Reset
  document.getElementById("botonAdivinar").disabled = false;
  document.getElementById("perder").innerText = "";
  document.getElementById("palabraUsuario").disabled = false;
  document.getElementById("botonAdivinar").style.display = "block";
  document.getElementById("jugarDenuevo").style.display = "none";
  document.getElementById("pista").innerText = "";
  document.getElementById("palabraOculta").innerText = "";
  document.getElementById("intentosFallidos").innerText = "";
  document.getElementById("noti").innerText = "";
  document.getElementById("dibujodeahorcado").innerText = "";

  var Palabras = [
    "saturno",
    "neptuno",
    "tierra",
    "jupiter",
    "marte",
    "venus",
    "mercurio",
    "urano",
    "pluton",
  ];
  var Pistas = [
    "Es el sexto planeta del sistema solar",
    "Es el octavo planeta del sistema solar",
    "Es el tercer planeta del sistema solar",
    "Es el quinto planeta del sistema solar",
    "Es el cuarto planeta del sistema solar",
    "Es el segundo planeta del sistema solar",
    "Es el planeta más cercano al sol",
    "Es el séptimo planeta del sistema solar",
    "Es el noveno planeta del sistema solar",
  ];

  var PalabraPerdiste = [
    "Perdiste",
    "La próxima te irá mejor",
    "Intenta de nuevo",
    "No te rindas",
    "Sigue intentando",
  ];

  var noti = document.getElementById("noti");
  document.getElementById("partidasGanadas").innerText = PartidasGanadas;
  document.getElementById("partidasPerdidas").innerText = PartidasPerdidas;

  var numero = Math.floor(Math.random() * Palabras.length);
  var palabra = Palabras[numero];
  var pista = Pistas[numero];
  var palabraOculta = palabra.replace(/\S/g, "_"); 
  console.log(palabra);
  var intentos = 0;

  dibujarAhorcado();

  document.getElementById("botonAdivinar").onclick = function () {
    var palabraUsuario = document.getElementById("palabraUsuario").value;
    if (palabraUsuario.length !== 1) {
      noti.innerText = "¡Solo puedes ingresar una letra!";
    } else {
      var letraEncontrada = false;
      var palabraOcultaArray = palabraOculta.split("");
      for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === palabraUsuario) {
          palabraOcultaArray[i] = palabraUsuario;
          noti.innerText = "¡Correcto!";
          letraEncontrada = true;
        }
      }
      if (!letraEncontrada) {
        intentos++;
        noti.innerText = "¡Incorrecto!";
      }
      palabraOculta = palabraOcultaArray.join("");
      document.getElementById("palabraOculta").innerText = palabraOculta;
      document.getElementById("intentosFallidos").innerText = intentos;
      dibujarAhorcado();

      if (intentos == 2) {
        document.getElementById("pista").innerText = pista;
        console.log(pista);
      }
      if (intentos >= 4) {
        PartidasPerdidas++;
        document.getElementById("partidasPerdidas").innerText =
          PartidasPerdidas;
        noti.innerText =
          PalabraPerdiste[Math.floor(Math.random() * PalabraPerdiste.length)];
        document.getElementById("palabraOculta").innerText = palabra;
        document.getElementById("botonAdivinar").disabled = true;
        document.getElementById("perder").innerText = "Perdiste";
        document.getElementById("palabraUsuario").disabled = true;
        document.getElementById("botonAdivinar").style.display = "none";
        document.getElementById("jugarDenuevo").style.display = "block";
      }
      if (palabraOculta === palabra) {
        PartidasGanadas++;
        document.getElementById("partidasGanadas").innerText = PartidasGanadas;
        noti.innerText = "¡Ganaste!";
        document.getElementById("botonAdivinar").disabled = true;
        document.getElementById("palabraUsuario").disabled = true;
        document.getElementById("botonAdivinar").style.display = "none";
        // no se estila como deberia el botón de jugar de nuevo
        document.getElementById("jugarDenuevo").style.display = "block";
      }
    }
    // Limpia el campo de entrada y mantiene el foco en él
    var input = document.getElementById("palabraUsuario");
    input.value = "";
    input.focus();
  };

  // on click para que se sobreescriba
  document.getElementById("jugarDenuevo").onclick = function () {
    juegoAhorcado();
      var input = document.getElementById("palabraUsuario");
     input.focus();
  };

  // Evento para detectar cuando se presiona Enter en el campo de entrada
  document
    .getElementById("palabraUsuario")
    .addEventListener("keyup", function (event) {
      // Número 13 es la tecla Enter
      if (event.keyCode === 13) {
        // Cancela la acción predeterminada, si es necesario
        event.preventDefault();
        // Dispara el evento del botón
        document.getElementById("botonAdivinar").click();
      }
    });
    
  function dibujarAhorcado() {
    switch (intentos) {
      case 0:
        document.getElementById("dibujodeahorcado").innerText = `   ____ 
  |    |
  O    |
  |    |
       |
       |
_| `;
        break;
      case 1:
        document.getElementById("dibujodeahorcado").innerText = `   ____ 
  |    |
  O    |
 /|    |
       |
       |
_| `;
        break;
      case 2:
        document.getElementById("dibujodeahorcado").innerText = `   ____ 
  |    |
  O    |
 /|\\   |
       |
       |
_| `;
        break;
      case 3:
        document.getElementById("dibujodeahorcado").innerText = `   ____ 
  |    |
  O    |
 /|\\   |
 /     |
       |
_| `;
        break;
    }
  }
}
