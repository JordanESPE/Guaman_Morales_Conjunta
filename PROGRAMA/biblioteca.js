// Datos iniciales
var libros = [
    { id: 1, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Novela", disponible: true },
    { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Clásico", disponible: true },
    { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Infantil", disponible: true }
];

var librosPrestados = [];
var busquedaActual = '';

function mostrarLibros(lista) {
    var listaDisponibles = document.getElementById("librosDisponibles");
    var listaPrestados = document.getElementById("librosPrestados");
    
    listaDisponibles.innerHTML = "<h3>Libros Disponibles</h3>";
    listaPrestados.innerHTML = "<h3>Libros Prestados</h3>";

    // Mostrar libros disponibles
    for (var i = 0; i < lista.length; i++) {
        var libro = lista[i];
        if (libro.disponible) {
            listaDisponibles.innerHTML += 
            '<div class="libro disponible">' +
                libro.titulo + ' - ' + libro.autor +
                '<button onclick="prestarLibro(' + libro.id + ')">Prestar</button>' +
            '</div>';
        }
    }

    // Mostrar libros prestados
    for (var j = 0; j < librosPrestados.length; j++) {
        var libroPrestado = librosPrestados[j];
        listaPrestados.innerHTML += 
            '<div class="libro prestado">' +
                libroPrestado.titulo + ' - ' + libroPrestado.autor +
                '<button onclick="devolverLibro(' + libroPrestado.id + ')">Devolver</button>' +
            '</div>';
    }
}

function buscarLibros() {
    var termino = document.getElementById('busqueda').value.toLowerCase();
    busquedaActual = termino;
    var resultados = [];
    
    for (var i = 0; i < libros.length; i++) {
        var tituloLibro = libros[i].titulo.toLowerCase();
        if (tituloLibro.indexOf(termino) !== -1) {
            resultados.push(libros[i]);
        }
    }
    
    mostrarLibros(resultados);
}

function mostrarTodos() {
    busquedaActual = '';
    mostrarLibros(libros);
}

function prestarLibro(id) {
    for (var i = 0; i < libros.length; i++) {
        var libro = libros[i];
        if (libro.id === id && libro.disponible) {
            libro.disponible = false;
            librosPrestados.push(libro);
            
            alert('Libro prestado: ' + libro.titulo);
            setTimeout(function() {
                alert('Recordatorio: ¡Debes devolver "' + libro.titulo + '"!');
            }, 5000);
            
            if (busquedaActual) buscarLibros();
            else mostrarLibros(libros);
            return;
        }
    }


    alert("El libro no está disponible");
}

function devolverLibro(id) {
    for (var i = 0; i < librosPrestados.length; i++) {
        if (librosPrestados[i].id === id) {
            var libro = librosPrestados[i];
            libro.disponible = true;
            librosPrestados.splice(i, 1);
            
            alert('Libro devuelto: ' + libro.titulo);
            if (busquedaActual) buscarLibros();
            else mostrarLibros(libros);
            return;
        }
    }
    alert("Libro no encontrado en préstamos");
}

mostrarLibros(libros);