# 📚 Sistema de Sidebar Global - Documentación

## 🎯 Descripción
Sistema modular de navegación lateral para manuales de proceso de Grupo Vanti. Permite navegar entre diferentes manuales de forma intuitiva y mantener una experiencia de usuario consistente.

## 📁 Archivos del Sistema

### Archivos Principales
- `sidebar.html` - Estructura HTML del sidebar
- `sidebar.css` - Estilos CSS del sidebar
- `sidebar.js` - Funcionalidad JavaScript del sidebar

### Integración
Para usar el sidebar en cualquier manual, incluir en el `<head>`:
```html
<link rel="stylesheet" href="sidebar.css">
```

Y antes del cierre del `<body>`:
```html
<script src="sidebar.js"></script>
```

## 🚀 Características

### ✨ Funcionalidades Principales
- **Navegación modular**: Organizada por categorías de manuales
- **Responsive**: Adaptable a dispositivos móviles y tablets
- **Animaciones suaves**: Transiciones CSS profesionales
- **Estado persistente**: Mantiene el manual actual destacado
- **Extensible**: Fácil agregar nuevos manuales
- **Accesible**: Soporte para teclado (ESC para cerrar)

### 🎨 Elementos Visuales
- **Botón hamburguesa**: Icono animado para abrir el sidebar
- **Overlay**: Fondo semitransparente con blur
- **Iconos**: Cada manual tiene su icono representativo
- **Estados**: Activo, deshabilitado, carga, hover
- **Scroll personalizado**: Barra de desplazamiento estilizada

## 📋 Estructura de Categorías

### 🔧 Manuales de TI
- Creación de Usuario en AD (Actual)
- Modificación de Usuario (Próximamente)
- Eliminación de Usuario (Próximamente)
- Gestión de Grupos (Próximamente)

### 🔐 Gestión de Accesos
- Solicitud de Accesos (Próximamente)
- Revocación de Accesos (Próximamente)

### 🛡️ Seguridad
- Reseteo de Contraseñas (Próximamente)
- Auditoría de Seguridad (Próximamente)

## 🔧 API de JavaScript

### Clase GlobalSidebar
```javascript
// Instancia global
const sidebar = window.globalSidebar;

// Métodos principales
sidebar.open();           // Abrir sidebar
sidebar.close();          // Cerrar sidebar
sidebar.toggle();         // Alternar estado
```

### Agregar Nuevos Manuales
```javascript
sidebar.addManual({
    id: 'nuevo-manual',
    title: 'Título del Manual',
    subtitle: 'Descripción corta',
    icon: '📖',
    category: '🔧 Manuales de TI',
    enabled: true,
    url: 'nuevo-manual.html'
});
```

### Eventos de Tracking
```javascript
// El sistema registra automáticamente:
// - sidebar_opened
// - sidebar_closed
// - manual_navigation
```

## 🎨 Personalización CSS

### Variables CSS Principales
```css
:root {
    --sidebar-width: 320px;
    --sidebar-bg: #ffffff;
    --sidebar-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    --sidebar-active: #3b82f6;
    --animation-speed: 0.3s;
}
```

### Clases Principales
- `.global-sidebar` - Contenedor principal
- `.sidebar-header` - Encabezado con título y botón cerrar
- `.sidebar-content` - Área de contenido scrolleable
- `.sidebar-section` - Sección de categoría
- `.manual-item` - Item individual de manual
- `.manual-item.active` - Manual actualmente seleccionado
- `.manual-item.disabled` - Manual próximamente disponible

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px - Sidebar completo
- **Tablet**: 481px - 768px - Sidebar reducido
- **Mobile**: < 480px - Sidebar compacto

### Adaptaciones Móviles
- Ancho reducido del sidebar
- Texto del botón oculto en móviles
- Espaciado optimizado
- Touch-friendly (44px mínimo para botones)

## 🔄 Flujo de Navegación

### 1. Estado Inicial
- Sidebar cerrado
- Botón "Manuales" visible en esquina superior izquierda
- Manual actual marcado como activo

### 2. Apertura del Sidebar
- Click en botón "Manuales"
- Animación de deslizamiento desde la izquierda
- Overlay semitransparente aparece
- Scroll del body se bloquea

### 3. Navegación
- Click en manual habilitado → Navegación
- Click en manual deshabilitado → Mensaje "próximamente"
- Estados de carga durante transiciones

### 4. Cierre del Sidebar
- Click en botón X
- Click en overlay
- Tecla ESC
- Navegación exitosa

## 🚀 Implementación en Nuevos Manuales

### Paso 1: Archivos Base
Copiar estos archivos a la carpeta del nuevo manual:
- `sidebar.html`
- `sidebar.css`
- `sidebar.js`

### Paso 2: Incluir en HTML
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="sidebar.css">
</head>
<body>
    <!-- Contenido del manual -->
    
    <!-- Incluir el sidebar -->
    <!-- El contenido se carga automáticamente desde sidebar.html -->
    
    <script src="script.js"></script>
    <script src="sidebar.js"></script>
</body>
</html>
```

### Paso 3: Configurar Manual Actual
En el JavaScript del manual:
```javascript
// Actualizar el manual actual
document.addEventListener('DOMContentLoaded', function() {
    if (window.globalSidebar) {
        window.globalSidebar.updateCurrentManual('id-del-manual-actual');
    }
});
```

## 🔧 Extensiones Futuras

### Funcionalidades Planificadas
- **Búsqueda**: Campo de búsqueda de manuales
- **Favoritos**: Marcar manuales frecuentes
- **Historial**: Últimos manuales visitados
- **Notificaciones**: Alertas de nuevos manuales
- **Modo oscuro**: Tema dark/light
- **Offline**: Cache para uso sin conexión

### Integraciones Posibles
- **SharePoint**: Sincronización con biblioteca de documentos
- **Active Directory**: Permisos basados en grupos
- **Teams**: Integración con Microsoft Teams
- **Analytics**: Tracking detallado de uso

## 📊 Métricas y Análisis

### Eventos Registrados
- Apertura/cierre del sidebar
- Navegación entre manuales
- Tiempo de permanencia
- Manuales más consultados
- Errores de carga

### Datos Útiles
- Manual más popular
- Horarios de mayor uso
- Dispositivos más utilizados
- Rutas de navegación comunes

## 🛠️ Solución de Problemas

### Problemas Comunes

#### Sidebar no aparece
- Verificar inclusión de `sidebar.css`
- Verificar inclusión de `sidebar.js`
- Comprobar errores en consola del navegador

#### Estilos rotos
- Verificar orden de inclusión de CSS
- Comprobar conflictos con otros estilos
- Verificar variables CSS personalizadas

#### JavaScript no funciona
- Verificar carga completa del DOM
- Comprobar errores en consola
- Verificar compatibilidad del navegador

### Debug Mode
```javascript
// Habilitar logs detallados
window.globalSidebar.debug = true;
```

## 📞 Soporte

Para soporte técnico o nuevas funcionalidades:
- **Desarrollador**: Cristhian G. Rodriguez Parra
- **Email**: [email corporativo]
- **Documentación**: Este archivo
- **Versión**: 1.0 (Julio 2025)

---

**Nota**: Este sistema está diseñado para crecer y adaptarse a las necesidades futuras del equipo de Gestión de Identidades y Accesos de Grupo Vanti.
