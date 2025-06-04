// Lista de frutas con datos base
let listaFrutas = [
    { id: 1, nombre: "anana", precio: 50, img: './img/anana.jpg' },
    { id: 2, nombre: "arandano", precio: 120, img: './img/arandano.jpg' },
    { id: 3, nombre: "banana", precio: 80, img: './img/banana.jpg' },
    { id: 4, nombre: "frambuesa", precio: 200, img: './img/frambuesa.png' },
    { id: 5, nombre: "frutilla", precio: 150, img: './img/frutilla.jpg' },
    { id: 6, nombre: "kiwi", precio: 90, img: './img/kiwi.jpg' },
    { id: 7, nombre: "mandarina", precio: 60, img: './img/mandarina.jpg' },
    { id: 8, nombre: "manzana", precio: 70, img: './img/manzana.jpg' },
    { id: 9, nombre: "naranja", precio: 55, img: './img/naranja.jpg' },
    { id: 10, nombre: "pera", precio: 65, img: './img/pera.jpg' },
    { id: 11, nombre: "pomelo-amarillo", precio: 110, img: './img/pomelo-amarillo.jpg' },
    { id: 12, nombre: "pomelo-rojo", precio: 115, img: './img/pomelo-rojo.jpg' },
    { id: 13, nombre: "sandia", precio: 130, img: './img/sandia.jpg' }
];

// --------------------- CARRITO ---------------------
// Carrito: se inicializa vacío o con lo que hay en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar el carrito actualizado en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// --------------------- AGREGAR AL CARRITO ---------------------
// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
    const producto = listaFrutas.find(p => p.id === productoId);
    
    //Se verifica si el producto ya está en el carrito

    const index = carrito.findIndex(item => item.id === productoId);

    // Para evitar duplicados y sumar la cantidad
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    console.log("Carrito:", carrito);

    guardarCarritoEnLocalStorage(); 
    mostrarCarrito(); 
}

// --------------------- ELIMINAR PRODUCTO ---------------------
// Función para eliminar una unidad de producto del carrito
function eliminarProducto(index) {
    carrito[index].cantidad -= 1;

    if (carrito[index].cantidad <= 0) {
         // eliminamos el producto si queda en 0
        carrito.splice(index, 1);
    }

    console.log("Producto eliminado. Carrito:", carrito);

    guardarCarritoEnLocalStorage(); 
    mostrarCarrito(); 
}

// --------------------- MOSTRAR CARRITO ---------------------
// Función que muestra el contenido del carrito en HTML
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("precio-total");
    const contador = document.getElementById("contador-carrito");

    let html = "";
    let total = 0;
    let totalCantidad = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        html += `
            <li class="bloque-item">
                <p class="nombre-item">${item.nombre} - $${item.precio} x ${item.cantidad}</p>
                <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            </li>
        `;
        total += subtotal;
        totalCantidad += item.cantidad;
    });

    contenedor.innerHTML = html || "<p>No hay elementos en el carrito.</p>";
    totalTexto.innerText = `$${total.toFixed(2)}`;
    contador.innerText = totalCantidad;
}

// --------------------- FILTRAR PRODUCTOS ---------------------
// Función que filtra los productos mientras el usuario escribe
function filtrarProductos() {
    const texto = document.getElementById("barra-busqueda").value.toLowerCase();

    const productosFiltrados = listaFrutas.filter(fruta =>
        fruta.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(productosFiltrados); // renderiza productos filtrados
}
// --------------------- ORDENAMIENTO ---------------------

let ordenNombreAscendente = true;
let ordenPrecioAscendente = true;

//Ordena el array de frutas por nombre (alfabético ascendente)
function ordenarCarritoPorNombre() {
    carrito.sort((a, b) => {
        return ordenNombreAscendente
            ? a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
            : b.nombre.localeCompare(a.nombre, "es", { sensitivity: "base" });
    });

    ordenNombreAscendente = !ordenNombreAscendente; // alternar orden
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
}

// Ordena el array de frutas por precio (menor → mayor)
function ordenarCarritoPorPrecio() {
    carrito.sort((a, b) => {
        return ordenPrecioAscendente
            ? a.precio - b.precio
            : b.precio - a.precio;
    });

    ordenPrecioAscendente = !ordenPrecioAscendente; // alternar orden
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
}


// --------------------- ALUMNO ---------------------
// Función que muestra el alumno en consola e imprime nombre y apellido en el nav
function imprimirDatosAlumno() {
    // declaro el objeto alumno
    let alumno = {
        dni: 42432724,
        nombre: "Uriel",
        apellido: "Guillen",
    };

    // Busco el contenedor del menú
    let contenedorMenu = document.getElementById("menu-nav");

    // Genero HTML
    let htmlProductos = `
        <a href="index.html">
            <div class="logo">Frutería</div>
        </a>
        <div class="nombre">${alumno.nombre}</div>
        <div class="apellido">${alumno.apellido}</div>
    `;
    // Lo inserto en el HTML
    contenedorMenu.innerHTML = htmlProductos;

    // Muestro el mensaje en consola
    console.log(`Hola, mi nombre es ${alumno.nombre} ${alumno.apellido} Dni: ${alumno.dni}`);
}

// --------------------- MOSTRAR PRODUCTOS ---------------------
// Función que muestra los productos en el HTML
function mostrarProductos(array) {
    let contenedorProductos = document.getElementById("listado-frutas");
    let htmlProductos = "";

    array.forEach(producto => {
        htmlProductos += `        
            <div class="card-producto">
                <img class="img-producto" src="${producto.img}" alt="${producto.nombre}">
                <h3 class="nombre-producto">${producto.nombre}</h3>
                <p class="precio-producto">$${producto.precio}</p>
                <button class="btn-sumar-a-carrito" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>`;
    });

    contenedorProductos.innerHTML = htmlProductos;
}

// --------------------- VACIAR CARRITO ---------------------
// Función para vaciar el carrito completamente
function vaciarCarrito() {
    carrito = []; // vaciamos el array
    guardarCarritoEnLocalStorage(); // actualizamos localStorage
    mostrarCarrito(); // actualizamos la vista
}

// --------------------- INIT ---------------------
// Función de inicialización: se ejecuta al cargar la página
function init() {
    imprimirDatosAlumno();
    mostrarProductos(listaFrutas);

    // Asigno el evento al input para filtrar frutas
    document.getElementById("barra-busqueda").addEventListener("input", filtrarProductos);

    document.getElementById("ordenar-nombre").addEventListener("click", ordenarCarritoPorNombre);
    document.getElementById("ordenar-precio").addEventListener("click", ordenarCarritoPorPrecio);

    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

    // Mostrar el carrito ya cargado si hay datos previos
    mostrarCarrito();
}

// ------------------------------------------------------------
// Llamada inicial
init();
