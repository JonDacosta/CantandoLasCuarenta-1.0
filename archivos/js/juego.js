/**
 * ENUNCIADO
 * 
 * Crear una aplicación a modo de juego de cartas donde se aplicará lógica para el jugador
 * y para la máquina. Las reglas son sencillas. Se trata de aplicar cartas aleatoriamente a un tablero,
 * donde estas, tienen una puntuación asignada, tendremos que sumar 40 puntos o acercarnos a ellos 
 * y plantarle cara a la puntuación de la máquina.
 * 
 * OPERACIONES
 *      -Creacion de objeto arrays para la baraja con los tipos de carta.
 *          los tipos seran: Bastos, Espadas, Corazones y Copas, (del 2 al 7 sus valores).
 *          En cada palo los tipos especiales: As, Rey, Caballo y Sota con sus valores.
 *  
 *      -El programá pedirá el nombre al usuario al entrar, y este será utilizado para los mensajes de salida en caso de ganar o perder.
 *      -El nombre del jugador también aparecerá durante la partida en el tablero.
 *      -Habrá contador de puntuación para el jugador y para la máquina.
 *      -Manipulación del DOM para botones, insertado de texto y dinamismo en el tablero.
 *      
 * 
 * 
 */      
/*
Cartas normales de valores correspondientes entre 2 y 7:
2O = Dos de oros
2C = Dos de corazones
2B = Dos de bastos
2E = Dos de espadas
//////////////////////////////////
Cartas especiales:
A = As             - valor en puntos: 11 puntos
R = Rey            - valor en puntos: 10 puntos
C = Caballo        - valor en puntos: 9 puntos
S = Sota           - valor en puntos: 8 puntos
*/


/**VARIABLES con SCOPE global */

let baraja            = [];                   //Con let(ya que tendrá cambios) donde almacenará array de baraja
const tipos           = ['O', 'C', 'B', 'E']; //constante array que almacena los tipos de cartas nombrados arriba del 2 al 7
const tiposEspeciales = ['A', "S", 'C', 'R']; //constante array que almacena los tipos de cartas especiales.
let nombreJugador     = prompt('Hola! Bienvenido a Cantando las 40! ¿Nombre del Jugador?'); //pedimos y almacenamos el nomvre del jugador
alert(`Bienvenido ${nombreJugador} las reglas son sencillas:
        - Comienza sumando cartas para aproximarte a 40 puntos.
        - AS 11 /Rey 10 /Caballo 9 /Sota 8 /7,6...)
        - Si te pasas..PIERDES!
        - Puedes plantarte cuando quieras.
        - Si la máquina te supera.. PIERDES!
        A POR TODAS!`)
let puntosJugador = 0;                       //almacena los puntos del jugador, inicializados en 0 puntos.
let puntosMaquina = 0;                       //almacena los puntos de la máquina, inicializados en 0 puntos.

////////////////////////////////////////////
/**REFERENCIAS HTML */
const botonSumar = document.querySelector("#Sumar");       //almacenamos en botonSumar la referencia desde html
const botonDetener = document.querySelector('#Detener');   //almacenamos en botonDetener la referencia desde html
const botonEmpezar = document.querySelector('#Empezar');   //almacenamos en botonEmpezar la referencia desde html
const puntajeHTML = document.querySelectorAll("small")     //almacena un array de las etiquetas small de html para los puntos
const divCartasJugador = document.querySelector('.jugador-cartas');
const divCartasMaquina = document.querySelector('.maquina-cartas');
document.getElementById("jugador1").innerText = nombreJugador;


////////////////////////////////////////////
/**FUNCIONES */
/**Función para la creación de barajas */
const crearBaraja = () => {                                 //simplificada de funcion () {};
    /*Recorre la baraja, empieza por 2 hasta el 7 para la obtención de las cartas*/
    for( let i = 2; i <= 7; i++) {
        for( let tipo of tipos) {
            baraja.push(i + tipo);                         //uso de push para meter en la baraja
        }  
    }
    //Recorre y añade a la baraja las cartas con nombres especiales
    for (let tipo of tipos) {
        for( let especial of tiposEspeciales) {
            baraja.push(especial + tipo);                  //uso nuevamente de push para meter en la baraja
        }
    }
    //He añadido una biblioteca externa llamada "UNDERCORE(añadiendo "_") solamente para usar la propiedad shuffle que remueve el array"
    baraja = _.shuffle( baraja );
    // console.log(baraja);
    return baraja;                                         //retorna la baraja removida por shuffle
};

crearBaraja();                                             //llamada a la función

/**Función que permite sumar una carta */
const sumarCarta = () => {                                 //simplificada de funcion () {};
    
    if( baraja.length === 0) {                          //Si nos quedasemos sin cartas, da un error por consola y alert        
        var mensajeError = "Error: no quedan cartas";
        alert(mensajeError);
        throw 'No quedan cartas';                       //error en la consola (aun que no nos salte el error, para usar el throw)
    }
    const carta = baraja.pop();                         //quita una carta de la baraja removida por el shuffle y nos la ofrece
    console.log(carta);
    return carta;
    
}

