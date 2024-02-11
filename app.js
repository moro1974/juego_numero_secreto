// Aquí llamo a la función y la variable numeroScreto de una vez lo igualo al resultado de la función que es el return con el número aleatorio //NUEVA ACTUALIZACION: Solo declaramos la variable aquí, y el número aleatorio se ejecutará en la función condicionesIniciales()
let numeroSecreto = 0;
let intentos = 1; //iniciamos en 1 porque al menos una vez va a tener que hacerlo // NUEVA ACTUALIZACION: iniciamos en 0 y en condicionesIniciales empezamos en 1.
let listaNumerosSorteados = []; //esta es la lista donde iré metiendo los números que ya salieron, para que no me vuelvan a salir, porque los numeros que salen no se pueden repetir según la lógica del juego.
let numeroMaximo = 10; //defino esta variable, para luego si voy a hacer un rango diferente, modifico esta variable, y se me cambiará en todas las partes donde meto esta variable



//De esta manera llamo a h1 y p para agregarle este texto:
function asignarTextoElemento (elemento, texto){
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
    return //se coloca return así no retorne nada, solo por buena práctica
}
//Así meto el texto de una vez en el HTML, y lo automatizo en una función para luego solo cambiar las variables de la función y así meter texto en HTML:
function asignarTextoElemento (elemento, texto){
    let parrafo = document.querySelector(elemento);
    parrafo.innerHTML = texto;
    return
}



//De esta manera llamo la funcion: con la función onclick en HTML.
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value); //con el value ya tendría disponible es el valor, porque sino pongo value, me da es el objeto.
    //Usé el parseInt ya que numeroDeUsuario me estaba quedando como un string, y numeroSecreto como número, y no puedo comparar string con números, por eso convierto a entero el numeroDeUsuario
    //console.log(typeof(numeroDeUsuario));  solo para ver que tipo de dato es
    //console.log(numeroSecreto); //solo se puso esto para corroborar que sirvió 
    //console.log(typeof(numeroSecreto)); // solo para ver que tipo de dato es
    //console.log(numeroDeUsuario); //para corroborar
    //console.log(numeroSecreto === numeroDeUsuario); //el === me indica que tiene que ser igual el valor y el tipo de dato
    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento("p",`Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}`); //Se puede poner template y también operadores ternarios en parámetros de funciones 
        document.getElementById("reiniciar").removeAttribute("disabled"); //Aquí selecciono el boton de nuevo juego y le desactivo el atributo disabled, para que luego que se adivine el juego, se habilite boton nuevo juego
    } else {
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento("p", "El número secreto es menor");
        }else {
            asignarTextoElemento("p", "El número secreto es mayor");
        }


        intentos++;
        limpiarCaja();


    }

    /*if (intentos === 3){
        asignarTextoElemento("p",`Realizaste el número máximo de intentos!`);
        // reiniciarJuego();
    } else {
        return;   
    }*/
    

    
}

/*function conteoIntentos () {
    if (intentos === 4){
        asignarTextoElemento("p",`Realizaste el número máximo de intentos!`);
        reiniciarJuego();
    } else {

    }
}*/

//Función para limpiar línea de ingreso de número cuando no se acierta el número
function limpiarCaja(){
    document.querySelector("#valorUsuario").value = ""; // se puede usar getElementById o queryselector pero le ponemos el # para indicar que es el id.

}

function asignarNumerSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;  // En este caso si necesitamos que nos retorne algo, el numero secreto, el cual como resultado de toda la función, arriba se asigna a la vabiable numeroSecreto;//ACTUALIZACION: se igualará a la nueva variable número generado para compararlo con la lista de numerosSorteados.//ACTUALIZACION: Cambio el 10 por variable numeroMaximo, para hacerlo más funcional, solo cambio la variable numeroMaximo arriba y se me modificara de una aquí en el proceso de número aleatorio.
    // si el número generado esta incluido en la lista, realiza esto:
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados); //console.log solo puestos para probar funcionalidad.
    if (listaNumerosSorteados.length == numeroMaximo){ // este if es para saber si ya se sortearon todos los números, y si es así, para que se detenga la RECURSIVIDAD y no se bloquee, si el largo de la lista es igual a la cantidad maxima del rango, ya se debe bloquear, sino sigue lo de abajo
        asignarTextoElemento("p", "Ya se sortearon todos los números posibles!");
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)){ //método includes, revisa que en listaNumerosSorteados esté numeroGenerado.
            return asignarNumerSecreto(); // si el número generado esta en lista de numeros sorteados, volver a llamar a la función para que saque otro número; esto se llama RECURSIVIDAD
        } else {
            listaNumerosSorteados.push(numeroGenerado); // si el numero generado NO esta en la lista de numeros sorteados, aprovecho de agregarlo , y retorno el numero generado porque ahora si me sirve.
             return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
     //Puedo llamar la función aquí luego de la función, o arriba antes de la función,  JS lee de arriba a abajo, y si hay una función y luego se llama a la función con sus variables, JS hace el hoisting que es que sube todos los llamados y variables al principio del archivo, aunque en realidad no los ubica al principio, sino que en la compilación son asignadas a memoria mientras se usa.//NUEVA ACTUALIZACION: estas dos funciones se meten dentro de una función mensajesIniciales()
    asignarTextoElemento("h1", "Juego del número secreto!");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
    //Generar el número aleatorio: sin el let la variable numeroSecreto, porque ya la declaré arriba, me traigo la funcion asignarNumeroSecreto() con la variable numeroSecreto porque vamos a obtener un nuevo número secreto
    numeroSecreto = asignarNumerSecreto(); 
    //Inicializar el número de intentos
    intentos = 1;
}

function reiniciarJuego() { //esta función la llame en el html en el boton de nuevo juego
    //limpiar caja
    limpiarCaja();
    //Indicar nuevamente condiciones de inicio
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego: debo habilitar de nuevo el atributo disabled en html, para eso uso la propiedad setAttribute, pero usa dos parámetros, el primero que es el atributo que quiero en html, y el segundo que es True o False dependiendo si quiero activarlo o desactivarlo en html
    document.querySelector("#reiniciar").setAttribute("disabled", "True");
}



condicionesIniciales();

//Puedo llamar la función aquí luego de la función, o arriba antes de la función,  JS lee de arriba a abajo, y si hay una función y luego se llama a la función con sus variables, JS hace el hoisting que es que sube todos los llamados y variables al principio del archivo, aunque en realidad no los ubica al principio, sino que en la compilación son asignadas a memoria mientras se usa.//NUEVA ACTUALIZACION: estas dos funciones se meten dentro de una función mensajesIniciales()
// asignarTextoElemento("h1", "Juego del número secreto!");
// asignarTextoElemento("p", "Indica un número del 1 al 100");


