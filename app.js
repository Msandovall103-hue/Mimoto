// ================================
// DATOS DE LA APLICACIÓN
// ================================

let moto = JSON.parse(localStorage.getItem("moto")) || {};

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

let mantenimientos =
    JSON.parse(localStorage.getItem("mantenimientos")) || [];


// ================================
// GUARDAR DATOS DE LA MOTO
// ================================

function guardarMoto() {

    moto = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: document.getElementById("anio").value,
        kilometraje: document.getElementById("kilometraje").value
    };

    localStorage.setItem("moto", JSON.stringify(moto));

    actualizarResumen();

    alert("✅ Datos de la moto guardados");
}


// ================================
// AGREGAR GASTO
// ================================

function agregarGasto() {

    const descripcion =
        document.getElementById("descripcionGasto").value;

    const monto =
        parseFloat(document.getElementById("montoGasto").value);

    const fecha =
        document.getElementById("fechaGasto").value;


    if (!descripcion || !monto || !fecha) {

        alert("⚠️ Completa todos los campos");

        return;
    }


    const gasto = {

        id: Date.now(),

        descripcion: descripcion,

        monto: monto,

        fecha: fecha
    };


    gastos.push(gasto);

    localStorage.setItem(
        "gastos",
        JSON.stringify(gastos)
    );


    document.getElementById("descripcionGasto").value = "";
    document.getElementById("montoGasto").value = "";
    document.getElementById("fechaGasto").value = "";


    mostrarGastos();

    actualizarResumen();
}


// ================================
// MOSTRAR GASTOS
// ================================

function mostrarGastos() {

    const lista =
        document.getElementById("listaGastos");


    if (gastos.length === 0) {

        lista.innerHTML =
            '<p class="vacio">Todavía no hay gastos registrados.</p>';

        return;
    }


    lista.innerHTML = "";


    gastos
        .slice()
        .reverse()
        .forEach(gasto => {

            const elemento =
                document.createElement("div");

            elemento.className = "registro";


            elemento.innerHTML = `

                <h3>💰 ${gasto.descripcion}</h3>

                <p>
                    <strong>Monto:</strong>
                    $${gasto.monto.toFixed(2)}
                </p>

                <p>
                    <strong>Fecha:</strong>
                    ${gasto.fecha}
                </p>

                <button
                    class="boton-eliminar"
                    onclick="eliminarGasto(${gasto.id})"
                >
                    🗑️ Eliminar
                </button>
            `;


            lista.appendChild(elemento);

        });
}


// ================================
// ELIMINAR GASTO
// ================================

function eliminarGasto(id) {

    gastos = gastos.filter(
        gasto => gasto.id !== id
    );


    localStorage.setItem(
        "gastos",
        JSON.stringify(gastos)
    );


    mostrarGastos();

    actualizarResumen();
}


// ================================
// AGREGAR MANTENIMIENTO
// ================================

function agregarMantenimiento() {

    const tipo =
        document.getElementById("tipoMantenimiento").value;

    const kilometraje =
        document.getElementById("kmMantenimiento").value;

    const costo =
        parseFloat(
            document.getElementById("costoMantenimiento").value
        );

    const fecha =
        document.getElementById("fechaMantenimiento").value;


    if (!tipo || !kilometraje || !costo || !fecha) {

        alert("⚠️ Completa todos los campos");

        return;
    }


    const mantenimiento = {

        id: Date.now(),

        tipo: tipo,

        kilometraje: kilometraje,

        costo: costo,

        fecha: fecha
    };


    mantenimientos.push(mantenimiento);


    localStorage.setItem(
        "mantenimientos",
        JSON.stringify(mantenimientos)
    );


    document.getElementById("tipoMantenimiento").value = "";
    document.getElementById("kmMantenimiento").value = "";
    document.getElementById("costoMantenimiento").value = "";
    document.getElementById("fechaMantenimiento").value = "";


    mostrarMantenimientos();

    actualizarResumen();
}


// ================================
// MOSTRAR MANTENIMIENTOS
// ================================

function mostrarMantenimientos() {

    const lista =
        document.getElementById("listaMantenimientos");


    if (mantenimientos.length === 0) {

        lista.innerHTML =
            '<p class="vacio">Todavía no hay mantenimientos registrados.</p>';

        return;
    }


    lista.innerHTML = "";


    mantenimientos
        .slice()
        .reverse()
        .forEach(mantenimiento => {

            const elemento =
                document.createElement("div");

            elemento.className = "registro";


            elemento.innerHTML = `

                <h3>🔧 ${mantenimiento.tipo}</h3>

                <p>
                    <strong>Kilometraje:</strong>
                    ${mantenimiento.kilometraje} km
                </p>

                <p>
                    <strong>Costo:</strong>
                    $${mantenimiento.costo.toFixed(2)}
                </p>

                <p>
                    <strong>Fecha:</strong>
                    ${mantenimiento.fecha}
                </p>

                <button
                    class="boton-eliminar"
                    onclick="eliminarMantenimiento(${mantenimiento.id})"
                >
                    🗑️ Eliminar
                </button>
            `;


            lista.appendChild(elemento);

        });
}


// ================================
// ELIMINAR MANTENIMIENTO
// ================================

function eliminarMantenimiento(id) {

    mantenimientos =
        mantenimientos.filter(
            mantenimiento =>
                mantenimiento.id !== id
        );


    localStorage.setItem(
        "mantenimientos",
        JSON.stringify(mantenimientos)
    );


    mostrarMantenimientos();

    actualizarResumen();
}


// ================================
// ACTUALIZAR RESUMEN
// ================================

function actualizarResumen() {

    const total =
        gastos.reduce(
            (suma, gasto) =>
                suma + gasto.monto,
            0
        );


    document.getElementById("totalGastos").textContent =
        "$" + total.toFixed(2);


    document.getElementById(
        "totalMantenimientos"
    ).textContent =
        mantenimientos.length;


    document.getElementById(
        "kilometrajeActual"
    ).textContent =
        moto.kilometraje
            ? moto.kilometraje + " km"
            : "0 km";
}


// ================================
// CARGAR INFORMACIÓN AL INICIAR
// ================================

function cargarDatos() {

    if (moto.marca) {
        document.getElementById("marca").value =
            moto.marca;
    }

    if (moto.modelo) {
        document.getElementById("modelo").value =
            moto.modelo;
    }

    if (moto.anio) {
        document.getElementById("anio").value =
            moto.anio;
    }

    if (moto.kilometraje) {
        document.getElementById("kilometraje").value =
            moto.kilometraje;
    }


    mostrarGastos();

    mostrarMantenimientos();

    actualizarResumen();
}


// Ejecutar al abrir la aplicación
cargarDatos();
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("Service Worker registrado"))
            .catch(error => console.error("Error:", error));
    });
}