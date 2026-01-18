// Panel de Administración - Riske Inmobiliaria

let propiedades = [];
let editandoId = null;

let form, propiedadesList, totalCount, buscarAdmin, tipoSelect, exportarBtn, importarBtn, importarInput, cancelarBtn;

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
  form = document.getElementById("propiedad-form");
  propiedadesList = document.getElementById("propiedades-list");
  totalCount = document.getElementById("total-count");
  buscarAdmin = document.getElementById("buscar-admin");
  tipoSelect = document.getElementById("tipo");
  exportarBtn = document.getElementById("exportar-btn");
  importarBtn = document.getElementById("importar-btn");
  importarInput = document.getElementById("importar-input");
  cancelarBtn = document.getElementById("cancelar-btn");

  // Inicializar eventos
  inicializarEventos();
  
  // Cargar propiedades al inicio
  cargarPropiedades();
});

function inicializarEventos() {
  // Cambiar campos según tipo
  tipoSelect.addEventListener("change", function() {
    const casasFields = document.getElementById("casas-fields");
    const terrenosFields = document.getElementById("terrenos-fields");
    
    if (this.value === "terrenos" || this.value === "loteamientos") {
      casasFields.style.display = "none";
      terrenosFields.style.display = "grid";
    } else {
      casasFields.style.display = "grid";
      terrenosFields.style.display = "none";
    }
  });

  // Buscar propiedades
  buscarAdmin.addEventListener("input", function() {
    mostrarPropiedades();
  });

  // Exportar JSON
  exportarBtn.addEventListener("click", function() {
    if (propiedades.length === 0) {
      mostrarAlerta("⚠️ No hay propiedades para exportar", "error");
      return;
    }
    const json = JSON.stringify(propiedades, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "propiedades.json";
    a.click();
    URL.revokeObjectURL(url);
    mostrarAlerta("✅ JSON exportado correctamente", "success");
  });

  // Importar JSON
  importarBtn.addEventListener("click", function() {
    importarInput.click();
  });

  importarInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) {
          propiedades = data;
          guardarPropiedades();
          mostrarPropiedades();
          mostrarAlerta("✅ JSON importado correctamente (" + data.length + " propiedades)", "success");
        } else {
          mostrarAlerta("❌ El JSON debe ser un array", "error");
        }
      } catch (err) {
        mostrarAlerta("❌ Error al leer el JSON: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  });

  // Form submit
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const propiedad = {
      id: editandoId || Date.now(),
      titulo: document.getElementById("titulo").value,
      ciudad: document.getElementById("ciudad").value,
      tipo: document.getElementById("tipo").value,
      precio: parseInt(document.getElementById("precio").value),
      estado: document.getElementById("estado").value,
      imagen: document.getElementById("imagen").value
    };
    
    // Agregar campos según tipo
    if (propiedad.tipo === "terrenos" || propiedad.tipo === "loteamientos") {
      propiedad.metrosCuadrados = parseInt(document.getElementById("metrosCuadrados").value) || 0;
    } else {
      propiedad.habitaciones = parseInt(document.getElementById("habitaciones").value) || 0;
      propiedad.banos = parseInt(document.getElementById("banos").value) || 0;
    }
    
    if (editandoId) {
      // Editar
      const index = propiedades.findIndex(p => p.id === editandoId);
      if (index !== -1) {
        propiedades[index] = propiedad;
        mostrarAlerta("✅ Propiedad actualizada", "success");
      }
    } else {
      // Agregar
      propiedades.push(propiedad);
      mostrarAlerta("✅ Propiedad agregada", "success");
    }
    
    guardarPropiedades();
    mostrarPropiedades();
    form.reset();
    cancelarEdicion();
    
    // Mostrar campos correctos
    tipoSelect.dispatchEvent(new Event("change"));
  });

  // Cancelar edición
  cancelarBtn.addEventListener("click", cancelarEdicion);
}

// Cargar propiedades
async function cargarPropiedades() {
  console.log("Cargando propiedades...");
  
  try {
    const response = await fetch("propiedades.json");
    console.log("Response status:", response.status);
    
    if (response.ok) {
      propiedades = await response.json();
      console.log("Propiedades cargadas desde JSON:", propiedades.length);
      guardarPropiedades();
      mostrarPropiedades();
      if (propiedades.length > 0) {
        mostrarAlerta("✅ " + propiedades.length + " propiedades cargadas", "success");
      }
      return;
    } else {
      console.log("Response no OK, intentando localStorage...");
    }
  } catch (err) {
    console.error("Error en fetch:", err);
    console.log("Intentando cargar desde localStorage...");
  }
  
  // Intentar cargar desde localStorage
  try {
    const localData = localStorage.getItem("propiedades");
    if (localData) {
      propiedades = JSON.parse(localData);
      console.log("Propiedades cargadas desde localStorage:", propiedades.length);
      guardarPropiedades();
      mostrarPropiedades();
      if (propiedades.length > 0) {
        mostrarAlerta("⚠️ " + propiedades.length + " propiedades cargadas desde almacenamiento local", "success");
      } else {
        mostrarAlerta("ℹ️ No hay propiedades guardadas. Agrega tu primera propiedad.", "error");
      }
    } else {
      console.log("No hay datos en localStorage");
      propiedades = [];
      guardarPropiedades();
      mostrarPropiedades();
      mostrarAlerta("ℹ️ No hay propiedades. Usa 'Importar JSON' para cargar propiedades o agrega una nueva.", "error");
    }
  } catch (err) {
    console.error("Error leyendo localStorage:", err);
    propiedades = [];
    mostrarPropiedades();
    mostrarAlerta("❌ Error al cargar propiedades: " + err.message, "error");
  }
}

