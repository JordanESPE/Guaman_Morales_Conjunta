# Guaman_Morales_Conjunta

Universidad de las Fuerzas Armadas ESPE

Prueba Conjunta Porgramacion WEB
Integrantes: Guaman Jordan, Anthony Morales

Analisis Caso Practico:

Caso:
Una biblioteca digital necesita mejorar su sistema de gestión de préstamos y devoluciones de 
libros. Actualmente, los usuarios pueden buscar libros, pero no hay una forma eficiente de reservarlos, 
devolverlos o verificar su disponibilidad en tiempo real. Además, el sistema no cuenta con alertas para 
recordar a los usuarios la fecha de devolución ni notificaciones sobre la disponibilidad de libros reservados. 

Consideraciones del Analisis:

Universidad de las Fuerzas Armadas ESPE
Prueba Conjunta Programación WEB
Integrantes: Guaman Jordan, Anthony Morales

Análisis Caso Práctico:
Caso: Una biblioteca digital necesita mejorar su sistema de gestión de préstamos y devoluciones de libros. Actualmente, los usuarios pueden buscar libros, pero no hay una forma eficiente de reservarlos, devolverlos o verificar su disponibilidad en tiempo real. Además, el sistema no cuenta con alertas para recordar a los usuarios la fecha de devolución ni notificaciones sobre la disponibilidad de libros reservados.



1. Estructura del Sistema de Préstamos:
Organización y Manipulación de Libros: El sistema utiliza dos arrays principales:

libros: Contiene todos los libros disponibles en la biblioteca.
librosPrestados: Almacena los libros que han sido prestados.
El código para manejar los libros prestados es el siguiente:

function prestarLibro(id) {
    for (var i = 0; i < libros.length; i++) {
        var libro = libros[i];
        if (libro.id === id && libro.disponible) { // Verifica si el libro está disponible
            libro.disponible = false;
            librosPrestados.push(libro); // Agrega el libro al array de libros prestados
            
            alert('Libro prestado: ' + libro.titulo); // Muestra el mensaje de libro prestado
            setTimeout(function() {
                alert('Recordatorio: ¡Debes devolver "' + libro.titulo + '"!'); // Muestra el recordatorio después de 5 segundos
            }, 5000);

            if (busquedaActual) buscarLibros();
            else mostrarLibros(libros);
            return;
        }
    }
    alert("El libro no está disponible"); // Si el libro no está disponible
}


La función prestarLibro recorre el array de libros y verifica si el libro con el id especificado está disponible. Si el libro está disponible, lo marca como no disponible, lo agrega al array de librosPrestados, muestra un mensaje con alert y programa un recordatorio usando setTimeout después de 5 segundos. Este proceso simula un préstamo de libro.





2. Filtrado y Búsquedas Dinámicas:
Implementación de filtros y búsqueda: La búsqueda se realiza en el título de los libros, utilizando la función filter() para filtrar aquellos libros que coinciden con el término de búsqueda.

Código para búsqueda de libros:

function buscarLibros() {
    var termino = document.getElementById('busqueda').value.toLowerCase(); // Término de búsqueda
    busquedaActual = termino;
    var resultados = [];
    
    for (var i = 0; i < libros.length; i++) {
        var tituloLibro = libros[i].titulo.toLowerCase(); // Convierte a minúsculas para evitar diferencias de mayúsculas/minúsculas
        if (tituloLibro.indexOf(termino) !== -1) { // Si el título contiene el término
            resultados.push(libros[i]); // Agrega el libro al array de resultados
        }
    }
    
    mostrarLibros(resultados); // Muestra los libros que coinciden con la búsqueda
}

Esta función permite buscar libros por título. Se toma el valor de la búsqueda, se convierte a minúsculas y luego se recorre el array libros buscando si el término de búsqueda está contenido en el título del libro. Si se encuentra una coincidencia, el libro se agrega al array de resultados.
Se podría expandir esta funcionalidad para permitir filtros por autor o género. Para ello, simplemente añadiríamos más condiciones en el if, usando indexOf() en los campos autor o genero.




3. Interacción con el Usuario:
Mostrar la lista de libros disponibles y prestados: El código usa getElementById para obtener los elementos del DOM y luego manipula el innerHTML para agregar el contenido de los libros disponibles y prestados.
Código para mostrar los libros disponibles y prestados:

