# Cómo usar el sitio de Riske Inmobiliaria

## Abrir el sitio en el navegador

### Opción 1: Abrir directamente (más simple)
1. Navega a la carpeta del proyecto: `/Users/cash/cash`
2. Haz doble clic en el archivo `index.html`
3. Se abrirá automáticamente en tu navegador predeterminado

### Opción 2: Usar un servidor local (recomendado para desarrollo)
Abre la terminal en la carpeta del proyecto y ejecuta uno de estos comandos:

**Con Python 3:**
```bash
python3 -m http.server 8000
```
Luego abre en tu navegador: `http://localhost:8000`

**Con Node.js (si tienes http-server instalado):**
```bash
npx http-server -p 8000
```
Luego abre en tu navegador: `http://localhost:8000`

**Con PHP:**
```bash
php -S localhost:8000
```

## Carpeta de imágenes

La carpeta `img/` está ubicada en: `/Users/cash/cash/img/`

### Agregar imágenes

1. Agrega tus imágenes de propiedades en la carpeta `img/`
2. Nombra las imágenes según las rutas especificadas en `propiedades.json`

Por ejemplo, si en el JSON dice:
```json
"imagen": "img/terreno1.jpg"
```

Entonces tu imagen debe estar en: `img/terreno1.jpg`

### Imágenes placeholder (temporal)

Si no tienes imágenes aún, puedes usar servicios como:
- **Placeholder.com**: `https://via.placeholder.com/400x300` (reemplaza en el JSON)
- **Unsplash**: `https://source.unsplash.com/400x300/?house`

### Nota importante

Las imágenes deben existir en la carpeta `img/` para que se muestren correctamente en el sitio.
