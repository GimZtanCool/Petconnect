document.getElementById('form-publicacion').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const authorId = document.getElementById('authorId').value.trim();
    const petId = document.getElementById('petId').value.trim();
    const content = document.getElementById('content').value.trim();
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const locationName = document.getElementById('locationName').value.trim();
    const locationCoordinates = document.getElementById('locationCoordinates').value.trim();

    // Procesar coordenadas
    let coordinates = [];
    if (locationCoordinates) {
        coordinates = locationCoordinates.split(',').map(Number);
    }

    // Procesar archivos de medios
    const mediaInput = document.getElementById('media');
    const mediaFiles = Array.from(mediaInput.files);
    // Aquí solo se obtienen los nombres, en una app real deberías subir los archivos y obtener URLs
    const media = mediaFiles.map(file => ({
        type: file.type.startsWith('image') ? 'image' : 'video',
        url: file.name, // Cambia esto por la URL real después de subir el archivo
        thumbnailUrl: file.type.startsWith('image') ? file.name : ''
    }));

    // Construir el objeto de publicación
    const post = {
        authorId,
        content,
        createdAt: new Date(),
        tags,
        media,
        location: locationName || coordinates.length ? {
            name: locationName,
            coordinates
        } : undefined
    };
    if (petId) post.petId = petId;

    // Mostrar en consola (simulación de envío)
    console.log('Publicación a enviar:', post);

    // Aquí puedes hacer un fetch/axios para enviar el post a tu backend
    alert('¡Publicación creada (simulada)! Revisa la consola.');
});