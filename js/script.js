document.getElementById("formRegistro").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const cargo = document.getElementById("cargo").value.trim();

    // Validación de campos vacíos
    if (!nombre || !email || !cargo) {
        mostrarAlerta("❌ Por favor completa todos los campos.", "danger");
        return;
    }

    // Validación de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarAlerta("❌ El correo electrónico no es válido.", "danger");
        return;
    }

    // Longitud mínima
    if (nombre.length < 3) {
        mostrarAlerta("❌ El nombre debe tener al menos 3 caracteres.", "danger");
        return;
    }
    if (cargo.length < 3) {
        mostrarAlerta("❌ El cargo debe tener al menos 3 caracteres.", "danger");
        return;
    }

    // Ocultar alerta en caso de éxito
    document.getElementById("alerta").classList.add("d-none");

    // Mensaje personalizado del modal
    document.getElementById("successMessage").textContent =
        `Gracias, ${nombre}. Hemos recibido tu registro exitosamente 🎉`;

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();

    // Limpiar formulario
    document.getElementById("formRegistro").reset();
}); // ← ESTA LLAVE FALTABA


// --- FUNCIÓN GLOBAL PARA MOSTRAR ALERTAS ---
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById("alerta");
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensaje;

    alerta.classList.remove("d-none");

    // Ocultar después de 4 segundos
    setTimeout(() => {
        alerta.classList.add("d-none");
    }, 4000);
}
const eventDate = new Date("January 26, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const remaining = eventDate - now;

    if (remaining <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Actualizar cada 1 segundo
setInterval(updateCountdown, 1000);

// Ejecutar inmediatamente
updateCountdown();