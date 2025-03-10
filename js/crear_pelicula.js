// Evento al enviar el formulario
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

// Cargar los datos de la película si estamos editando
window.onload = function () {
    const index = localStorage.getItem('editando');
    if (index !== null) {
        const peliculas = JSON.parse(localStorage.getItem('peliculas'));
        const pelicula = peliculas[index];
        
        document.getElementById('titulo').value = pelicula.titulo;
        document.getElementById('descripcion').value = pelicula.descripcion;
        document.getElementById('imagen').value = pelicula.imagen;
        document.getElementById('duracion').value = pelicula.duracion;
        
        // Cambiar el título del formulario
        document.getElementById('titulo-form').textContent = "Editar Película";
    }
};