sumarCarta();


/**Función para dar valores a las cartas */
const valorCarta = (carta) => {                             //le pasamos carta a la función

    const valor = carta.substring(0, carta.length -1);      //guarda y opera para dejar las cartas solamente en número quitandole la letra correspondiente
                                                            //¿Si no es número? utilizamos una condición ternatia
    return ( isNaN ( valor ) ) ?
             ( valor === 'A' ) ? 11:                        //A de 'AS' vale 11 puntos
             ( valor === 'S' ) ? 8:                         //S de 'Sota' vale 8 puntos
             ( valor === 'C' ) ? 9 : 10                     //C de 'Caballo' vale 9 puntos o la restante 10 (que seria R de 'Rey')
             : valor * 1;                                   //Multiplicamos por 1 para asegurar que sea un número
    
}

/*Función para el turno de la máquina*/
const turnoMaquina = ( puntosMinimos ) => {                //le pasamos puntosMinimos a la función

    do {                                                   //hacemos - cuando..

        const carta = sumarCarta();

        puntosMaquina = puntosMaquina + valorCarta (carta); //carta como argumento
        puntajeHTML[1].innerText = puntosMaquina;           //dinamicamente metemos los puntos dela maquina en el indice 1 (segundo small del html)
        
        const imagenCarta = document.createElement('img');
        imagenCarta.src = `archivos/cartas/${ carta }.png`;     //eleccion de la carta con .src
        imagenCarta.classList.add('carta');                     //añadimos clase / uso de classList + .add
        divCartasMaquina.append( imagenCarta );                 
        
        if ( puntosMinimos > 40) {
            break;
        }
    } while ( (puntosMaquina < puntosJugador) && (puntosMinimos <= 40));

    setTimeout (() => {                                                     //Funcion Javascript para ajustar tiempo

        if ( puntosMaquina === puntosMinimos ) {
            alert('¡¡Vaya empate!!');                                       //mensaje de empate si los puntos son iguales
        } else if ( puntosMinimos > 40 ) {
            alert(`Gana la máquina! vuelve a intentarlo ${nombreJugador}`); //mensaje donde gana la máquina cuando obtiene más puntaje
        } else if ( puntosMaquina > 40 ) {
            alert (`Bien! ha ganado ${nombreJugador}!!!!!!`);               //mensaje donde gana el jugador al obtener más puntos que la máquina
        } else {
            alert ('Gana la máquina!');                         
        }

    }, 10 );                                                                //10 milisegundos para que aparezca el mensaje
}


/**EVENTOS //////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////////////////

botonSumar.addEventListener('click', function() {           //añadimos el evento de click a botonSumar con una función
    
    const carta = sumarCarta();

    puntosJugador = puntosJugador + valorCarta (carta);     //carta como argumento
    puntajeHTML[0].innerText = puntosJugador;               //dinamicamente metemos los puntos del jugador en el indice 0 (primer small del html)
    
    const imagenCarta = document.createElement('img');      //Creación de elemento, con imagen
    imagenCarta.src = `archivos/cartas/${ carta }.png`;     //eleccion de la carta en su directorio
    imagenCarta.classList.add('carta');                     //añadimos la clase
    divCartasJugador.append( imagenCarta );                 //
    
    /**Con un If evaluamos si nos pasamos de puntuacion, obtenemos 40 o no llegamos a los 40 puntos*/
    if ( puntosJugador > 40 ) {
        alert("Juego perdido, te has pasado!");
        botonSumar.disabled = true; //con disabled inhabilitamos el boton de "Sumar Carta".
        botonDetener.disabled = true;
        // turnoMaquina(puntosJugador);


    } else if ( puntosJugador === 40 ) {
        alert(`Ganastes la partida ${nombreJugador}!`);
        botonSumar.disabled = true;
        botonDetener.disabled = true;
        turnoMaquina(puntosJugador);

    }

});


botonDetener.addEventListener('click', () => {
    
    botonSumar.disabled = true;
    botonDetener.disabled = true;

    turnoMaquina ( puntosJugador );
});


botonEmpezar.addEventListener('click', () => {      //contrala el "Empezar Juego" reseteando todos los valores.
    
    baraja = crearBaraja();                         //llama a crearBaraja
    puntosJugador = 0;                              //puntos de jugador en 0
    puntosMaquina = 0;                              //puntos de máquina en 0

    puntajeHTML[0].innerText = 0;                   //puntuación que aparece en índice 0 del small de html (jugador) /inyecta 0.
    puntajeHTML[1].innerText = 0;                   //puntuación que aparece en índice 1 del small de html (máquina) /inyecta 0.

    divCartasMaquina.innerHTML = '';                //Insertado vacío para las cartas
    divCartasJugador.innerHTML = '';

    botonSumar.disabled = false;                    //Habilita de nuevo los botones de Sumar carta y Detener.
    botonDetener.disabled = false;
});


