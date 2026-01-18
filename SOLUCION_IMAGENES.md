# 🔧 Solución: Las imágenes no se ven

## ⚠️ Problema Principal: CORS

Si abres `index.html` directamente haciendo doble clic (archivo://), el navegador bloquea `fetch()` por seguridad. **Necesitas usar un servidor local**.

## ✅ Solución: Usar un Servidor Local

### Opción 1: Script Automático (Más Fácil)

En la terminal, ejecuta:
```bash
cd /Users/cash/cash
./iniciar-servidor.sh
```

O directamente:
```bash
python3 -m http.server 8000
```

Luego abre en tu navegador:
```
http://localhost:8000
```

### Opción 2: Desde la Terminal

1. Abre la Terminal
2. Navega a la carpeta:
   ```bash
   cd /Users/cash/cash
   ```

3. Inicia el servidor:
   ```bash
   python3 -m http.server 8000
   ```

4. Abre tu navegador y ve a:
   ```
   http://localhost:8000
   ```

## 📸 Archivos de Imágenes

Veo que tienes estos archivos en la carpeta `img/`:
- ✅ `terreno1.jpg` → Funciona (coincide con JSON)
- ✅ `casa-lujo1.JPG` → Ya actualizado en JSON (cambiado a .JPG)
- ❓ `IMG_8914.JPG`, `IMG_8915.JPG`, etc. → No coinciden con nombres en JSON

### Para que funcionen todas las imágenes:

**Opción A:** Renombra los archivos para que coincidan con el JSON:
- `IMG_8914.JPG` → `loteamiento1.jpg`
- `IMG_8915.JPG` → `casa1.jpg`
- `IMG_8916.JPG` → `apartamento1.jpg`
- etc.

**Opción B:** Actualizo el JSON para usar los nombres que tienes (IMG_8914, etc.)

¿Cuál prefieres?

## 🧪 Verificar que funciona

1. Inicia el servidor local (ver arriba)
2. Abre `http://localhost:8000` en el navegador
3. Abre la Consola del Navegador (F12 o Cmd+Option+I)
4. Revisa si hay errores en la consola
5. Las imágenes deberían aparecer ahora

## 💡 Nota

Si una imagen no existe, ahora se mostrará un placeholder automáticamente en lugar de un ícono roto.
