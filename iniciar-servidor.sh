#!/bin/bash

# Script para iniciar un servidor local para el sitio de Riske Inmobiliaria
# Este script soluciona el problema de CORS cuando abres el HTML directamente

echo "🚀 Iniciando servidor local..."
echo ""
echo "📍 El sitio estará disponible en: http://localhost:8000"
echo ""
echo "💡 Presiona Ctrl+C para detener el servidor"
echo ""

# Verificar si Python 3 está instalado
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python no está instalado"
    echo "Por favor instala Python 3 o usa otro servidor"
    exit 1
fi
