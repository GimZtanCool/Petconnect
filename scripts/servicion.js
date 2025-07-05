document.getElementById('form-servicio').addEventListener('submit', function(e) {
    e.preventDefault();

    const providerId = document.getElementById('providerId').value.trim();
    const serviceType = document.getElementById('serviceType').value;
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value ? Number(document.getElementById('price').value) : undefined;
    const currency = document.getElementById('currency').value;
    const address = document.getElementById('address').value.trim();
    const coordinatesInput = document.getElementById('coordinates').value.trim();
    let coordinates = [];
    if (coordinatesInput) {
        coordinates = coordinatesInput.split(',').map(Number);
    }

    // Procesar disponibilidad (ejemplo simple: solo un día y horas)
    const availabilityInput = document.getElementById('availability').value.trim();
    let availability = [];
    if (availabilityInput) {
        // Ejemplo: "monday 9-13,15-18"
        const [day, hoursStr] = availabilityInput.split(' ');
        if (day && hoursStr) {
            const hours = hoursStr.split(',').map(h => h.trim());
            availability.push({ day, hours });
        }
    }

    const service = {
        providerId,
        serviceType,
        title,
        description,
        price,
        currency,
        location: address || coordinates.length ? {
            address,
            coordinates
        } : undefined,
        availability,
        createdAt: new Date()
    };

    // Mostrar en consola (simulación de envío)
    console.log('Servicio a enviar:', service);

    alert('¡Servicio creado (simulado)! Revisa la consola.');
});