# 🎛️ Panel de Administración - Riske Inmobiliaria

## 📍 Acceso

Abre el archivo `admin.html` en tu navegador:
- **URL:** `http://localhost:8000/admin.html` (si usas servidor local)
- O simplemente haz doble clic en `admin.html`

## ✨ Funcionalidades

### ➕ Agregar Propiedades
1. Completa el formulario en el panel izquierdo
2. Selecciona el tipo de propiedad (Terrenos, Loteamientos, Casas, Casas de Lujo)
3. Los campos cambiarán automáticamente según el tipo seleccionado
4. Haz clic en "Guardar Propiedad"

### ✏️ Editar Propiedades
1. En la lista de propiedades, haz clic en "Editar"
2. El formulario se llenará con los datos de la propiedad
3. Modifica los campos que desees
4. Haz clic en "Actualizar Propiedad"

### 🗑️ Eliminar Propiedades
1. En la lista de propiedades, haz clic en "Eliminar"
2. Confirma la eliminación

### 🔍 Buscar Propiedades
- Usa el buscador en la parte superior para filtrar por título, ciudad o tipo

### 📥 Exportar JSON
- Haz clic en "Exportar JSON" para descargar el archivo `propiedades.json` actualizado
- Puedes usar este archivo para reemplazar el `propiedades.json` del servidor

### 📤 Importar JSON
- Haz clic en "Importar JSON"
- Selecciona un archivo JSON válido
- Las propiedades se cargarán y reemplazarán las existentes

## 💾 Almacenamiento

- **LocalStorage:** Los cambios se guardan automáticamente en el navegador (localStorage)
- **Sincronización:** El sitio principal (`index.html`) también lee de localStorage si no puede cargar el JSON
- **Persistencia:** Para que los cambios sean permanentes, exporta el JSON y reemplaza el archivo `propiedades.json`

## 🔄 Flujo de Trabajo Recomendado

1. **Desarrollo/Edición:**
   - Usa el panel de administración para agregar/editar/eliminar propiedades
   - Los cambios se guardan en localStorage automáticamente
   - El sitio principal verá los cambios inmediatamente

2. **Publicación:**
   - Cuando termines, haz clic en "Exportar JSON"
   - Reemplaza el archivo `propiedades.json` con el exportado
   - Los cambios estarán disponibles para todos los usuarios

## ⚠️ Notas Importantes

- Las imágenes deben estar en la carpeta `img/` antes de agregar la propiedad
- El nombre de la imagen debe ser exacto (incluyendo mayúsculas/minúsculas)
- Los precios están en Guaraníes (₲)
- Para terrenos y loteamientos, usa "Metros Cuadrados"
- Para casas, usa "Habitaciones" y "Baños"

## 🎨 Campos del Formulario

### Campos Comunes (Todos los tipos)
- **Título** * (obligatorio)
- **Ciudad** * (obligatorio)
- **Tipo** * (obligatorio)
- **Precio** * (obligatorio, en Guaraníes)
- **Estado** * (Disponible, Reservado, Vendido)
- **Ruta de Imagen** * (obligatorio, ej: `img/terreno1.jpg`)

### Campos para Terrenos y Loteamientos
- **Metros Cuadrados** (opcional)

### Campos para Casas y Casas de Lujo
- **Habitaciones** (opcional)
- **Baños** (opcional)
