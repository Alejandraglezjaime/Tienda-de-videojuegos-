// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperamos que todos los elementos de la página carguen para ejecutar el script
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// Funciones de los botones y eventos 
function ready(){
    
    // Funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    // Funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     // Funcionalidad al boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //  Funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Funcionalidad al botón comprar
    var botonPagar = document.getElementsByClassName('btn-pagar')[0];
    if(botonPagar){
        botonPagar.addEventListener('click',pagarClicked)
    }

    // Funcionalidad al botón vaciar carrito
    var botonVaciar = document.getElementsByClassName('btn-vaciar')[0];
    if(botonVaciar){
        botonVaciar.addEventListener('click', vaciarCarritoClicked);
    }


    // Agregar eventos para "Ver trailer"
    const enlacesVerTrailer = document.getElementsByClassName('url-trailer');
    for (let i = 0; i < enlacesVerTrailer.length; i++) {
        enlacesVerTrailer[i].addEventListener('click', verTrailerClicked);
    }

    // Asignar evento al botón de cerrar la ventana de "ver trailer"
    const botonCerrarModal = document.querySelector('.cerrar-modal');
    botonCerrarModal.addEventListener('click', cerrarModal);
    
    // Cerrar la venatana al hacer clic fuera del contenido
    const modal = document.getElementById('modal-trailer');
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar el modal con la tecla Esc
    document.addEventListener('keydown', function(event) {
        if(event.key === "Escape") {
            cerrarModal();
        }
    });
}


// Eliminamos todos los elementos del carrito y lo ocultamos al seleccionar el boton pagar
function pagarClicked(){
    alert("Gracias por la compra");
    console.log("Selecciono el boton pagar")
    eliminarElementosCarrito();
}

// Función que controla el botón de agregar al carrito
function agregarAlCarritoClicked(event){
    console.log("Selecciono el boton de agregar al carrito ")
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

// Función que hace visible el carrito
function hacerVisibleCarrito(){
    console.log("Vetana del carrito visible")
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    console.log("Agrego un juego al carrito")
    var item = document.createElement('div');
    item.classList.add('item'); // Corrección aquí
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText === titulo){
            alert("El juego ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    

    // Agregamos la funcionalidad eliminar 
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregamos la funcionalidad restar cantidad 
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Agregamos la funcionalidad sumar cantidad 
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizamos total
    actualizarTotalCarrito();
}

// Aumento en uno la cantidad del elemento seleccionado 
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

// Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual--;
    if(cantidadActual >= 1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    // Manejar si el usuario hace clic en el icono de la papelera o en el botón
    if(buttonClicked.classList.contains('fa-trash')){
        buttonClicked = buttonClicked.parentElement;
    }
    buttonClicked.parentElement.parentElement.remove();
    // Actualizamos el total del carrito
    actualizarTotalCarrito();

    // La siguiente función controla si hay elementos en el carrito
    // Si no hay, oculto el carrito
    ocultarCarrito();
}

// Función que controla si hay elementos en el carrito. Si no hay, oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount === 0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    // Seleccionamos el contenedor del carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    
    // Recorremos cada elemento del carrito para actualizar el total
    for(var i = 0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        
        // Quitamos el símbolo de peso y cualquier espacio o coma
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace(' ','').replace(',',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value);
        
        total += (precio * cantidad);
    }
    
    // Redondeamos a dos decimales
    total = Math.round(total * 100) / 100;
    console.log("Total : " + total)
    
    // Formateamos el total con dos decimales usando toFixed
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toFixed(2);


}

// Función para cargar productos según la consola seleccionada
function cargarProductos(consola) {
    const contenedorItems = document.getElementById("contenedor-items");
    contenedorItems.innerHTML = ''; // Limpiar productos anteriores

    productos[consola].forEach(producto => {
        const itemHTML = `
            <div class="item">
                <span class="titulo-item">${producto.titulo}</span>
                <br>
                <img src="${producto.imagen}" alt="${producto.titulo}" class="img-item">
                <br><br>
                <a href="#" class="url-trailer" data-trailer="${producto.trailer}">Ver trailer</a>
                <br><br>
                <span class="precio-item">${producto.precio}</span>
                <button class="boton-item">Agregar al Carrito</button>
            </div>
        `;
        contenedorItems.innerHTML += itemHTML;
    });

    // Añadir eventos para los botones de agregar al carrito
    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        botonesAgregarAlCarrito[i].addEventListener('click', agregarAlCarritoClicked);
    }

    // Añadir eventos para los enlaces de "Ver trailer"
    const enlacesVerTrailer = document.getElementsByClassName('url-trailer');
    for (let i = 0; i < enlacesVerTrailer.length; i++) {
        enlacesVerTrailer[i].addEventListener('click', verTrailerClicked);
    }
}

// Detectar cambio en el menú desplegable y actualizar productos
document.getElementById('consolas').addEventListener('change', function() {
    cargarProductos(this.value); // Cargar los productos de la consola seleccionada
});

