// Función para cargar productos desde JSON

async function cargarProductos() {
    try {
        console.log("Intentando cargar productos.json...");
        const response = await fetch('productos.json');
        console.log("Fetch completado:", response);

        if (!response.ok) {
            throw new Error("No se pudo cargar productos.json");
        }

        const productos = await response.json();
        console.log("JSON leído correctamente:", productos);

        return productos;
    } catch (error) {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar productos.json: " + error.message);
        return [];
    }
}


// Función para mostrar productos en el div catalogo
function mostrarProductos(productos) {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    productos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'producto';

        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.descripcion}">
            <h3>${p.descripcion}</h3>
            <p>Clave: ${p.clave}</p>
            <p>Talla: ${p.talla}</p>
            <p>Precio: $${p.precio}</p>
        `;

        catalogo.appendChild(div);
    });
}

// Función para buscar en tiempo real
function filtrarProductos(productos) {
    const input = document.getElementById('buscador');

    input.addEventListener('input', () => {
        const valor = input.value.toLowerCase();
        const filtrados = productos.filter(p =>
            p.clave.toLowerCase().includes(valor) ||
            p.descripcion.toLowerCase().includes(valor) ||
            p.talla.toLowerCase().includes(valor)
        );
        mostrarProductos(filtrados);
    });
}

// Inicializar página
(async function() {
    const productos = await cargarProductos();
    mostrarProductos(productos);
    filtrarProductos(productos);
})();
