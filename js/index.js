// Cuando se envíe el formulario (Crear o Editar Película)
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();  // Evita el envío del formulario

    // Recoger los datos del formulario
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen').value;
    const duracion = document.getElementById('duracion').value;

    // Obtener el índice de la película si estamos editando
    const index = localStorage.getItem('editando');
    
    let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
    
    if (index !== null) {
        // Si el índice existe, estamos editando, así que actualizamos la película
        peliculas[index] = { titulo, descripcion, imagen, duracion };
        localStorage.removeItem('editando');  // Limpiar el índice de edición
    } else {
        // Si no hay índice, estamos añadiendo una nueva película
        peliculas.push({ titulo, descripcion, imagen, duracion });
    }

    // Guardar las películas actualizadas en localStorage
    localStorage.setItem('peliculas', JSON.stringify(peliculas));

    // Redirigir a la página principal y mostrar mensaje de éxito
    alert(index !== null ? 'Película actualizada exitosamente!' : 'Película creada exitosamente!');
    window.location.href = 'index.html';  // Redirige a la página principal
});

// Función para eliminar una película (llamada desde index.html)
function eliminarPelicula(index) {
    // Obtener las películas desde localStorage
    let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];

    // Eliminar la película seleccionada
    peliculas.splice(index, 1);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('peliculas', JSON.stringify(peliculas));

    // Recargar la página para reflejar los cambios
    window.location.reload();
}

// Función para editar una película (llamada desde index.html)
function editarPelicula(index) {
    // Guardar el índice de la película seleccionada para edición
    localStorage.setItem('editando', index);

    // Redirigir al formulario de creación/edición
    window.location.href = 'crear_pelicula.html';
}

// Función para mostrar las películas en la página principal
function mostrarPeliculas() {
    const peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
    const contenedor = document.getElementById('peliculas-container');
    
    // Limpiar el contenedor antes de agregar nuevas películas
    contenedor.innerHTML = '';
    
    // Crear un recuadro para cada película
    peliculas.forEach((pelicula, index) => {
        const recuadro = document.createElement('div');
        recuadro.classList.add('col-md-4');
        
        recuadro.innerHTML = `
            <div class="recuadro">
                <img src="${pelicula.imagen}" alt="Imagen de ${pelicula.titulo}" class="imagen">
                <h5 class="titulo">${pelicula.titulo}</h5>
                <p class="descripcion">Descripción: ${pelicula.descripcion}</p>
                <p class="descripcion">Duración: ${pelicula.duracion}</p>
                <button onclick="editarPelicula(${index})" class="btn btn-warning">Editar</button>
                <button onclick="eliminarPelicula(${index})" class="btn btn-danger">Eliminar</button>
            </div>
        `;
        
        contenedor.appendChild(recuadro);
    });
}

// Llamar a la función para mostrar las películas cuando la página cargue
window.onload = function() {
    mostrarPeliculas();
};