// Guardar propiedades (localStorage como respaldo)
function guardarPropiedades() {
  localStorage.setItem("propiedades", JSON.stringify(propiedades));
}

function cancelarEdicion() {
  editandoId = null;
  form.reset();
  document.getElementById("form-title").textContent = "➕ Agregar Nueva Propiedad";
  document.getElementById("submit-btn").textContent = "Guardar Propiedad";
  cancelarBtn.style.display = "none";
  tipoSelect.dispatchEvent(new Event("change"));
}

// Mostrar propiedades
function mostrarPropiedades() {
  if (!propiedadesList || !totalCount) {
    console.error("Elementos del DOM no están disponibles");
    return;
  }
  
  console.log("Mostrando propiedades. Total:", propiedades.length);
  
  const busqueda = buscarAdmin ? buscarAdmin.value.toLowerCase() : "";
  let propiedadesFiltradas = propiedades;
  
  if (busqueda) {
    propiedadesFiltradas = propiedades.filter(p =>
      (p.titulo && p.titulo.toLowerCase().includes(busqueda)) ||
      (p.ciudad && p.ciudad.toLowerCase().includes(busqueda)) ||
      (p.tipo && p.tipo.toLowerCase().includes(busqueda))
    );
  }
  
  totalCount.textContent = propiedadesFiltradas.length;
  
  if (propiedadesFiltradas.length === 0) {
    propiedadesList.innerHTML = `
      <div class="empty-state">
        <p>No se encontraron propiedades</p>
        <small>${busqueda ? "Intenta con otra búsqueda" : "Agrega tu primera propiedad o importa un JSON"}</small>
      </div>
    `;
    return;
  }
  
  propiedadesList.innerHTML = propiedadesFiltradas.map(p => {
    const tipoNames = {
      "terrenos": "Terrenos",
      "loteamientos": "Loteamientos",
      "casas": "Casas",
      "casas-de-lujo": "Casas de Lujo"
    };
    
    const badgeClass = `badge-${p.tipo}`;
    const detalles = (p.tipo === "terrenos" || p.tipo === "loteamientos")
      ? `${p.metrosCuadrados || 0} m² · ${p.ciudad}`
      : `${p.habitaciones || 0} habitaciones · ${p.banos || 0} baños · ${p.ciudad}`;
    
    const estadoBadge = p.estado === "vendido"
      ? '<span class="propiedad-badge" style="background:#dc2626;color:white;">Vendido</span>'
      : p.estado === "reservado"
      ? '<span class="propiedad-badge" style="background:#f59e0b;color:white;">Reservado</span>'
      : '';
    
    return `
      <div class="propiedad-item">
        <img src="${p.imagen}" alt="${p.titulo}" onerror="this.src='https://via.placeholder.com/120x90/cccccc/666666?text=Sin+imagen'" />
        <div class="propiedad-info">
          <h3>${p.titulo}</h3>
          <span class="propiedad-badge ${badgeClass}">${tipoNames[p.tipo] || p.tipo}</span>
          ${estadoBadge}
          <p>${detalles}</p>
          <p class="precio">₲ ${p.precio.toLocaleString()}</p>
        </div>
        <div class="propiedad-actions">
          <button class="btn btn-warning" onclick="editarPropiedad(${p.id})">✏️ Editar</button>
          <button class="btn btn-danger" onclick="eliminarPropiedad(${p.id})">🗑️ Eliminar</button>
        </div>
      </div>
    `;
  }).join("");
}

// Editar propiedad
function editarPropiedad(id) {
  const propiedad = propiedades.find(p => p.id === id);
  if (!propiedad) return;
  
  editandoId = id;
  document.getElementById("titulo").value = propiedad.titulo;
  document.getElementById("ciudad").value = propiedad.ciudad;
  document.getElementById("tipo").value = propiedad.tipo;
  document.getElementById("precio").value = propiedad.precio;
  document.getElementById("estado").value = propiedad.estado;
  document.getElementById("imagen").value = propiedad.imagen;
  document.getElementById("habitaciones").value = propiedad.habitaciones || "";
  document.getElementById("banos").value = propiedad.banos || "";
  document.getElementById("metrosCuadrados").value = propiedad.metrosCuadrados || "";
  
  document.getElementById("form-title").textContent = "✏️ Editar Propiedad";
  document.getElementById("submit-btn").textContent = "Actualizar Propiedad";
  cancelarBtn.style.display = "inline-block";
  
  tipoSelect.dispatchEvent(new Event("change"));
  
  // Scroll al formulario
  document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
}

// Eliminar propiedad
function eliminarPropiedad(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta propiedad?")) {
    return;
  }
  
  propiedades = propiedades.filter(p => p.id !== id);
  guardarPropiedades();
  mostrarPropiedades();
  mostrarAlerta("✅ Propiedad eliminada", "success");
}

// Mostrar alerta
function mostrarAlerta(mensaje, tipo) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${tipo}`;
  alert.textContent = mensaje;
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.animation = "slideIn 0.3s ease reverse";
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// Hacer funciones globales para onclick
window.editarPropiedad = editarPropiedad;
window.eliminarPropiedad = eliminarPropiedad;
