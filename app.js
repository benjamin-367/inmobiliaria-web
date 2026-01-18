let propiedades = [];

const contenedor = document.getElementById("listado-propiedades");
const filtroTipo = document.getElementById("filtro-tipo");
const buscador = document.getElementById("buscador");
const ordenPrecio = document.getElementById("orden-precio");

// Load properties
async function cargarPropiedades() {
  try {
    const response = await fetch("propiedades.json");
    if (response.ok) {
      const data = await response.json();
      propiedades = data;
      // Guardar en localStorage como respaldo
      localStorage.setItem("propiedades", JSON.stringify(data));
      mostrarPropiedades(propiedades);
      return;
    }
  } catch (err) {
    console.log("No se pudo cargar desde JSON, intentando localStorage...");
  }
  
  // Intentar cargar desde localStorage (si se actualizó desde admin)
  try {
    const localData = localStorage.getItem("propiedades");
    if (localData) {
      propiedades = JSON.parse(localData);
      mostrarPropiedades(propiedades);
      return;
    }
  } catch (err) {
    console.error("Error leyendo localStorage:", err);
  }
  
  // Si todo falla, mostrar error
  contenedor.innerHTML = `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 8px; margin: 2rem;">
      <h2 style="color: #dc2626; margin-bottom: 1rem;">⚠️ Error al cargar las propiedades</h2>
      <p style="margin-bottom: 1rem;">No se pudieron cargar las propiedades.</p>
      <p style="color: #666; font-size: 0.9rem;">
        <strong>Solución:</strong> Necesitas usar un servidor local. Abre la terminal en esta carpeta y ejecuta:<br>
        <code style="background: #f4f6f8; padding: 0.5rem; border-radius: 4px; display: inline-block; margin-top: 0.5rem;">python3 -m http.server 8000</code><br>
        Luego abre: <code style="background: #f4f6f8; padding: 0.5rem; border-radius: 4px; display: inline-block; margin-top: 0.5rem;">http://localhost:8000</code>
      </p>
    </div>
  `;
}

cargarPropiedades();

// Render properties
function mostrarPropiedades(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron propiedades.</p>";
    return;
  }

  lista.forEach(p => {
    const badge =
      p.estado === "vendido"
        ? `<span class="badge sold">Vendido</span>`
        : p.estado === "reservado"
        ? `<span class="badge reserved">Reservado</span>`
        : "";

    // Format property details based on type
    let detalles = "";
    if (p.tipo === "terrenos" || p.tipo === "loteamientos") {
      detalles = `${p.metrosCuadrados ? p.metrosCuadrados + " m² · " : ""}${p.ciudad}`;
    } else {
      detalles = `${p.habitaciones || 0} habitaciones · ${p.banos || 0} baños · ${p.ciudad}`;
    }

    contenedor.innerHTML += `
      <div class="card">
        <div class="image-wrapper">
          ${badge}
          <img src="${p.imagen}" alt="${p.titulo}" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+no+disponible';">
        </div>
        <div class="card-content">
          <h3>${p.titulo}</h3>
          <p>${detalles}</p>
          <strong>₲ ${p.precio.toLocaleString()}</strong>
        </div>
      </div>
    `;
  });
}

// Filter by type
filtroTipo.addEventListener("change", aplicarFiltros);
buscador.addEventListener("input", aplicarFiltros);
ordenPrecio.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  let resultado = [...propiedades];

  // Type
  if (filtroTipo.value !== "todos") {
    resultado = resultado.filter(p => p.tipo === filtroTipo.value);
  }

  // Search by city
  const texto = buscador.value.toLowerCase();
  if (texto) {
    resultado = resultado.filter(p =>
      p.ciudad.toLowerCase().includes(texto)
    );
  }

  // Order by price
  resultado.sort((a, b) =>
    ordenPrecio.value === "asc"
      ? a.precio - b.precio
      : b.precio - a.precio
  );

  mostrarPropiedades(resultado);
}
