# Manual de Proceso - Creación de Usuario en Active Directory

## 🏢 Grupo Vanti - Gestión de Identidades y Accesos

Este repositorio contiene la documentación completa del proceso automatizado de creación de usuarios en Active Directory para el Grupo Vanti.

## 📋 Contenido

### Manual Principal
- **[Ver Manual Completo](https://cristhiangrp.github.io/Vanti_Documentacion/)** - Acceso directo al manual web

### Características Principales
- ✅ **Proceso automatizado** con PowerShell
- ✅ **Asignación automática** de licencias Office 365 E1 PLUS
- ✅ **Interfaz web responsive** con navegación intuitiva
- ✅ **Templates CSV** para carga masiva
- ✅ **Trazabilidad completa** de operaciones
- ✅ **Validaciones automáticas** en VantiAliados y AD

## 🚀 Flujo de Trabajo Automatizado

### Paso a Paso:
1. **Recepción** - Solicitud en HIT ServiceNow
2. **Validación** - VantiAliados y Active Directory
3. **Verificación** - Campos CSV requeridos
4. **Asignación** - Licencias Office 365 E1 PLUS (Temporal/Plantilla)
5. **Grupos** - Asignación automática según tipo de usuario
6. **Ejecución** - Script PowerShell automatizado
7. **Trazabilidad** - Registro en campo 'info' de AD
8. **Finalización** - Movimiento a OU final y reporte

## 💡 Beneficios

| Métrica | Antes | Ahora | Mejora |
|---------|-------|-------|--------|
| **Tiempo por usuario** | 30 min | 2-3 min | **85% reducción** |
| **Precisión** | Manual | Automatizada | **99% precisión** |
| **Capacidad** | 1 usuario | 500+ usuarios | **Procesamiento masivo** |
| **Errores** | Frecuentes | Eliminados | **100% automatización** |

## 📁 Estructura del Proyecto

```
├── index.html              # Manual principal
├── styles.css              # Estilos principales
├── sidebar.css             # Estilos del sidebar
├── script.js               # Funcionalidad principal
├── sidebar.js              # Funcionalidad del sidebar
├── group-management.html   # Manual de gestión de grupos
├── template_AD_ALTAS.csv   # Template para carga de usuarios
└── README.md               # Este archivo
```

## 🔧 Tipos de Usuario

### 👥 **Plantilla**
- Grupo: `GUSAIN_S0C0M0D0`, `NPS_Usuarios_Plantilla`, `Vanti_Plantilla`
- Licencia: **Office 365 E1 PLUS automática**

### ⏰ **Temporal**
- Grupo: `GUSAIN_S0C0M0D0`, `NPS_Usuarios_Temporal`, `Vanti_Temporal`
- Licencia: **Office 365 E1 PLUS automática**
- Fecha de expiración sincronizada

### 🔧 **Contratista**
- Grupo: `GUSAIN_S0C0M0D0`, `GUSAO365_RESETPSW_E`
- Sin licencia Office automática

## 📧 Licencias Office 365 E1 PLUS

**Incluye automáticamente:**
- ✅ Exchange Online (buzón de correo)
- ✅ Microsoft Teams
- ✅ SharePoint Online
- ✅ OneDrive for Business
- ✅ Sincronización con Azure AD

## 🌐 Acceso Web

**URL Principal:** https://cristhiangrp.github.io/Vanti_Documentacion/

### Navegación:
- 📺 **Video Tutorial** - Demostración paso a paso
- 📋 **Proceso** - Documentación completa
- 📊 **Métricas** - Beneficios y comparaciones
- 👥 **Gestión de Grupos** - Manual adicional

## 👨‍💻 Desarrollado por

**Cristhian G. Rodriguez Parra**  
Gestión de Identidades y Accesos - Grupo Vanti

---

*Última actualización: 9 de Julio de 2025*

## 📞 Soporte

Para soporte técnico o consultas sobre el proceso, contactar al equipo de Gestión de Identidades y Accesos.