function mostrarLibros(lista) {
    var listaDisponibles = document.getElementById("librosDisponibles");
    var listaPrestados = document.getElementById("librosPrestados");

    listaDisponibles.innerHTML = "<h3>Libros Disponibles</h3>";
    listaPrestados.innerHTML = "<h3>Libros Prestados</h3>";

    for (var i = 0; i < lista.length; i++) {
        var libro = lista[i];
        if (libro.disponible) { // Si el libro está disponible
            listaDisponibles.innerHTML += 
                '<div class="libro disponible">' +
                    libro.titulo + ' - ' + libro.autor +
                    '<button onclick="prestarLibro(' + libro.id + ')">Prestar</button>' +
                '</div>';
        }
    }

    for (var j = 0; j < librosPrestados.length; j++) {
        var libroPrestado = librosPrestados[j];
        listaPrestados.innerHTML += 
            '<div class="libro prestado">' +
                libroPrestado.titulo + ' - ' + libroPrestado.autor +
                '<button onclick="devolverLibro(' + libroPrestado.id + ')">Devolver</button>' +
            '</div>';
    }
}

Se seleccionan los elementos del DOM (librosDisponibles y librosPrestados) y se actualiza su contenido con los libros disponibles y prestados. Para cada libro disponible, se agrega un botón de "Prestar", y para los libros prestados, un botón de "Devolver".
En lugar de actualizar innerHTML repetidamente dentro de los bucles, se puede construir el contenido en una variable y luego agregarlo al DOM en un solo paso para mejorar el rendimiento.





4. Alertas y Recordatorios:
Envío de Recordatorios Automáticos: El código usa setTimeout() para mostrar un recordatorio de devolución de libro después de 5 segundos.

Código del recordatorio:

setTimeout(function() {
    alert('Recordatorio: ¡Debes devolver "' + libro.titulo + '"!'); // Recordatorio de devolución después de 5 segundos
}, 5000);

 
El setTimeout() permite ejecutar una función después de un retraso especificado (en este caso 5 segundos). En este caso, se usa para mostrar un recordatorio que el libro debe ser devuelto.






5. Eventos y Usabilidad:
Mejorar la experiencia del usuario con eventos: Se usan eventos onclick para gestionar la interacción del usuario con los botones de préstamo y devolución de libros.

Código para gestionar los eventos de préstamo y devolución:

<button onclick="prestarLibro(' + libro.id + ')">Prestar</button>
<button onclick="devolverLibro(' + libroPrestado.id + ')">Devolver</button>

Los botones usan el evento onclick para llamar a las funciones prestarLibro() y devolverLibro() cuando el usuario hace clic en ellos. Estos eventos permiten que los usuarios interactúen con la interfaz de forma sencilla.



6. Funciones Avanzadas:
Uso de Funciones Anónimas y async/await: Aunque no se usa explícitamente en el código, se podrían aprovechar las funciones anónimas y async/await para manejar procesos asincrónicos de manera más limpia.

Código con async/await para manejar promesas (simulación de procesos asincrónicos):


async function notificarPrestamo(libro) {
    await new Promise(resolve => {
        setTimeout(() => {
            resolve(`Recordatorio: ¡Debes devolver "${libro.titulo}"!`);
        }, 5000);
    });
    alert(`Recordatorio: ¡Debes devolver "${libro.titulo}"!`);
}
En este ejemplo, usamos async/await para simular un proceso asincrónico de espera, que es más claro y limpio en comparación con el uso de setTimeout directamente. Esto permite manejar notificaciones de manera más eficiente.

7. Simulación de Procesos Asíncronos:
Implementación de la Reserva y Devolución de Libros: El sistema actualmente usa setTimeout() para simular un recordatorio. Sin embargo, se puede mejorar con el uso de promesas para simular tiempos de espera.

Código con promesas para simular la devolución de un libro:


function devolverLibro(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (var i = 0; i < librosPrestados.length; i++) {
                if (librosPrestados[i].id === id) {
                    var libro = librosPrestados[i];
                    libro.disponible = true;
                    librosPrestados.splice(i, 1);
                    
                    resolve('Libro devuelto: ' + libro.titulo); // Resuelve la promesa
                    return;
                }
            }
            reject('Libro no encontrado en préstamos'); // Rechaza la promesa si el libro no se encuentra
        }, 2000);
    });
}

Esta función utiliza una promesa para simular un proceso asincrónico de devolución de libro. El libro es devuelto después de un retraso de 2 segundos, y la promesa se resuelve si el libro fue encontrado en los préstamos, o se rechaza si no se encuentra.