// Cargar los productos por defecto (inicia con PlayStation)
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos('playstation');
});

// Función para manejar el clic en "Ver trailer"
function verTrailerClicked(event) {
    event.preventDefault(); // Evitar que se siga el enlace
    const enlace = event.currentTarget; // El enlace que fue clickeado
    const trailerUrl = enlace.getAttribute('data-trailer'); // Obtener el enlace del trailer
    
    // Mnado a llamar el contenedor del trailer
    const modal = document.getElementById('modal-trailer');
    const iframe = document.getElementById('video-trailer');
    
    // Convertir la URL de YouTube a formato embed si no lo está
    let embedUrl = trailerUrl;
    if (trailerUrl.includes('watch?v=')) {
        embedUrl = trailerUrl.replace('watch?v=', 'embed/');
    } else if (trailerUrl.includes('youtu.be/')) {
        embedUrl = trailerUrl.replace('youtu.be/', 'youtube.com/embed/');
    }
    
    // Añadir el parámetro autoplay
    embedUrl += "?autoplay=1";
    
    // Establecer la URL
    iframe.src = embedUrl;
    
    // Mostrar el modal
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-trailer');
    const iframe = document.getElementById('video-trailer');
    
    // Ocultar el modal
    modal.style.display = 'none';
    
    // Detener el video
    iframe.src = "";
}


// Función para manejar el clic en "Vaciar Carrito"
function vaciarCarritoClicked(){
    alert("Acabas de perder todo tu progreso ... ");
    eliminarElementosCarrito();
}

function eliminarElementosCarrito(){
    console.log("Oculto la ventana del carrito, no hay elementos dentro del mismo ")
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Datos de los productos
const productos = {
    playstation: [
        { titulo: "Call of Duty®: Black Ops 6 - Paquete Multigeneración", precio: "$1100.00", imagen: "img/playstation/play1.png", trailer:"https://www.youtube.com/watch?v=K7wW6V0OiIU"},
        { titulo: "La ascensión del Ronin", precio: "$450.00", imagen: "img/playstation/play2.png", trailer:"https://www.youtube.com/watch?v=0pMncaKhF9g" },
        { titulo: "NBA 2K25 Edición Estándar", precio: "$500.00", imagen: "img/playstation/play3.png", trailer: "https://www.youtube.com/watch?v=T6yYgKZAY4Q"},
        { titulo: "Marvel’s Spider-Man 2", precio: "$1380.00", imagen: "img/playstation/play4.png", trailer: "https://www.youtube.com/watch?v=cXSpEmPmbfc"},
        { titulo: "Astro Bot", precio: "$350.00", imagen: "img/playstation/play5.png", trailer: "https://www.youtube.com/watch?v=gdHIbPiQEQI" }
    ],
    xbox: [
        { titulo: "Call of Duty®: Black Ops II", precio: "$999.00", imagen: "img/xbox/xbox1.png", trailer: "https://www.youtube.com/watch?v=x3tedlWs1XY"},
        { titulo: "Disney Epic Mickey: Rebrushed", precio: "$1059.00", imagen: "img/xbox/xbox2.png", trailer: "https://www.youtube.com/watch?v=4SBS30Syib4"},
        { titulo: "Five Nights at Freddy's Into the Pit", precio: "$349.00", imagen: "img/xbox/xbox3.png", trailer:"https://www.youtube.com/watch?v=2pTYUVB6-zM"},
        { titulo: "Shadows of Doubt", precio: "$439.00", imagen: "img/xbox/xbox4.png", trailer: "https://www.youtube.com/watch?v=D9E_MSdV0vk"},
        { titulo: "The Witcher 3: Wild Hunt", precio: "$350.00", imagen: "img/xbox/xbox5.png", trailer: "https://www.youtube.com/watch?v=c0i88t0Kacs"}
    ],
    nintendo: [
        { titulo: "Darkest Dungeon II", precio: "$409.00", imagen: "img/nintendo/nintendo1.png", trailer: "https://www.youtube.com/watch?v=fq53pdxY-0U"},
        { titulo: "Famicom Detective Club™: The Missing Heir", precio: "$698.00", imagen: "img/nintendo/nintendo2.png", trailer: "https://www.youtube.com/watch?v=kuVqUf-xg18"},
        { titulo: "Luigi's Mansion™ 2 HD", precio: "$1999.00", imagen: "img/nintendo/nintendo3.png", trailer: "https://www.youtube.com/watch?v=ogh-MZLOZy4"},
        { titulo: "Pokémon™ Shining Pearl", precio: "$1199.00", imagen: "img/nintendo/nintendo4.png", trailer: "https://www.youtube.com/watch?v=jqFDpRsVHGU"},
        { titulo: "The Legend of Zelda™: Echoes of Wisdom", precio: "$1199.00", imagen: "img/nintendo/nintendo5.png", trailer: "https://www.youtube.com/watch?v=fb4__RzOVNs"}
    ]
};

