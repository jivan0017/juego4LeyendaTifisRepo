
//Variable global que nombra el canvas
var nombreCanvas = "moduloCanvas";
var panelCoordenadas;
var tablero;

var coordenadaX;
var coordenadaY;



var posicionObstaculos1 = {

	ejeY:23

};



var tableroJuego01;

//objeto JSON que contiene los caracteres de las flechas para el desplazamiento
var comandosTeclado =
{
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var fondo = {
    imagenURL: "images/fondoJuego01.png",
    imagenOK: false
};



// DIBUJANDO AL PERSONAJE #1
var tifis = {
    frenteOK: false,
    atrasOK: false,
    derOK: false,
    izqOK: false,
    velocidad: 20,
    x: -20,
    y: -20
};

//DIBUJANDO PERSONAJE ESTATICO EN LA PANTALLAb
var liz = {
    imagenOK: false,
    x: 400,
    y: 200
};


//*****************************   METODO PRINCIPAL DEL CONTROLADOR  ******************************
function juego01voidMain (){

    var canvas = document.getElementById("moduloCanvas");

    panelCoordenadas = document.getElementById("moduloCoordenadas");

    tableroJuego01 = canvas.getContext("2d");

    fondo.imagen = new Image();
    fondo.imagen.src = fondo.imagenURL;
    fondo.imagen.onload = confirmarFondo;

    document.write('FLUJO NORMAL');

    //dibujando a alos personajes del juego 
    tifis.frente = new Image();
    tifis.frente.src = "images/diana-frente.png";
    tifis.frente.onload = confirmarFrente;

    tifis.atras = new Image();
    tifis.atras.src = "images/diana-atras.png";
    tifis.atras.onload = confirmarAtras;

    tifis.izq = new Image();
    tifis.izq.src = "images/diana-izq.png";
    tifis.izq.onload = confirmarIzq;

    tifis.der = new Image();
    tifis.der.src = "images/diana-der.png";
    tifis.der.onload = confirmarDer;

    liz.imagen = new Image();
    liz.imagen.src = "images/liz.png";
    liz.imagen.onload = confirmarLiz;

    //panelCoordenadas.write('test coordenadas');

    panelCoordenadas.textContent = "test";


    var txtX = document.getElementById("txtX");
    var txtY = document.getElementById("txtY");

    coordenadaX = txtX;
    coordenadaY = txtY;

    coordenadaX.value = "coordenadas X...";
    coordenadaY.value = "coordenadas Y...";
    //coordenadaY.textContent = "CONTENIDO X";

    document.addEventListener("keydown", teclado);

}

//************************************************************************************************

//pinta nueva imagen sobre la seccion canvas a traves del contexto
function dibujar(direccion)
{
  var tifisOrientada = tifis.frente;

    if(fondo.imagenOK)
    {
        tableroJuego01.drawImage(fondo.imagen, 0, 0);    
    }



    if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
    {
        if(direccion == comandosTeclado.DOWN || direccion == undefined)
        {
            tifisOrientada = tifis.frente;
        }
        else if(direccion == comandosTeclado.UP)
        {
            tifisOrientada = tifis.atras;
        }
        else if(direccion == comandosTeclado.LEFT)
        {
            tifisOrientada = tifis.izq;
        }
        else if(direccion == comandosTeclado.RIGHT)
        {
            tifisOrientada = tifis.der;
        }
    }
    tableroJuego01.drawImage(tifisOrientada, tifis.x, tifis.y);

    if(liz.imagenOK)
    {
        tableroJuego01.drawImage(liz.imagen, liz.x, liz.y);
    }
 }   


function confirmarFondo()
{
    fondo.imagenOK = true;
    dibujar();
}




// FUNCIONES QUE DETERMINAN LA POSICION DEL PERSONAJE AL MOSTRAR DEPENDIENDO DEL EVENTO DEL BOTON
// FUNCIONES QUE DETERMINAN LA POSICION DEL PERSONAJE AL MOSTRAR DEPENDIENDO DEL EVENTO DEL BOTON
function confirmarFrente()
{
    tifis.frenteOK = true;
    dibujar();
}
function confirmarAtras()
{
    tifis.atrasOK = true;
    dibujar();
}
function confirmarIzq()
{
    tifis.izqOK = true;
    dibujar();
}
function confirmarDer()
{
    tifis.derOK = true;
    dibujar();
}

function confirmarLiz()
{
    liz.imagenOK = true;
    dibujar();
}







function teclado(evento)
{
    var codigo = evento.keyCode; 


    //CUANDO SE DESPLAZA HACIA             <<<<<<<<<<  ARRIBA
    if(codigo == comandosTeclado.UP)
    {
        tifis.y -= tifis.velocidad;

        if(tifis.y<0)
        {
            tifis.y += tifis.velocidad;
            //document.write('movimiento: ' + tifis.y);
        }


        if (tifis.y == 340 && tifis.x > 120){
        	tifis.y += tifis.velocidad;
        } 



        if ((tifis.y== 200) && tifis.x <= 120){
        		tifis.y += tifis.velocidad;
        }


        //obstaculo3 
        if ((tifis.y == 200) && (tifis.x == 180 || tifis.x == 200 || tifis.x == 220 ) ){
        	tifis.y += tifis.velocidad;
        }
        coordenadaX.value = tifis.x;
        coordenadaY.value = tifis.y;
        var posicion = validarPosicionDiana(tifis.x, tifis.y);

    }

    //desplazamiento hacia                <<<<<<<<<<   ABAJO
    if(codigo == comandosTeclado.DOWN)
    {
        tifis.y += tifis.velocidad;

        //document.write('movimiento: ' + tifis.y);

        if(tifis.y>450)
        {
            tifis.y -= tifis.velocidad;
            //document.write('movimiento: ' + tifis.y);
        }


        if (tifis.y == 320 && tifis.x > 120){
        	tifis.y -= tifis.velocidad;	
        }

        //obstaculo de la parte izq
        if (tifis.y == 180 && (tifis.x <= 120)){
        	tifis.y -= tifis.velocidad;		
        }

        coordenadaX.value = tifis.x;
        coordenadaY.value = tifis.y;
        var posicion = validarPosicionDiana(tifis.x, tifis.y);

    }

    // DESPLAZARSE HACIA LA            <<<<<<<<<<<<<<<<   IZQUIERDA
    if(codigo == comandosTeclado.LEFT)
    {
        tifis.x -= tifis.velocidad;
       // document.write('movimiento: ' + tifis.x);
        if(tifis.x < -20)
        {
            tifis.x += tifis.velocidad;
            //document.write('movimiento: ' + tifis.y);
        }



        if ((tifis.y <= 200) && (tifis.x == 220)){

        	tifis.x += tifis.velocidad;

        }


        if (( tifis.y == 180  || tifis.y == 200 ) && (tifis.x <= 130)){
        	tifis.x += tifis.velocidad;		
        
        }
        coordenadaX.value = tifis.x;
        coordenadaY.value = tifis.y;

        var posicion = validarPosicionDiana(tifis.x, tifis.y);

    }

    //comando apra desplazarse hacia la   <<<<<<<<<<<<<<<<< DERECHA
    if(codigo == comandosTeclado.RIGHT)
    {
        moduloCoordenadas.textContent = "Derecha";
        tifis.x += tifis.velocidad;
        //document.write('movimiento: ' + tifis.x);

        // SI TIFIS ESTA ubicada A PARTIR DEL PUNTO 470 HORIZONTAL
        //limite
        if(tifis.x>470)
        {
            tifis.x -= tifis.velocidad;
            //document.write('movimiento: ' + tifis.y);
        }



        if (((tifis.y == 320) || (tifis.y == 340)) && tifis.x >120){
        	tifis.x -= tifis.velocidad;
        }


        //obstaculo 3:
        if ((tifis.y <= 200) && (tifis.x == 180)){
        	tifis.x -= tifis.velocidad;
        }
        coordenadaX.value = tifis.x;
        coordenadaY.value = tifis.y;

        var posicion = validarPosicionDiana(tifis.x, tifis.y);

    }
    dibujar(codigo);
   // document.write('movimiento: ' + tifis.y);
    
}

function validarPosicionDiana(tifisX, tifisY){

    if (tifisX == 400 && tifisY == 200){
       
        alert("HAS ENCONTRADO A DIANA!!!");
        return true;
    }else{
        return false;
    }

    if (coordenadaX == 400 && coordenadaY == 200){
        alert("hola");
    }

}







